import { useState, useMemo } from 'react';
import { Stack } from '@mantine/core';

import { DataTable } from '../components/DataTable';
import { StockFilter } from '@/components/StockFilter';
import { stockData } from '../dummy_data/stock_data';

interface FilterValues {
  sector?: string;
  index?: string;
  industry?: string;
  country?: string;
  pe?: string;
  profitMargin?: string;
  [key: string]: string | undefined;
}

export default function StockScreener() {
  const [filters, setFilters] = useState<FilterValues>({});

  const filteredData = useMemo(() => {
    return stockData.filter((item) => {
      if (filters.sector && item.sector !== filters.sector) return false;
      // if (filters.index && item.index !== filters.index) return false; // make sure `index` exists on stockData
      // add more filter rules as needed
      return true;
    });
  }, [filters]);

  return (
    <div>
      <h2>Stock Screener</h2>
      <h4>Next: A good idea for filter, is simple to get unique vals of table, 
        and then store that data inside for a slection, 
        this would help the componet in being more general i.e. it would run uniqe cols, 
        then uniqe vals of cols then apply that info to the filter
        alternativly we could just pass the table as params to stock filter, then it would match the uniqe vals to the cols, would be easier to do this,
        , and need to have data saving feature
        </h4>

    <Stack
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="lg"
    >
      <StockFilter values={filters} onChange={setFilters} />

      <DataTable
        data={filteredData}
        rowsPerPage={10}
        onSelectionChange={(selected) =>
          console.log('Selected rows:', selected)
        }
      />
    </Stack>
    </div>
  );
}


