import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

interface ExportButtonProps {
  data: any[];
}

export function ExportButton({ data }: ExportButtonProps) {
  const handleExportCSV = () => {
    if (!data || !data.length) return;

    const keys = Object.keys(data[0]);
    const csv = [
      keys.join(','), // header row
      ...data.map(row =>
        keys.map(k => {
          const val = row[k];
          // Format numbers with two decimals if numeric
          return typeof val === 'number' ? `"${val.toFixed(2)}"` : `"${val}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'holdings.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleExportCSV}
      rightSection={<IconDownload size={16} />}
    >
      Export Results
    </Button>
  );
}
