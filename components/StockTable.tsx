import { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import {
  Center,
  Group,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Checkbox,
} from '@mantine/core';
import classes from './TableSort.module.css';

interface StockData {
  ticker: string;
  title: string;
  sector: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: StockData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: StockData[],
  payload: { sortBy: keyof StockData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }
      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

// Dummy stock data
const data: StockData[] = [
  { ticker: 'AAPL', title: 'Apple Inc.', sector: 'Technology' },
  { ticker: 'MSFT', title: 'Microsoft Corp.', sector: 'Technology' },
  { ticker: 'GOOGL', title: 'Alphabet Inc.', sector: 'Communication Services' },
  { ticker: 'AMZN', title: 'Amazon.com Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'TSLA', title: 'Tesla Inc.', sector: 'Consumer Discretionary' },
  { ticker: 'JNJ', title: 'Johnson & Johnson', sector: 'Healthcare' },
  { ticker: 'JPM', title: 'JPMorgan Chase & Co.', sector: 'Financials' },
  { ticker: 'V', title: 'Visa Inc.', sector: 'Financials' },
  { ticker: 'PG', title: 'Procter & Gamble Co.', sector: 'Consumer Staples' },
  { ticker: 'NVDA', title: 'NVIDIA Corp.', sector: 'Technology' },
  { ticker: 'DIS', title: 'The Walt Disney Co.', sector: 'Communication Services' },
  { ticker: 'NFLX', title: 'Netflix Inc.', sector: 'Communication Services' },
  { ticker: 'BAC', title: 'Bank of America Corp.', sector: 'Financials' },
  { ticker: 'KO', title: 'Coca-Cola Co.', sector: 'Consumer Staples' },
  { ticker: 'PFE', title: 'Pfizer Inc.', sector: 'Healthcare' },
  { ticker: 'INTC', title: 'Intel Corp.', sector: 'Technology' },
  { ticker: 'CSCO', title: 'Cisco Systems Inc.', sector: 'Technology' },
  { ticker: 'WMT', title: 'Walmart Inc.', sector: 'Consumer Staples' },
  { ticker: 'ORCL', title: 'Oracle Corp.', sector: 'Technology' },
  { ticker: 'BA', title: 'Boeing Co.', sector: 'Industrials' },
];


export function StockTable() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof StockData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]); // store tickers of selected stocks

  const setSorting = (field: keyof StockData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const toggleRow = (ticker: string) => {
    setSelectedRows((prev) =>
      prev.includes(ticker) ? prev.filter((t) => t !== ticker) : [...prev, ticker]
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr
      key={row.ticker}
      bg={selectedRows.includes(row.ticker) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          checked={selectedRows.includes(row.ticker)}
          onChange={() => toggleRow(row.ticker)}
          aria-label={`Select ${row.ticker}`}
        />
      </Table.Td>
      <Table.Td>{row.ticker}</Table.Td>
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>{row.sector}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" striped highlightOnHover>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th></Table.Th> {/* Empty header for checkbox column */}
            <Th
              sorted={sortBy === 'ticker'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('ticker')}
            >
              Ticker
            </Th>
            <Th
              sorted={sortBy === 'title'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('title')}
            >
              Title
            </Th>
            <Th
              sorted={sortBy === 'sector'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('sector')}
            >
              Sector
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Text fw={500} ta="center">
                  No data found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
