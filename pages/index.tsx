'use client';

import { Title, Text, Stack, Grid, Card, Group } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { data } from "./data";
import { theme } from "@/theme";

// Define color palette safely
const successColor = theme.colors?.success?.[2] || "green";
const failureColor = theme.colors?.danger?.[2] || "red";

// Function to create a chart with a given color
const createChart = (color: string) => (
  <AreaChart
    h={300}
    data={data}
    dataKey="date"
    series={[{ name: "Apples", color }]}
    curveType="natural"
    tickLine="x"
    withGradient={false}
    withDots={false}
  />
);

// Dashboard sections configuration (alternate success / failure)
const dashboardSections = [
  { title: "Index Data", valueTitle: "S&P500" },
  { title: "Index Data", valueTitle: "Nasdaq" },
  { title: "Index Data", valueTitle: "Dow" },
  { title: "Economic Data", valueTitle: "Jobs" },
  { title: "Economic Data", valueTitle: "CPI" },
  { title: "Economic Data", valueTitle: "FedFund" },
].map((section, index) => ({
  ...section,
  chart: createChart(index % 2 === 0 ? successColor : failureColor),
}));

// Group sections by title
const groupedSections = dashboardSections.reduce<Record<string, typeof dashboardSections>>(
  (acc, section) => {
    if (!acc[section.title]) acc[section.title] = [];
    acc[section.title].push(section);
    return acc;
  },
  {}
);

export default function HomePage() {
  return (
    <Stack gap="xl" p="xl">
      {/* Intro Section */}

      <Stack gap="xl" justify="center">
        <Card padding="xl" >
        <Title order={1}>Hello, Welcome! 👋</Title>
        <Text size="lg">
          This app combines a stock screener and portfolio optimization. Users can select their preferred stocks and run various optimization algorithms to find the best portfolio for their needs.
        </Text>
        <Text size="md">
          On the home page we display basic index performance and economic data for a quick overview.
        </Text>
        </Card>
        {/* Dashboard Grid by Section */}
        {Object.entries(groupedSections).map(([sectionTitle, cards]) => (
          <Stack key={sectionTitle} gap="md">
            <Title order={3}>{sectionTitle}</Title>
            <Grid grow>
              {cards.map((card) => (
                <Grid.Col key={card.valueTitle} span={6}>
                  <Card shadow="sm" p="md" radius="md">
                    <Group justify="space-between" mb="sm">
                      <Title order={4}>{card.valueTitle}</Title>
                    </Group>
                    {card.chart}
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        ))}

      </Stack>
    </Stack>
  );
}
