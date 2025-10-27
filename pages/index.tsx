"use client";

import { useEffect, useState } from "react";
import { Title, Text, Stack, Grid, Card, Group, Box, Button, ThemeIcon, Container, LoadingOverlay } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { theme, defaultShade } from "@/theme";
import { IconArrowRight, IconTrendingUp, IconShieldCheck, IconBolt } from '@tabler/icons-react';

import { PerformanceCard } from "@/components/PerformanceCard";

const successColor = theme.colors?.success?.[2] || "green";
const failureColor = theme.colors?.danger?.[2] || "red";
const brand = theme.colors?.brand || "blue"

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

  // Map sections to charts
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
  type IndexKey = "S&P500" | "Nasdaq" | "Dow_Jones";
  type EconKey = "Fed_Funds" | "CPI" | "Unemployment_Rate" | "Real_GDP";

  // Unified key type
  type DashboardKey = IndexKey | EconKey;

  // Unified latest values object
  const latestValues: Record<DashboardKey, number | null> = {
    "S&P500": indexData.length ? indexData[indexData.length - 1]["S&P500"] : null,
    Nasdaq: indexData.length ? indexData[indexData.length - 1]["Nasdaq"] : null,
    Dow_Jones: indexData.length ? indexData[indexData.length - 1]["Dow_Jones"] : null,
    Fed_Funds: econData.length ? econData[econData.length - 1]["Fed_Funds"] : null,
    CPI: econData.length ? econData[econData.length - 1]["CPI"] : null,
    Unemployment_Rate: econData.length ? econData[econData.length - 1]["Unemployment_Rate"] : null,
    Real_GDP: econData.length ? econData[econData.length - 1]["Real_GDP"] : null,
  };

  const dashboardCards: { title: string; key: DashboardKey }[] = [
    { title: "S&P 500", key: "S&P500" },
    { title: "Nasdaq", key: "Nasdaq" },
    { title: "Dow Jones", key: "Dow_Jones" },
    { title: "Fed Funds Rate", key: "Fed_Funds" },
    // Add/remove any other indicators dynamically
  ];

  return (
    <div>
      {/* Top section with a different color */}
      <Box w="100%" bg={brand[defaultShade]} py="xl" >
        <Container c="white" p="lg">
          {/* Titles and Intro */}
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

          {/* Buttons */}
          <Group gap="md" mt="md">
            <Button variant="defualt" rightSection={<IconArrowRight size={24} />} size="lg">Get Started</Button>
            <Button variant="outline"size="lg">Learn More</Button>
          </Group>

          {/* Features */}
          <Group gap="2xl" justify="center" mt="xl" grow>
            {[
              { icon: IconTrendingUp, title: "Real-time Analysis", subtitle: "Live Market Data" },
              { icon: IconShieldCheck, title: "Secure Insights", subtitle: "Protected Analytics" },
              { icon: IconBolt, title: "High Performance", subtitle: "Optimized Computation" },
            ].map((feature) => (
              <Group key={feature.title} gap="md" align="center">
                <ThemeIcon color="indigo" size={64} radius="md">
                  <feature.icon size={32} />
                </ThemeIcon>
                <div>
                  <Text size="lg" fw={600}>{feature.title}</Text>
                  <Text size="md">{feature.subtitle}</Text>
                </div>
              </Group>
            ))}
          </Group>
        </Container>
      </Box>

      <Stack gap="xl" p="xl">
        <Stack gap="xl" justify="center">
          {/* Most Recent Index Values */}
          <Group grow>
            {dashboardCards.map((card) => (
<PerformanceCard
  title={card.title}
  value={
    latestValues[card.key] ?? null  }
/>
            ))}

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
