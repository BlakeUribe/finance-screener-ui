import { useState } from 'react';
import { Grid, Card, Image, Text, Button, Group, HoverCard, Loader } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import { useSelectedStocks } from '@/hooks/useSelectedStocks';

const models = [
  { name: 'CAPM', description: 'CAPM explained, and how I have it set up.', infoText: 'This text could explain how the model is set up, or link to code.' },
  { name: 'Treynor-Black', description: 'Treynor-Black explained, and how I have it set up.', infoText: 'This text could explain how the model is set up, or link to code.' },
  { name: 'Model 3', description: 'Description for Card 3', infoText: 'This text could explain how the model is set up, or link to code.' },
  { name: 'Model 4', description: 'Description for Card 4', infoText: 'This text could explain how the model is set up, or link to code.' },
];

async function sendSelectedStocks(selectedTickers: string[]) {
  try {
    const res = await fetch('https://5lipli3g45.execute-api.us-west-2.amazonaws.com/prod/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tickers: selectedTickers }),
    });

    if (!res.ok) throw new Error(`Error sending tickers: ${res.statusText}`);

    const data = await res.json();

    // Handle case where API Gateway wraps JSON as string
    let parsedData;
    try {
      parsedData = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
    } catch {
      parsedData = data;
    }

    console.log('Full Lambda response:', data);
    console.log('Parsed response body:', parsedData);

    return parsedData;
  } catch (error) {
    console.error('Error in sendSelectedStocks:', error);
    return null;
  }
}

export default function ModelSelectionPage() {
  const { selectedTickers } = useSelectedStocks();
  const [loading, setLoading] = useState(false);

  const handleModelClick = async () => {
    if (selectedTickers.length === 0) return;

    setLoading(true);
    const tickers = selectedTickers.map((s) => s.Tickers);
    console.log('Sending selected stocks:', tickers);

    const result = await sendSelectedStocks(tickers);

    setLoading(false);

    if (result) {
      localStorage.setItem('optimizationResult', JSON.stringify(result));
      window.location.href = '/optimization';
    }
  };

  return (
    <Grid gutter="lg">
      <Grid.Col span={12}>
        <Text>
          You have chosen {selectedTickers.length} stock
          {selectedTickers.length !== 1 ? 's' : ''}: {selectedTickers.map((s) => s.Tickers).join(', ')}. 
          Please choose your ideal optimization model
        </Text>
      </Grid.Col>

      {models.map((model, idx) => (
        <Grid.Col key={idx} span={6}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image
                radius="md"
                src={null}
                h={200}
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{model.name}</Text>

              <HoverCard openDelay={200} closeDelay={400}>
                <HoverCard.Target>
                  <IconInfoCircleFilled size={24} color="blue" />
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm" mt="md">
                    {model.infoText}
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>

            <Text size="sm" c="dimmed">
              {model.description}
            </Text>

            <Button
              fullWidth
              mt="md"
              radius="md"
              color="blue"
              onClick={handleModelClick}
              disabled={loading}
            >
              {loading ? <Loader size="sm" color="white" /> : 'Use this model'}
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
