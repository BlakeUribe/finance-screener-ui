import { useState } from 'react';
import { Grid, Card, Text, Button, Group, HoverCard, Loader, Pill, Collapse, Badge, Title, Stack, LoadingOverlay, Container, ActionIcon, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

import { IconInfoCircleFilled, IconActivity, IconChevronDown, IconChevronUp, } from '@tabler/icons-react';
import { useSelectedStocks, } from '@/hooks/useSelectedStocks';
import { theme, defaultShade } from '@/theme';
import { useDisclosure } from '@mantine/hooks';

const brandColor = theme.colors?.brand

const models = [
  {
    id: 'monteCarlo', // stable identifier for backend
    name: 'Monte Carlo Sim', // display name for UI
    description: 'Sim explained, and how I have it set up.',
    infoText: 'This text could explain how the model is set up, or link to code.',
    modelIcon: <IconActivity />,
    modelTags: ['Fast', 'Flexible', 'Simulation'],
  },
  {
    id: 'capm',
    name: 'CAPM',
    description: 'CAPM explained, and how I have it set up.',
    infoText: 'This text could explain how the model is set up, or link to code.',
    modelIcon: <IconActivity />,
    modelTags: ['Fast', 'Beta', 'Simulation'],
  },
  {
    id: 'treynorBlack',
    name: 'Treynor-Black',
    description: 'Treynor-Black explained, and how I have it set up.',
    infoText: 'This text could explain how the model is set up, or link to code.',
    modelIcon: <IconActivity />,
    modelTags: ['Alpha', 'Beta', 'Simulation'],
  },
  {
    id: 'model3',
    name: 'Model 3',
    description: 'Description for Card 3',
    infoText: 'This text could explain how the model is set up, or link to code.',
    modelIcon: <IconActivity />,
    modelTags: ['Tag 1', 'Tag 2', 'Tag 3'],
  },
  {
    id: 'model4',
    name: 'Model 4',
    description: 'Description for Card 4',
    infoText: 'This text could explain how the model is set up, or link to code.',
    modelIcon: <IconActivity />,
    modelTags: ['Tag 1', 'Tag 2', 'Tag 3'],
  },
];


export default function ModelSelectionPage() {
  const { selectedTickers } = useSelectedStocks();
  const [loading, setLoading] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [opened, { toggle }] = useDisclosure(false);
  const [valueStartDate, setValueStartDate] = useState<string | null>(null);
  const [valueEndDate, setValueEndDate] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);

  const handleModelClick = async (modelId: string) => {
    if (selectedTickers.length === 0) return;

    setLoading(true);
    const tickers = selectedTickers.map((s) => s.Tickers);
    console.log('Sending selected stocks:', tickers, 'with model:', modelId);

    const result = await sendSelectedStocks(tickers, modelId, valueStartDate, valueEndDate, period);

    setLoading(false);

    if (result) {
      localStorage.setItem('optimizationResult', JSON.stringify(result));
      window.location.href = '/optimization';
    }
  };

  async function sendSelectedStocks(
    selectedTickers: string[],
    modelId: string,
    valueStartDate: string | null,
    valueEndDate: string | null,
    period: string | null
  ) {
    try {
      const res = await fetch('https://5duwzxh8wa.execute-api.us-west-2.amazonaws.com/prod/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tickers: selectedTickers,
          model: modelId,
          startDate: valueStartDate,
          endDate: valueEndDate,
          period: period
        })
      });

      // Always read the body
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text; // fallback if not JSON
      }

      if (!res.ok) {
        // Log server-side error
        throw new Error(`Possible Server Side Error: ${res.status} ${res.statusText}`);
      }

      return data;

    } catch (error) {
      console.error('Error in sendSelectedStocks:', error);
      return null;
    }
  }

  return (
    <Container fluid>

      {/* Full-screen overlay */}
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", blur: 2 }}
        zIndex={1000}
      />

      <Grid columns={24}>
        {/* Left Column: Selected Stocks */}
        <Grid.Col span={6}>
          <Card padding="lg">
            <Title order={2} mb="md">
              Selected Stocks
            </Title>

            <Stack>
              {selectedTickers.map((stock, idx) => (
                <Card key={idx} padding="sm" >
                  <Text fw={500}>{stock.Tickers}</Text>
                  <Text>Company Name</Text>
                  <Text>Price</Text>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Right Column: Models */}
        <Grid.Col span={18}>
          <Card padding="lg">
            <Title order={2} mb="md">
              Optimization Models
            </Title>

            {models.map((model) => (
              <Card
                key={model.id}
                padding="lg"
                withBorder
                mb="md"
                onClick={() => setSelectedModelId(model.id)}
                style={{
                  borderColor: selectedModelId === model.id ? "blue" : undefined,
                  borderWidth: selectedModelId === model.id ? 2 : 1,
                }}
              >
                {/* Top Row: Name and Hover Info */}
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>
                    {model.modelIcon} {model.name}
                  </Text>

                  <HoverCard openDelay={200} closeDelay={400}>
                    <HoverCard.Target>
                      <IconInfoCircleFilled size={24} />
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Text size="sm" mt="md">
                        {model.infoText}
                      </Text>
                    </HoverCard.Dropdown>
                  </HoverCard>
                </Group>

                {/* Description */}
                <Text size="sm">{model.description}</Text>

                {/* Badges */}
                {model.modelTags && model.modelTags.length > 0 && (
                  <Group mt="sm">
                    {model.modelTags.map((tag, idx) => (
                      <Badge key={idx} color="blue" variant="light">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                )}
              </Card>
            ))}

            {/* Setting Card */}
            <Card padding="lg" shadow="sm">
              <Group align="center" mb="sm">
                <Text fw={500}>
                  Advanced Settings <Pill>Optional</Pill>
                </Text>

                <ActionIcon onClick={toggle} variant="transparent" size="lg" aria-label="Settings">
                  {opened ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
                </ActionIcon>
              </Group>

              <Collapse in={opened}>
                <Stack mt="md">
                  <Text size="sm">Config Settings</Text>

                  <DatePickerInput
                    label="Pick a Start Date"
                    placeholder="Pick Start Date"
                    value={valueStartDate}
                    onChange={setValueStartDate}
                  />

                  <DatePickerInput
                    label="Pick an End Date"
                    placeholder="Pick End Date"
                    value={valueEndDate}
                    onChange={setValueEndDate}
                  />
                  <Select
                    label="Select Period"
                    description="Period defines the data frequency"
                    data={["5d", "1wk", "1mo", "3mo"]}
                    searchable
                    clearable
                    value={period}
                    onChange={setPeriod}
                  />


                </Stack>
              </Collapse>
            </Card>


            {/* Conditional Button at the bottom of the parent card */}
            {selectedModelId && (
              <Button mt="md" onClick={() => handleModelClick(selectedModelId)}>
                {loading ? <Loader size="sm" /> : "Use this model"}
              </Button>
            )}

          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
