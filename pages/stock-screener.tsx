import { useState, useMemo } from 'react';
import { Stack, Button } from '@mantine/core';
import { StockFilter } from '@/components/StockFilter';
import { DataTable } from '@/components/DataTable';
import { stockData } from '../dummy_data/stock_data';

interface FilterValues {
  [key: string]: string | number | [number, number] | undefined; // dynamic, works for both qualitative and quantitative fields
}

export default function StockScreener() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [selectedRows, setSelectedRows] = useState<typeof stockData>([]);


  const filteredData = useMemo(() => {
    return stockData.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        const field = (item as any)[key]; // cast to any

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
  }, [filters]);

  return (
    <Stack bg="var(--mantine-color-body)" align="center" justify="center" gap="lg">

      <StockFilter 
        data={stockData} 
        values={filters} 
        onChange={setFilters} 
      />

      <DataTable
        data={filteredData}
        rowsPerPage={10}
        onSelectionChange={(selected) => setSelectedRows(selected)}
      />

      {selectedRows.length > 0 && (
        <Button
          component='a'
          href='/model-selection'
          onClick={() => console.log('Selected rows:', selectedRows)}
        >
          Create and optimize a portfolio with my {selectedRows.length} selected stock(s)
        </Button>
      )}


    </Stack>
  );
}
