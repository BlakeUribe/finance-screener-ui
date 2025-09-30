// pages/portfolio.tsx
import { Text, Box } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { data } from './data';

export default function PortfolioPage() {
  return (
    <div>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Place Holder for my chosen Portfolio, and we could display some portfolio stats
      </Text>

      <LineChart
      h={200}
      w={500}
      data={data}
      dataKey="date"
      series={[
        { name: 'Apples', color: 'indigo.6' },
        { name: 'Oranges', color: 'blue.6' },
        { name: 'Tomatoes', color: 'teal.6' },
      ]}
      curveType="linear"
    />
  </div>
  );
}
