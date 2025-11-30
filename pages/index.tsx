"use client";

import { useEffect, useState } from "react";
import { Title, Text, Stack, Grid, Card, Group, Box, Button, ThemeIcon, Container, LoadingOverlay } from "@mantine/core";
import { theme, defaultShade } from "@/theme";
import { IconArrowRight, IconTrendingUp, IconShieldCheck, IconBolt } from '@tabler/icons-react';
import { PerformanceCard } from "@/components/PerformanceCard";

import { PerformanceChart } from "@/components/charts/PerformanceChart";

const successColor = theme.colors?.success?.[2] || "green";
const failureColor = theme.colors?.danger?.[2] || "red";
const brand = theme.colors?.brand || "blue";

// Custom chart generator using PerformanceChart
const createChart = (data: any[], seriesName: string, color?: string) => {
  const chartData = data.map(d => ({
    Date: d.Date,
    Value: d[seriesName] ?? null,
  }));

  return <PerformanceChart data={chartData} dataKey="Value" positiveColor={successColor} negativeColor={failureColor} />;
};

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
        const sortedData = json.data.sort((a: any, b: any) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
        setEconData(sortedData);
      } catch (err) {
        console.error(err);
      } finally {
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
        const sortedData = json.data.sort((a: any, b: any) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
        setIndexData(sortedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingIndex(false);
      }
    };
    fetchIndexData();
  }, []);

  // Sections
  const indexSections = [
    { title: "Major Indexes Performance", valueTitle: "S&P500", displayTitle: "S&P500" },
    { title: "Major Indexes Performance", valueTitle: "Nasdaq", displayTitle: "Nasdaq" },
    { title: "Major Indexes Performance", valueTitle: "Dow_Jones", displayTitle: "Dow Jones" },
  ];

  const econSections = [
    { title: "Economic Indicators", valueTitle: "Fed_Funds", displayTitle: "Fed Funds Rate" },
    { title: "Economic Indicators", valueTitle: "CPI", displayTitle: "Consumer Inflation" },
    { title: "Economic Indicators", valueTitle: "Unemployment_Rate", displayTitle: "Unemployment Rate" },
    // { title: "Economic Indicators", valueTitle: "Real_GDP" }, // took out as it wasnt displaying chart
  ];

  const mapSections = (sections: typeof indexSections | typeof econSections, data: any[], loading: boolean) =>
    sections.map((section, idx) => ({
      ...section,
      chart: loading ? <LoadingOverlay /> : createChart(data, section.valueTitle),
    }));

  const dashboardSections = [
    ...mapSections(indexSections, indexData, loadingIndex),
    ...mapSections(econSections, econData, loadingEcon),
  ];

  const groupedSections = dashboardSections.reduce<Record<string, typeof dashboardSections>>((acc, section) => {
    if (!acc[section.title]) acc[section.title] = [];
    acc[section.title].push(section);
    return acc;
  }, {});

  // Latest values
  type DashboardKey = "S&P500" | "Nasdaq" | "Dow_Jones" | "Fed_Funds" | "CPI" | "Unemployment_Rate";

  const latestValues: Record<DashboardKey, number | null> = {
    "S&P500": indexData.length ? indexData[indexData.length - 1]["S&P500"] : null,
    Nasdaq: indexData.length ? indexData[indexData.length - 1]["Nasdaq"] : null,
    Dow_Jones: indexData.length ? indexData[indexData.length - 1]["Dow_Jones"] : null,
    Fed_Funds: econData.length ? econData[econData.length - 1]["Fed_Funds"] : null,
    CPI: econData.length ? econData[econData.length - 1]["CPI"] : null,
    Unemployment_Rate: econData.length ? econData[econData.length - 1]["Unemployment_Rate"] : null,
    // Real_GDP: econData.length ? econData[econData.length - 1]["Real_GDP"] : null,
  };

  const previousValues: Record<DashboardKey, number | null> = {
    "S&P500": indexData.length > 1 ? indexData[indexData.length - 2]["S&P500"] : null,
    Nasdaq: indexData.length > 1 ? indexData[indexData.length - 2]["Nasdaq"] : null,
    Dow_Jones: indexData.length > 1 ? indexData[indexData.length - 2]["Dow_Jones"] : null,
    Fed_Funds: econData.length > 1 ? econData[econData.length - 2]["Fed_Funds"] : null,
    CPI: econData.length > 1 ? econData[econData.length - 2]["CPI"] : null,
    Unemployment_Rate: econData.length > 1 ? econData[econData.length - 2]["Unemployment_Rate"] : null,
    // Real_GDP: econData.length > 1 ? econData[econData.length - 2]["Real_GDP"] : null,
  };

  const computeIsUp = (latest: number | null, previous: number | null) => {
    if (latest === null || previous === null) return null;
    return latest > previous;
  };
  const dashboardCards: { title: string; key: DashboardKey }[] = [
    { title: "S&P 500", key: "S&P500" },
    { title: "Nasdaq", key: "Nasdaq" },
    { title: "Dow Jones", key: "Dow_Jones" },
    { title: "Fed Funds Rate", key: "Fed_Funds" },
  ];

  return (
    <div>
      <Box w="100%" bg={brand[defaultShade]} py="xl">
        <Container c="white" p="lg">
          <Title order={1}>Smart Portfolio Optimization</Title>
          <Title order={1}>Made Simple</Title>
          <Text>Screen many portfolios and optimize your investments with most recent economic data.</Text>
          <Text>Make informed decisions backed by comprehensive market analysis and cutting-edge algorithms.</Text>

          <Group gap="md" mt="md">
            <Button variant="filledAlt" component="a" href="/stock-screener" rightSection={<IconArrowRight size={24} />} size="lg">
              Get Started
            </Button>
            <Button variant="alt" component="a" href="/user-guide" size="lg">
              Learn More
            </Button>
          </Group>

          <Group  justify="center" mt="xl" grow>
            {[
              { icon: IconTrendingUp, title: "Continuous Market Analysis", subtitle: "Consistently Updated Market Information" },
              { icon: IconShieldCheck, title: "Secure Insights", subtitle: "Data from Leading Financial Providers" },
              { icon: IconBolt, title: "High Performance", subtitle: "AI-Powered Optimized Computation" },
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
        <Group justify="space-between" gap="lg" grow>
          {dashboardCards.map((card) => (
            <PerformanceCard
              key={card.key}
              title={card.title}
              value={latestValues[card.key] ?? null}
              isUp={computeIsUp(latestValues[card.key], previousValues[card.key])}
            />
          ))}
        </Group>

        {Object.entries(groupedSections).map(([sectionTitle, cards]) => (
          <Stack key={sectionTitle} gap="md">
            <Title order={3}>{sectionTitle}</Title>
            <Grid grow>
              {cards.map((card) => (
                <Grid.Col key={card.valueTitle} span={3}>
                  <Card>
                    <Group justify="space-between" mb="sm">
                      <Title order={4}>{card.displayTitle}</Title>
                    </Group>
                    {card.chart}
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}
