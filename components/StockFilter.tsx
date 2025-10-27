import { Container, Grid, Select, Tabs, Slider, RangeSlider, Text } from '@mantine/core';
import { IconLetterCase, IconMathXDivideY2, IconSettings } from '@tabler/icons-react';

type FilterValues = { [key: string]: string | number | [number, number] | undefined };


interface StockFilterProps {
  data: Record<string, any>[];   // dynamic data array
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}

export function StockFilter({ data, values, onChange }: StockFilterProps) {
  // Helper to update filter values
  const handleChange = (field: string, value: string | number | [number, number] | null) => {
    onChange({ ...values, [field]: value ?? undefined });
  };

  // Dynamically determine qualitative fields (string-type)
  const qualitativeFields = data.length
    ? Object.keys(data[0]).filter((key) => typeof data[0][key] === 'string')
    : [];

  // Dynamically determine quantitative fields (number-type)
  const quantitativeFields = data.length
    ? Object.keys(data[0]).filter((key) => typeof data[0][key] === 'number')
    : [];

  // Compute unique values for each qualitative field
  const uniqueQualValues: { [key: string]: string[] } = {};
  qualitativeFields.forEach((key) => {
    uniqueQualValues[key] = Array.from(
      new Set(data.map((item) => item[key]).filter(Boolean))
    );
  });

  // Compute min and max for each quantitative field
const quantitativeStats: { [key: string]: { min: number; max: number } } = {};

  quantitativeFields.forEach((key) => {
    // Collect all numeric values and filter out null/undefined
    const values = data
      .map((item) => item[key])
      .filter((v): v is number => typeof v === 'number'); // type guard ensures TypeScript knows these are numbers

    if (values.length === 0) return;

    // Compute min and max, works for integers and decimals
    const min = Math.min(...values);
    const max = Math.max(...values);

    quantitativeStats[key] = { min, max };
  });

  return (
    <Container fluid h="100%" w="100%" p="md">
      <Tabs defaultValue="Qualitative" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="Qualitative" leftSection={<IconLetterCase size={16} />}>
            Qualitative
          </Tabs.Tab>
          <Tabs.Tab value="Quantitative" leftSection={<IconMathXDivideY2 size={16} />}>
            Quantitative
          </Tabs.Tab>
          <Tabs.Tab value="Placeholder" leftSection={<IconSettings size={16} />}>
            Placeholder
          </Tabs.Tab>
        </Tabs.List>

        {/* Qualitative Filters */}
        <Tabs.Panel value="Qualitative" pt="md">
          <Grid grow gutter="lg">
            {qualitativeFields.map((key) => (
              <Grid.Col span="auto" key={key}>
                <Select
                  label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize key for label
                  placeholder={`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  data={uniqueQualValues[key]}
                  value={typeof values[key] === 'string' ? values[key] : undefined} // only pass string
                  onChange={(v) => handleChange(key, v)}
                  clearable
                  searchable
                  nothingFoundMessage="Nothing found..."

                />
              </Grid.Col>
            ))}
          </Grid>
        </Tabs.Panel>

        {/* KPI Filters */}
      <Tabs.Panel value="Quantitative" pt="md">
        <Grid grow gutter="lg">
          {quantitativeFields.map((key) => (
            <Grid.Col span="auto" key={key}>
              <Text>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>

{/* Issue with reading decimals */}
                <RangeSlider
                  min={quantitativeStats[key].min}
                  max={quantitativeStats[key].max}
                  minRange={0.00}
                  step={0.01} // set step for decimals
                  value={
                    Array.isArray(values[key])
                      ? (values[key] as [number, number])
                      : [quantitativeStats[key].min, quantitativeStats[key].max]
                  }
                  onChange={(v: [number, number]) => handleChange(key, v)}
                  marks={[
                    { value: quantitativeStats[key].min, label: `${quantitativeStats[key].min}` },
                    { value: quantitativeStats[key].max, label: `${quantitativeStats[key].max}` },
                  ]}
                />

            </Grid.Col>
          ))}
        </Grid>
        </Tabs.Panel>

      </Tabs>
    </Container>
  );
}
