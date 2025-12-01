// import { Container, Grid, Select, Tabs, RangeSlider, Text, Divider } from '@mantine/core';
// import { IconLetterCase, IconMathXDivideY2, IconSettings } from '@tabler/icons-react';
// import { theme, defaultShade } from '@/theme';

// type FilterValues = { [key: string]: string | number | [number, number] | undefined };


// interface StockFilterProps {
//   data: Record<string, any>[];   // dynamic data array
//   values: FilterValues;
//   onChange: (values: FilterValues) => void;
// }

// export function StockFilter({ data, values, onChange }: StockFilterProps) {
//   // Helper to update filter values
//   const handleChange = (field: string, value: string | number | [number, number] | null) => {
//     onChange({ ...values, [field]: value ?? undefined });
//   };

//   // Dynamically determine qualitative fields (string-type)
//   const qualitativeFields = data.length
//     ? Object.keys(data[0]).filter((key) => typeof data[0][key] === 'string')
//     : [];

//   // Dynamically determine quantitative fields (number-type)
//   const quantitativeFields = data.length
//     ? Object.keys(data[0]).filter((key) => typeof data[0][key] === 'number')
//     : [];

//   // Compute unique values for each qualitative field
//   const uniqueQualValues: { [key: string]: string[] } = {};
//   qualitativeFields.forEach((key) => {
//     uniqueQualValues[key] = Array.from(
//       new Set(data.map((item) => item[key]).filter(Boolean))
//     );
//   });

//   // Compute min and max for each quantitative field
//   const quantitativeStats: { [key: string]: { min: number; max: number } } = {};

//   quantitativeFields.forEach((key) => {
//     // Collect all numeric values and filter out null/undefined
//     const values = data
//       .map((item) => item[key])
//       .filter((v): v is number => typeof v === 'number'); // type guard ensures TypeScript knows these are numbers

//     if (values.length === 0) return;

//     // Compute min and max, works for integers and decimals
//     const min = Math.min(...values);
//     const max = Math.max(...values);

//     quantitativeStats[key] = { min, max };
//   });

//   const brandColor = theme.colors?.brand?.[defaultShade];

//   return (
//     <Container fluid h="100%" w="100%" p="md">

//       <Tabs
//         defaultValue="Qualitative"
//         variant="pills"
//         color={brandColor}
//       >
//         <Tabs.List>
//           <Tabs.Tab value="Qualitative" leftSection={<IconLetterCase size={16} />}>
//             Qualitative
//           </Tabs.Tab>
//           <Tabs.Tab value="Quantitative" leftSection={<IconMathXDivideY2 size={16} />}>
//             Quantitative
//           </Tabs.Tab>
//           {/* <Tabs.Tab value="Placeholder" leftSection={<IconSettings size={16} />}>
//             Placeholder
//           </Tabs.Tab> */}
//         </Tabs.List>

//         <Divider />
//         {/* Qualitative Filters */}
//         <Tabs.Panel value="Qualitative" pt="md">
//           <Grid grow gutter="lg">
//             {qualitativeFields.map((key) => (
//               <Grid.Col span="auto" key={key}>
//                 <Select
//                   label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize key for label
//                   placeholder={`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}
//                   data={uniqueQualValues[key]}
//                   value={typeof values[key] === 'string' ? values[key] : undefined} // only pass string
//                   onChange={(v) => handleChange(key, v)}
//                   clearable
//                   searchable
//                   nothingFoundMessage="Nothing found..."

//                 />
//               </Grid.Col>
//             ))}
//           </Grid>
//         </Tabs.Panel>

//         {/* KPI Filters */}
//         <Tabs.Panel value="Quantitative" pt="lg">
//           <Grid justify="space-between" grow gutter="xl">
//             {quantitativeFields.map((key) => (
//               <Grid.Col span={4} key={key}>
//                 <Text>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>

//                 <RangeSlider
//                   min={quantitativeStats[key].min}
//                   max={quantitativeStats[key].max}
//                   minRange={0}
//                   step={0.01}
//                   value={
//                     Array.isArray(values[key])
//                       ? (values[key] as [number, number])
//                       : [quantitativeStats[key].min, quantitativeStats[key].max]
//                   }
//                   onChange={(v: [number, number]) => handleChange(key, v)}
//                   label={(val) =>
//                     new Intl.NumberFormat("en-US", {
//                       minimumFractionDigits: 2,
//                       maximumFractionDigits: 2,
//                     }).format(val)
//                   }
//                   labelTransitionProps={{
//                     transition: 'skew-down',
//                     duration: 150,
//                     timingFunction: 'linear',
//                   }}
//                 />

