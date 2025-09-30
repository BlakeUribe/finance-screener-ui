import { Container, Grid, Select, Tabs, Text } from '@mantine/core';
import { IconLetterCase, IconMathXDivideY2, IconSettings } from '@tabler/icons-react';

export function StockFilter() {
  return (
    <Container fluid h="100%" w="100%" bg="var(--mantine-color-blue-light)" p="md">

      <Tabs defaultValue="Qualitative" color="gray" variant="outline">
      {/* <Tabs defaultValue="Qualitative" color="gray" variant="pills"> */}

        <Tabs.List>
          <Tabs.Tab value="Qualitative" leftSection={<IconLetterCase size={16} />}>
            Qualitative
          </Tabs.Tab>
          <Tabs.Tab value="KPI" leftSection={<IconMathXDivideY2 size={16} />}>
            KPI
          </Tabs.Tab>
          <Tabs.Tab value="Placeholder" leftSection={<IconSettings size={16} />}>
            Place Holder
          </Tabs.Tab>
        </Tabs.List>

        {/* Qualitative Filters */}
        <Tabs.Panel value="Qualitative" pt="md">
          <Grid grow gutter="lg">
            <Grid.Col span="auto">
              <Select
                label="Index"
                placeholder="Pick value"
                data={['S&P 500', 'NASDAQ 100', 'Russell 2000', 'STOXX Europe 600']}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                label="Sector"
                placeholder="Pick value"
                data={['Technology', 'Healthcare', 'Financial', 'Consumer Cyclical']}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                label="Industry"
                placeholder="Pick value"
                data={['Communication Equipment', 'Asset Management', 'Auto Parts', 'ETF']}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                label="Country"
                placeholder="Pick value"
                data={['USA', 'Foreign (ex-USA)']}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* KPI Filters */}
        <Tabs.Panel value="KPI" pt="md">
          <Grid grow gutter="lg">
            <Grid.Col span="auto">
              <Select label="P/E" placeholder="Pick value" data={['Below x', 'Above x']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="Profit Margin" placeholder="Pick value" data={['Below x', 'Above x']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="KPI 1" placeholder="Pick value" data={['Below x', 'Above x']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="KPI 2" placeholder="Pick value" data={['Below x', 'Above x']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="KPI 3" placeholder="Pick value" data={['Below x', 'Above x']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="KPI 4" placeholder="Pick value" data={['Below x', 'Above x']} />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* Placeholder Filters */}
        <Tabs.Panel value="Placeholder" pt="md">
          <Grid grow gutter="lg">
            <Grid.Col span="auto">
              <Select label="Option 1" placeholder="Pick value" data={['A', 'B', 'C']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="Option 2" placeholder="Pick value" data={['X', 'Y', 'Z']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="Option 3" placeholder="Pick value" data={['Red', 'Blue', 'Green']} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select label="Option 4" placeholder="Pick value" data={['One', 'Two', 'Three']} />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
