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
  NumberFormatter,
  Badge
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector, IconSearch } from '@tabler/icons-react';
import { buttonBackgroundColor } from "@/theme";

import { theme, defaultShade } from '@/theme';

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
          justifyContent: 'space-between'
        }}
      >
        {children}
        <Icon size={16} stroke={1.5} />
      </UnstyledButton>
    </Table.Th>
  );
}

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  rowsPerPage?: number;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selected: T[]) => void;

  badgeColumns?: string[];         // ★ NEW: columns to format as badges
}

export function DataTable<T extends Record<string, any>>({
  data,
  rowsPerPage = 10,
  selectable = true,
  selectedRows = [],
  onSelectionChange,

  badgeColumns = []               // ★ default to empty array
}: DataTableProps<T>) {
  const theme = useMantineTheme();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [reverseSort, setReverseSort] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
      const aVal = String(a[sortBy]);
      const bVal = String(b[sortBy]);
      return reverseSort ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    })
    : filteredData;

  const paginatedData = sortedData.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage);

  const toggleRow = (row: T) => {
    if (!selectable) return;
    const exists = selectedRows.includes(row);
    const newSelected = exists ? selectedRows.filter(r => r !== row) : [...selectedRows, row];
    onSelectionChange?.(newSelected);
  };

  const keys = data[0] ? (Object.keys(data[0]) as (keyof T)[]) : [];

  const brandColor = theme.colors.brand[defaultShade]
  const lightColor = theme.colors.light[defaultShade]

  return (
    <>
      <ScrollArea>
        <TextInput
          placeholder="Search..."
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={e => { setSearch(e.currentTarget.value); setActivePage(1); }}
        />

        <Table
          // horizontalSpacing="md"
          verticalSpacing="xs"
          // miw={900}                     // ★ more room for wide text
          fz="xs"
          highlightOnHover
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              {selectable && <Table.Th></Table.Th>}
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
          </Table.Thead>

          <Table.Tbody>
            {paginatedData.map((row, idx) => (
              <Table.Tr
                key={idx}
                bg={selectedRows.includes(row) ? theme.colors.brand[buttonBackgroundColor] : undefined}
              >
                {selectable && (
                  <Table.Td>
                    <Checkbox
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRow(row)}
                      color="brand"
                    />
                  </Table.Td>
                )}

                {keys.map(key => {
                  const value = row[key];
                  const isBadge = badgeColumns.includes(String(key));

                  return (
                    <Table.Td
                      key={String(key)}
                      style={{
                        // whiteSpace: 'nowrap',     // ★ prevents squeezing text
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {typeof value === 'number' ? (
                        <NumberFormatter value={value} thousandSeparator decimalScale={2} />
                      ) : isBadge ? (
                        <Badge
                          fullWidth
                          variant="outline"
                          size="xs"
                          style={{
                            backgroundColor: lightColor,      // always white
                            color: brandColor,               // brand-colored text
                            borderColor: brandColor,         // brand-colored border
                            fontSize: 8,                    // smaller text
                            padding: '2px 6px',              // optional: tighter padding
                          }}
                        >
                          {String(value)}
                        </Badge>

                      ) : (
                        String(value)
                      )}
                    </Table.Td>
                  );
                })}
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
    </>
  );
}
