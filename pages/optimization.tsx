import { useEffect, useState } from 'react';
import {
  Text,
  Code,
  ScrollArea,
  Title,
  Container,
  Group,
  Card,
  Stack,
  Button,
  LoadingOverlay,
} from '@mantine/core';

import { IconDownload, IconCurrencyDollar, IconTimeline, IconChartArcs } from '@tabler/icons-react';

import {
  ResponsiveContainer,
  AreaChart,
  ScatterChart,
  Scatter,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';

import { theme, defaultShade } from '@/theme';
import { DataTable } from '@/components/DataTable';
import { PerformanceCard } from '@/components/PerformanceCard';
import { ExportButton } from '@/components/ExportButton';

// const brand = theme.colors.brand[defaultShade!];

interface PortfolioPoint {
  portfolio_std: number;
  portfolio_ret: number;
}

interface OptimizationData {
  result: {
    model: string;
    portfolio: {
      weights: Record<string, number>;
      expected_return: number;
      portfolio_std: number;
      sharpe_ratio: number;
    };
  };
  distinct_portfolios: PortfolioPoint[];   // filtered, well-separated portfolios
  frontier_portfolios: PortfolioPoint[];   // Pareto-efficient frontier
  debug: {
    received_start: string;
    received_end: string;
  };
}

export default function OptimizationPage() {
  const [data, setData] = useState<OptimizationData | null>(null);
  const [backtestResult, setBacktestResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const scaledBacktest = backtestResult.map((item) => ({
    ...item,
    Portfolio_Returns: item.Portfolio_Returns * 100,
  }));

  const successColor = theme.colors?.success?.[defaultShade] || 'green';
  const dangerColor = theme.colors?.danger?.[defaultShade] || 'red';

  // Load optimization data from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('optimizationResult');
      if (stored) setData(JSON.parse(stored));
    } catch (error) {
      console.error('Error parsing optimizationResult:', error);
    }
  }, []);

  // Fetch backtest once data is loaded
  useEffect(() => {
    if (!data) return; // wait until data is loaded

    const backtestPayload = {
      weights: data?.result?.portfolio?.weights,
      received_start: data?.debug?.received_start,
      received_end: data?.debug?.received_end,
    };

    const fetchBacktestData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://yuvkhovnm7.execute-api.us-west-2.amazonaws.com/prod/',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(backtestPayload),
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        setBacktestResult(json.cumulative_returns ?? []);
      } catch (err) {
        console.error('Error fetching backtest:', err);
        setBacktestResult([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBacktestData();
  }, [data]); // ✅ only run when data is ready

  // Prepare data for display
  const holdingsData =
    data?.result?.portfolio?.weights
      ? Object.entries(data.result.portfolio.weights).map(([ticker, weight]) => ({
        ticker,
        weight,
      }))
      : [];

  const metrics =
    data?.result?.portfolio
      ? [
        { label: 'Expected Return', value: data.result.portfolio.expected_return, icon: <IconCurrencyDollar /> },
        { label: 'Portfolio Volatility', value: data.result.portfolio.portfolio_std, icon: <IconTimeline /> },
        { label: 'Sharpe Ratio', value: data.result.portfolio.sharpe_ratio, icon: <IconChartArcs /> },
      ]
      : [];
  const positiveArea = scaledBacktest.map(d => ({
    ...d,
    value: d.Portfolio_Returns > 0 ? d.Portfolio_Returns : 0, // exclude 0
  }));

  const negativeArea = scaledBacktest.map(d => ({
    ...d,
    value: d.Portfolio_Returns < 0 ? d.Portfolio_Returns : null, // exclude 0
  }));


  return (
    <Container size="lg" my="md">
      <Title order={2} mb="sm">
        Portfolio Optimization Results
      </Title>

      <Text mb="md">
        Optimized portfolio allocation based on{' '}
        <b>{data?.result?.model || 'N/A'}</b> optimization
      </Text>

      <Group justify="space-between" grow mb="md">
        {metrics.map((metric) => (
          <PerformanceCard
            key={metric.label}
            title={metric.label}
            value={metric.value}
            // isUp={metric.isUp}
            // change={metric.change}
            lastUpdated={"Just now"}
            icon={metric.icon}
            iconColor={null}
          />
        ))}
      </Group>

      <Stack>
        <Card>
          <Text fw={500} mb="sm">
            Historical Performance
          </Text>
          <Text fw={300} mb="sm">
            Portfolio vs Benchmark (Indexed to 100)
          </Text>

          {/* ✅ Loading overlay wrapping the chart */}
          <LoadingOverlay visible={loading} />
          {!loading && (

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={scaledBacktest}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="Date"
                  tickFormatter={(dateStr) => {
                    const date = new Date(dateStr);
                    return `${date.toLocaleString("default", { month: "short" })}/${date.getFullYear()}`;
                  }}
                  tick={{ fontSize: 12 }}
                  allowDuplicatedCategory={false}
                  interval="preserveStartEnd"
                />
                <YAxis unit="%" />
                <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />

                <Area type="monotone" dataKey="value" data={positiveArea} stroke={successColor} fill={successColor} dot={false} />
                <Area type="monotone" dataKey="value" data={negativeArea} stroke={dangerColor} fill={dangerColor} dot={false} />
              </AreaChart>
            </ResponsiveContainer>

          )}

        </Card>

        <Card mb="md" padding="md" withBorder>
          <Text fw={500} mb="sm">
            Portfolio Holdings
          </Text>
          <DataTable data={holdingsData} rowsPerPage={10} selectable={false} />

        </Card>

        <Card>

          <ScatterChart
            style={{ width: '100%', height: 500 }}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" dataKey="portfolio_std" name="Risk (Std Dev)" unit="" />
            <YAxis type="number" dataKey="portfolio_ret" name="Return" unit="" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />

            <Scatter
              name="Distinct Portfolios"
              data={data?.distinct_portfolios.slice(0, 5)} // only first 5 points
              fill="#8884d8"
            />

            <Scatter
              name="Frontier Portfolios"
              data={data?.frontier_portfolios.slice(0, 5)}
              fill="#82ca9d"
            />
            <ReferenceLine y={0.2} stroke="blue" />
          </ScatterChart>

        </Card>


        <ExportButton data={holdingsData} />

      </Stack>

      {/* <ScrollArea h={300} offsetScrollbars mt="md">
        <Code block>{JSON.stringify(data, null, 2)}</Code>
        <Code block>{JSON.stringify(backtestResult.slice(0, 5), null, 2)}</Code>
      </ScrollArea> */}

    </Container>
  );
}
