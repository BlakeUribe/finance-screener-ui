// pages/index.tsx
import { Title, Text, Stack } from '@mantine/core';

export default function HomePage() {
  return (
    <Stack gap="md" align="flex-start">
      <Title order={1}>Hello, Welcome! 👋</Title>
      <Text size="lg">
        This app combines a stock screener and portfolio optimization. 
        Users can select their preferred stocks and run various optimization 
        algorithms to find the best portfolio for their needs.
      </Text>
      <Text size="md">
        On the home page we could have basic index performance, and a "Getting Started"
      </Text>
    </Stack>
  );
}