//               </Grid.Col>
//             ))}
//           </Grid>
//         </Tabs.Panel>

//       </Tabs>
//     </Container>
//   );
// }

import { Container, Grid, Select, Tabs, Text, Divider, NumberFormatter } from '@mantine/core';
import { IconLetterCase, IconMathXDivideY2 } from '@tabler/icons-react';
import { theme, defaultShade } from '@/theme';

type FilterValues = { [key: string]: string | number | [number, number] | undefined };

interface StockFilterProps {
  data: Record<string, any>[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
}

export function StockFilter({ data, values, onChange }: StockFilterProps) {
  const handleChange = (field: string, value: string | number | [number, number] | null) => {
    onChange({ ...values, [field]: value ?? undefined });
  };

  const qualitativeFields = data.length
    ? Object.keys(data[0]).filter((key) => typeof data[0][key] === 'string')
    : [];

  const quantitativeFields = data.length
    ? Object.keys(data[0]).filter((key) => typeof data[0][key] === 'number')
    : [];

  const uniqueQualValues: { [key: string]: string[] } = {};
  qualitativeFields.forEach((key) => {
    uniqueQualValues[key] = Array.from(
      new Set(data.map((item) => item[key]).filter(Boolean))
    );
  });

  const quantitativeStats: { [key: string]: { min: number; max: number } } = {};
  quantitativeFields.forEach((key) => {
    const valuesArray = data
      .map((item) => item[key])
      .filter((v): v is number => typeof v === 'number');
    if (valuesArray.length === 0) return;
    quantitativeStats[key] = {
      min: Math.min(...valuesArray),
      max: Math.max(...valuesArray),
    };
  });

  const brandColor = theme.colors?.brand?.[defaultShade];

  return (
    <Container fluid h="100%" w="100%" p="md">
      <Tabs defaultValue="Qualitative" variant="pills" color={brandColor}>
        <Tabs.List>
          <Tabs.Tab value="Qualitative" leftSection={<IconLetterCase size={16} />}>
            Qualitative
          </Tabs.Tab>
          <Tabs.Tab value="Quantitative" leftSection={<IconMathXDivideY2 size={16} />}>
            Quantitative
          </Tabs.Tab>
        </Tabs.List>

        <Divider />

        {/* Qualitative Filters */}
        <Tabs.Panel value="Qualitative" pt="md">
          <Grid grow gutter="lg">
            {qualitativeFields.map((key) => (
              <Grid.Col span="auto" key={key}>
                <Select
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  placeholder={`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  data={uniqueQualValues[key]}
                  value={typeof values[key] === 'string' ? values[key] : undefined}
                  onChange={(v) => handleChange(key, v)}
                  clearable
                  searchable
                  nothingFoundMessage="Nothing found..."
                />
              </Grid.Col>
            ))}
          </Grid>
        </Tabs.Panel>

        {/* Quantitative Filters */}
        <Tabs.Panel value="Quantitative" pt="lg">
          <Grid justify="space-between" grow gutter="xl">
            {quantitativeFields.map((key) => {
              const { min, max } = quantitativeStats[key];
              const valuesArray = data
                .map((item) => item[key])
                .filter((v): v is number => typeof v === 'number');

              if (valuesArray.length === 0) return null;

              // Standard deviation
              const mean = valuesArray.reduce((a, b) => a + b, 0) / valuesArray.length;
              const std = Math.sqrt(valuesArray.reduce((acc, v) => acc + (v - mean) ** 2, 0) / valuesArray.length);

              // Dynamic step size rounded to nearest order of magnitude
              const magnitude = Math.pow(10, Math.floor(Math.log10(std)));
              const step = Math.ceil(std / magnitude) * magnitude;


              // Generate options starting from step to max
              const options: { value: string; label: string }[] = [];
let current = step;

while (current <= max) {
  const formatted = current.toLocaleString('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  options.push({
    value: current.toString(),          // numeric logic stays intact
    label: `> ${formatted}`,            // or `Greater than ${formatted}`
  });

  current += step;
}

              return (
                <Grid.Col span={4} key={key}>
                  <Text size="sm">{key.charAt(0).toUpperCase() + key.slice(1)}</Text>

                  <Select
                    placeholder={`Greater than...`}
                    data={options}
                    value={typeof values[key] === 'number' ? values[key].toFixed(2) : undefined}
                    onChange={(v) => handleChange(key, v ? Number(v) : null)}
                    clearable
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
