import { useState, useMemo, useEffect } from 'react';
import { Stack, Button, Card, LoadingOverlay, Group, ScrollArea, Code } from '@mantine/core';
import { StockFilter } from '@/components/StockFilter';
import { DataTable } from '@/components/DataTable';
import { PerformanceCard } from '@/components/PerformanceCard';
import { useSelectedStocks } from '@/hooks/useSelectedStocks';

interface FilterValues {
  [key: string]: string | number | [number, number] | undefined;
}

export default function StockScreener() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedTickers, setSelectedTickers } = useSelectedStocks();

  // -------------------------------
  // Fetch stock data
  // -------------------------------
  useEffect(() => {
    async function fetchStockData() {
      setLoading(true);
      try {
        const res = await fetch('https://ojjpm8tp92.execute-api.us-west-2.amazonaws.com/prod/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setStockData(data); // overwrite previous data
        setSelectedTickers([]); // reset selection on new fetch
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStockData();
  }, [setSelectedTickers]);

  // -------------------------------
  // Filter Logic data for DataTable
  // -------------------------------
  const filteredData = useMemo(() => {
    return stockData.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        const field = (item as any)[key];
        if (value === undefined) return true;
        if (typeof value === 'string') return field === value;
        if (Array.isArray(value) && typeof field === 'number') {
          const [min, max] = value;
          return field >= min && field <= max;
        }
        if (typeof value === 'number' && typeof field === 'number') return field >= value; // ← changed
        return true;
      });
    });
  }, [filters, stockData]);
  const desiredCols: { key: string; label?: string }[] = [
    { key: "Tickers" },
    { key: "Company" },
    { key: "Sector" },
    { key: "Industry" },
    { key: "Close" },
    { key: "Volume" },
    { key: "Index" },
    { key: "forwardPE", label: "PE" },
    { key: "profitMargins", label: "Profit" },
    { key: "trailingEps", label: "EPS" },

  ];
  const mappedData = useMemo(() => {
    return filteredData.map((item) => {
      const newItem: Record<string, any> = {};
      desiredCols.forEach(({ key, label }) => {
        if (key in item) newItem[label || key] = item[key];
      });
      return newItem;
    });
  }, [filteredData]);

  const stockMetrics = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    const totalVolume = filteredData.reduce((acc, stock) => acc + (stock.Volume || 0), 0);
    const avgVolume = totalVolume / filteredData.length;

    const totalPrice = filteredData.reduce((acc, stock) => acc + (stock.Close || 0), 0);
    const avgPrice = totalPrice / filteredData.length;

    // Average profit margin
    const totalProfitMargin = filteredData.reduce((acc, stock) => acc + (stock.profitMargins || 0), 0);
    const avgProfitMargin = filteredData.length > 0 ? totalProfitMargin / filteredData.length : 0;

    return [
      {
        title: "Average Volume",
        value: `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(avgVolume)}`,
      },
      {
        title: "Average Price",
        value: `$${avgPrice.toFixed(2)}`,
      },
      {
        title: "Average Profit Margin",
        value: `${(avgProfitMargin * 100).toFixed(2)}%`,
      },
    ];
  }, [filteredData]);
  return (
    <Stack align="center" justify="xl" p="xs">
      {/* Performance Cards */}
      <Group justify="space-between" grow style={{ width: '100%' }}>

        {stockMetrics.map((metric) => (

          <PerformanceCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
          />
        ))}
      </Group>

      {/* Stock Filter */}
      <Card style={{ width: '100%' }} p="xl">
        <StockFilter
          data={stockData}
          values={filters}
          onChange={setFilters}
        />
      </Card>

      <Card style={{ width: "100%" }} >
        <DataTable
          data={mappedData}
          rowsPerPage={10}
          selectedRows={selectedTickers}
          onSelectionChange={(selected) => setSelectedTickers(selected)}
          badgeColumns={["Sector", "Industry", "Index"]}
        />

        {selectedTickers.length > 0 && (
          <Button
            component="a"
            // size="m"
            href="model-selection"
            mt="md"
            onClick={() => console.log("Selected rows:", selectedTickers)}
          >
            Optimize portfolio with {selectedTickers.length} selected stock(s)
          </Button>
        )}
      </Card>
      {/* <ScrollArea h={300} offsetScrollbars mt="md">

        <Code block>{JSON.stringify(filteredData, null, 2)}</Code>

      </ScrollArea> */}

    </Stack>
  );
}
