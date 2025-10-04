'use client';

import { useState } from 'react';
import {
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Checkbox,
  Pagination,
  Group,
  useMantineTheme,
  Center,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector, IconSearch } from '@tabler/icons-react';
import { buttonBackgroundColor } from "@/theme";

interface ThProps {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort: () => void;
}

function Th({ children, sorted, reversed, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

  return (
    <Table.Th>
      <UnstyledButton
        onClick={onSort}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {children} {/* plain text will inherit Mantine's table header styling */}
        <Icon size={16} stroke={1.5} />
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
  const theme = useMantineTheme();
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

      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
        highlightOnHover
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th> {/* checkbox column */}
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
                {String(key)} {/* no <Text fw={500}> needed */}
              </Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {paginatedData.map((row, idx) => (
            <Table.Tr
              key={idx}
              bg={selectedRows.includes(row) ? theme.colors.brand[buttonBackgroundColor] : undefined}
            >
              <Table.Td>
                <Checkbox
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRow(row)}
                  color="brand"
                />
              </Table.Td>
              {keys.map(key => (
                <Table.Td key={String(key)}>{String(row[key])}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Group justify="flex-end" mt="md">
        <Text size="sm">Page {activePage} of {Math.ceil(sortedData.length / rowsPerPage)}</Text>
        <Pagination
          total={Math.ceil(sortedData.length / rowsPerPage)}
          onChange={setActivePage}
          size="sm"
          color="brand"
        />
      </Group>
    </ScrollArea>
  );
}
