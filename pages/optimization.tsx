import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  Title,
  Container,
  Group,
  Card,
  Stack,
  LoadingOverlay,
  Table
} from '@mantine/core';

import { IconCurrencyDollar, IconTimeline, IconChartArcs } from '@tabler/icons-react';

import { DataTable } from '@/components/DataTable';
import { PerformanceCard } from '@/components/PerformanceCard';
import { ExportButton } from '@/components/ExportButton';
import { RiskReturnChart } from '@/components/charts/RiskReturnChart';
import { PerformanceChart } from '@/components/charts/PerformanceChart';

// --- MAIN COMPONENT ---

export default function OptimizationPage() {
  // 2. OPTIMIZATION: Lazy Initial State
  // Instead of useEffect to load localStorage (which causes a double render), 
  // we read it once during initialization.
  const [data, setData] = useState<any | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('optimizationResult');
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error parsing optimizationResult:', error);
      return null;
    }
  });

  const [backtestResult, setBacktestResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  // 3. OPTIMIZATION: useMemo for data transformation
  // This prevents re-mapping the array on every render
  const scaledBacktest = useMemo(() => {
    if (!backtestResult || backtestResult.length === 0) return [];
    return backtestResult.map((item) => ({
      ...item,
      Portfolio_Returns: item.Portfolio_Returns * 100,
    }));
  }, [backtestResult]);

  // Fetch backtest logic
  useEffect(() => {
    if (!data) return;

    // Avoid fetching if we already have results (unless you want to force refresh)
    if (backtestResult.length > 0) return;

    const fetchBacktestData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          'https://yuvkhovnm7.execute-api.us-west-2.amazonaws.com/prod/',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              weights: data?.result?.portfolio?.weights,
              received_start: data?.debug?.received_start,
              received_end: data?.debug?.received_end,
            }),
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();

        // Batch updates if possible, but here we just set one state
        setBacktestResult(json.cumulative_returns ?? []);
      } catch (err) {
        console.error('Error fetching backtest:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBacktestData();
  }, [data]);

  // 4. OPTIMIZATION: useMemo for derived UI data
  const holdingsData = useMemo(() =>
    data?.result?.portfolio?.weights
      ? Object.entries(data.result.portfolio.weights).map(([ticker, weight]) => ({
        ticker,
        weight,
      }))
      : [],
    [data]);

  const sharpeRatio = data?.result?.portfolio?.sharpe_ratio ?? null;
  const expectedReturn = data?.result?.portfolio?.expected_return ?? null;
  const portfolioStd = data?.result?.portfolio?.portfolio_std ?? null;

  const metrics = useMemo(() =>
    data?.result?.portfolio
      ? [
        { label: 'Expected Return', value: expectedReturn, icon: <IconCurrencyDollar /> },
        { label: 'Portfolio Volatility', value: portfolioStd, icon: <IconTimeline /> },
        { label: 'Sharpe Ratio', value: sharpeRatio, icon: <IconChartArcs /> },
      ]
      : [],
    [data]);

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
            lastUpdated={"Just now"}
            icon={metric.icon}
            iconColor={null}
          />
        ))}
      </Group>

      <Stack>
        <Card>
          <Text fw={500} mb="sm">Historical Performance</Text>
          <Text fw={300} mb="sm">Portfolio vs Benchmark (Indexed to 100)</Text>

          <LoadingOverlay visible={loading} />

          {/* Render chart only if we have data, otherwise show placeholder or empty */}
          {scaledBacktest.length > 0 ? (
            <PerformanceChart
              data={scaledBacktest}
              dataKey="Portfolio_Returns"
              unit="%"
              toolTipName="Portfolio Return"
            />
          ) : (
            !loading && <Text c="dimmed">No backtest data available.</Text>
          )}
        </Card>

        <Card mb="md" padding="md" withBorder>
          <Text fw={500} mb="sm">Portfolio Holdings</Text>
          <DataTable 
            data={holdingsData} 
            rowsPerPage={10} 
            selectable={false} 
          />

<Table withTableBorder highlightOnHover>
  <Table.Thead>
    <Table.Tr>
      <Table.Th>Ticker</Table.Th>
      <Table.Th>Weight</Table.Th>
    </Table.Tr>
  </Table.Thead>

  <Table.Tbody>
    {holdingsData.map((row: any, index: any) => (
      <Table.Tr key={index}>
        <Table.Td>{row.ticker}</Table.Td>
        <Table.Td>{(row.weight * 100).toFixed(2)}%</Table.Td>
      </Table.Tr>
    ))}
    
  </Table.Tbody>
</Table>
        </Card>

        <Card>
          {/* Optimization: If the datasets are empty, don't even try to render the heavy scatter chart */}
          {data?.distinct_portfolios && (

            <RiskReturnChart
              distinct={data.distinct_portfolios}
              frontier={data.frontier_portfolios}
              sharpeRatio={sharpeRatio}
              expectedReturn={expectedReturn}
              portfolioStd={portfolioStd}
            />
          )}
        </Card>

        <ExportButton data={holdingsData} />
      </Stack>
    </Container>
  );
}