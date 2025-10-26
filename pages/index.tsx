'use client';

import { useEffect, useState } from "react";
import { Title, Text, Stack, Grid, Card, Group, Box, Button, ThemeIcon } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { theme } from "@/theme";
import { IconArrowRight, IconTrendingUp, IconShieldCheck, IconBolt } from '@tabler/icons-react';

const successColor = theme.colors?.success?.[2] || "green";
const failureColor = theme.colors?.danger?.[2] || "red";

// Chart generator
const createChart = (data: any[], seriesName: string, color: string) => (
  <AreaChart
    h={300}
    data={data}
    dataKey="Date"
    series={[{ name: seriesName, color }]}
  />
);

export default function HomePage() {
  const [econData, setEconData] = useState<any[]>([]);
  const [indexData, setIndexData] = useState<any[]>([]);
  const [loadingEcon, setLoadingEcon] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState(true);

  // Fetch economic data
  useEffect(() => {
    const fetchEconData = async () => {
      try {
        const res = await fetch("https://2de1nbshda.execute-api.us-west-2.amazonaws.com/prod/");
        const json = await res.json();
        const sortedData = json.data.sort(
          (a: any, b: any) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );
        setEconData(sortedData);
        setLoadingEcon(false);
      } catch (err) {
        console.error(err);
        setLoadingEcon(false);
      }
    };
    fetchEconData();
  }, []);

  // Fetch index data
  useEffect(() => {
    const fetchIndexData = async () => {
      try {
        const res = await fetch("https://40ebmzbm1a.execute-api.us-west-2.amazonaws.com/prod/");
        const json = await res.json();
        const sortedData = json.data.sort(
          (a: any, b: any) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
        );
        setIndexData(sortedData);
        setLoadingIndex(false);
      } catch (err) {
        console.error(err);
        setLoadingIndex(false);
      }
    };
    fetchIndexData();
  }, []);

  // --- Sections ---
  const indexSections = [
    { title: "Major Indexes Performance", valueTitle: "S&P500" },
    { title: "Major Indexes Performance", valueTitle: "Nasdaq" },
    { title: "Major Indexes Performance", valueTitle: "Dow_Jones" },
  ];

  const econSections = [
    { title: "Economic Indicators", valueTitle: "Fed_Funds" },
    { title: "Economic Indicators", valueTitle: "CPI" },
    { title: "Economic Indicators", valueTitle: "Unemployment_Rate" },
    { title: "Economic Indicators", valueTitle: "Real_GDP" },
  ];

  const mapSections = (sections: typeof indexSections | typeof econSections, data: any[], loading: boolean) =>
    sections.map((section, idx) => ({
      ...section,
      chart: loading
        ? <Text>Loading...</Text>
        : createChart(
          data.map((d) => ({
            Date: d.Date,
            [section.valueTitle]: d[section.valueTitle] ?? null
          })),
          section.valueTitle,
          idx % 2 === 0 ? successColor : failureColor
        ),
    }));

  const dashboardSections = [
    ...mapSections(indexSections, indexData, loadingIndex),
    ...mapSections(econSections, econData, loadingEcon),
  ];

  const groupedSections = dashboardSections.reduce<Record<string, typeof dashboardSections>>(
    (acc, section) => {
      if (!acc[section.title]) acc[section.title] = [];
      acc[section.title].push(section);
      return acc;
    },
    {}
  );

  const latestIndexValues = indexData.length
    ? {
      "S&P500": indexData[indexData.length - 1]["S&P500"],
      Nasdaq: indexData[indexData.length - 1]["Nasdaq"],
      Dow_Jones: indexData[indexData.length - 1]["Dow_Jones"],
    }
    : { "S&P500": null, Nasdaq: null, Dow_Jones: null };

  return (
    <div>
      {/* Top section with a different color */}
      <div>
        <Box
          w="100%"
          bg="blue"
          c="white"
          py="xl"
          px="lg"
          ta="center"
        >
          <Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Title order={1}>Smart Portfolio Optimization</Title>
            <Title order={1}>Made Simple</Title>
            <Text>
              Screen thousands of portfolios and optimize your investments with real-time economic data.
            </Text>
            <Text>
              Make informed decisions backed by comprehensive market analysis and cutting-edge algorithms.

            </Text>
            <Text size="md">
              Quick overview of major indexes and economic indicators
            </Text>

            {/* Buttons beside each other */}
            <Group gap="md">
              <Button rightSection={<IconArrowRight size={14} />}
              >Get Started</Button>
              <Button variant="light">Learn More</Button>
            </Group>
            <Group gap="xl" justify="center">
              {/* Feature 1 */}
              <Group gap="sm">
                <ThemeIcon color="indigo" size="xl">
                  <IconTrendingUp size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={500}>Real-time Analysis</Text>
                  <Text size="xs" >Live Market Data</Text>
                </div>
              </Group>

              {/* Feature 2 */}
              <Group gap="sm">
                <ThemeIcon color="indigo" size="xl">
                  <IconShieldCheck size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={500}>Secure Insights</Text>
                  <Text size="xs">Protected Analytics</Text>
                </div>
              </Group>

              {/* Feature 3 */}
              <Group gap="sm">
                <ThemeIcon color="indigo" size="xl">
                  <IconBolt size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={500}>High Performance</Text>
                  <Text size="xs">Optimized Computation</Text>
                </div>
              </Group>
            </Group>
          </Group>
        </Box>
      </div>


      <Stack gap="xl" p="xl">
        <Stack gap="xl" justify="center">


          {/* Most Recent Index Values */}
          <Group grow>
            {/* S&P 500 */}
            <Card>
              <Text size="sm">S&P 500</Text>
              <Text fw={600} fz="lg">
                {latestIndexValues["S&P500"]?.toFixed(2)}
              </Text>
              <IconTrendingUp color="green" size={20} />
              <Text size="xs" c="dimmed">
                Last updated: 2 hours ago
              </Text>
            </Card>

            {/* Nasdaq */}
            <Card>
              <Text size="sm">Nasdaq</Text>
              <Text fw={600} fz="lg">
                {latestIndexValues["Nasdaq"]?.toFixed(2)}
              </Text>
              <IconTrendingUp color="green" size={20} />
              <Text size="xs" c="dimmed">
                Last updated: 2 hours ago
              </Text>
            </Card>

            {/* Dow Jones */}
            <Card>
              <Text size="sm">Dow Jones</Text>
              <Text fw={600} fz="lg">
                {latestIndexValues["Dow_Jones"]?.toFixed(2)}
              </Text>
              <IconTrendingUp color="green" size={20} />
              <Text size="xs" c="dimmed">
                Last updated: 2 hours ago
              </Text>
            </Card>
          </Group>

          {/* Dashboard Grid */}
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
    </div>
  );
}
