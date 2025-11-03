import { useState, useMemo, useEffect } from 'react';
import { Stack, Button, Card, LoadingOverlay, Group, NumberFormatter } from '@mantine/core';
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
  // Filtered data for DataTable
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
        if (typeof value === 'number' && typeof field === 'number') return field === value;
        return true;
      });
    });
  }, [filters, stockData]);
  const stockMetrics = [
    { title: "Average Volume X", value: "1.2M X" },
    { title: "Average Price X", value: "$245.67 X" },
    { title: "52-Week Change X", value: "+18.4% X" },
  ];

  return (
<Stack align="center" justify="xl" p="xl">
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

  {/* Data Table with Loading and Button */}
  <Card style={{ width: '100%' }} p="xl">
    <LoadingOverlay visible={loading} />
    <DataTable
      data={filteredData}
      rowsPerPage={10}
      selectedRows={selectedTickers}
      onSelectionChange={(selected) => setSelectedTickers(selected)}
    />

    {selectedTickers.length > 0 && (
      <Button
        component="a"
        size="lg"
        href="model-selection"
        mt="md"
        onClick={() => console.log('Selected rows:', selectedTickers)}
      >
        Create and optimize a portfolio with my {selectedTickers.length} selected stock(s)
      </Button>
    )}
  </Card>
</Stack>
  );
}
