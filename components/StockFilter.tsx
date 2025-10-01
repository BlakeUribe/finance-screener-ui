import { Container, Grid, Select, Tabs } from '@mantine/core';
import { IconLetterCase, IconMathXDivideY2, IconSettings } from '@tabler/icons-react';

export interface FilterValues {
  index?: string;
  sector?: string;
  industry?: string;
  country?: string;
  pe?: string;
  profitMargin?: string;
  [key: string]: string | undefined; // allow additional dynamic fields
}

interface StockFilterProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}

export function StockFilter({ values, onChange }: StockFilterProps) {
  const handleChange = (field: string, value: string | null) => {
    onChange({ ...values, [field]: value ?? undefined });
  };

  return (
    <Container fluid h="100%" w="100%" p="md">
      <Tabs defaultValue="Qualitative" color="gray" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="Qualitative" leftSection={<IconLetterCase size={16} />}>
            Qualitative
          </Tabs.Tab>
          <Tabs.Tab value="KPI" leftSection={<IconMathXDivideY2 size={16} />}>
            KPI
          </Tabs.Tab>
          <Tabs.Tab value="Placeholder" leftSection={<IconSettings size={16} />}>
            Placeholder
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
                value={values.index}
                onChange={(v) => handleChange('index', v)}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                label="Sector"
                placeholder="Pick value"
                data={['Technology', 'Communication Services', 'Consumer Discretionary', 'Financials']}
                value={values.sector}
                onChange={(v) => handleChange('sector', v)}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                label="Industry"
                placeholder="Pick value"
                data={['Communication Equipment', 'Asset Management', 'Auto Parts', 'ETF']}
                value={values.industry}
                onChange={(v) => handleChange('industry', v)}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                label="Country"
                placeholder="Pick value"
                data={['USA', 'Foreign (ex-USA)']}
                value={values.country}
                onChange={(v) => handleChange('country', v)}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* KPI Filters */}
        <Tabs.Panel value="KPI" pt="md">
          <Grid grow gutter="lg">
            <Grid.Col span="auto">
              <Select
                label="P/E"
                placeholder="Pick value"
                data={['Below x', 'Above x']}
                value={values.pe}
                onChange={(v) => handleChange('pe', v)}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                label="Profit Margin"
                placeholder="Pick value"
                data={['Below x', 'Above x']}
                value={values.profitMargin}
                onChange={(v) => handleChange('profitMargin', v)}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
