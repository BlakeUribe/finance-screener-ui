import { useState } from 'react';
import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Checkbox,
  Pagination,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector, IconSearch } from '@tabler/icons-react';
import classes from './TableSort.module.css';

interface ThProps {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort: () => void;
}

function Th({ children, sorted, reversed, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group>
          <Text fw={500} fz="sm">{children}</Text>
          <Center className={classes.icon}><Icon size={16} stroke={1.5} /></Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  rowsPerPage?: number;
  onSelectionChange?: (selected: T[]) => void;
}

export function DataTable<T extends Record<string, any>>({
  data,
  rowsPerPage = 10,
  onSelectionChange,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSort, setReverseSort] = useState(false);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [activePage, setActivePage] = useState(1);

  // Filter
  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  // Sort
  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        const aVal = String(a[sortBy]);
        const bVal = String(b[sortBy]);
        return reverseSort ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      })
    : filteredData;

  // Pagination
  const paginatedData = sortedData.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage);

  const toggleRow = (row: T) => {
    setSelectedRows(prev => {
      const exists = prev.includes(row);
      const newSelected = exists ? prev.filter(r => r !== row) : [...prev, row];
      onSelectionChange?.(newSelected);
      return newSelected;
    });
  };

  const keys = data[0] ? (Object.keys(data[0]) as (keyof T)[]) : [];

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search..."
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={e => { setSearch(e.currentTarget.value); setActivePage(1); }}
      />

      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" striped highlightOnHover>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th></Table.Th>
            {keys.map(key => (
              <Th
                key={String(key)}
                sorted={sortBy === key}
                reversed={reverseSort}
                onSort={() => {
                  const reversed = key === sortBy ? !reverseSort : false;
                  setReverseSort(reversed);
                  setSortBy(key);
                }}
              >
                {String(key)}
              </Th>
            ))}
          </Table.Tr>
        </Table.Tbody>

        <Table.Tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <Table.Tr key={idx} bg={selectedRows.includes(row) ? 'var(--mantine-color-blue-light)' : undefined}>
                <Table.Td>
                  <Checkbox checked={selectedRows.includes(row)} onChange={() => toggleRow(row)} />
                </Table.Td>
                {keys.map(key => (
                  <Table.Td key={String(key)}>{String(row[key])}</Table.Td>
                ))}
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={keys.length + 1}>
                <Text fw={500} ta="center">No data found</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Group justify="flex-end" mt="md">
        <Text size="sm">Page {activePage} of {Math.ceil(sortedData.length / rowsPerPage)}</Text>
        <Pagination
          total={Math.ceil(sortedData.length / rowsPerPage)}
          onChange={setActivePage}
          size="sm"
        />
      </Group>
    </ScrollArea>
  );
}