// pages/index.tsx
import { StockTable } from '../components/StockTable'; // use braces
import { StockFilter } from '@/components/StockFilter';
import { Stack, Group } from '@mantine/core';

export default function StockScreener() {
  return (
    <div>
      <h2>Stock Screener</h2>
      <h4>Next add the filter to apply to table, paginate table, and save data from table</h4>

      <Stack
        // h={300}
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="lg"
      >
        <StockFilter />

        <StockTable />
        
      </Stack>
    </div>
  );
}
