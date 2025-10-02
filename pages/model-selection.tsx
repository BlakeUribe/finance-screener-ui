import { Grid, Card, Image, Text, Button, Group, HoverCard } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';

const models = [
  {
    name: 'CAPM',
    description: 'CAPM explained, and how I have it set up.',
    infoText: 'This text could explain how the model is set up, or link to code.',
  },
  {
    name: 'Treynor-Black',
    description: 'Treynor-Black explained, and how I have it set up.',
    infoText: 'This text could explain how the model is set up, or link to code.',
  },
  {
    name: 'Model 3',
    description: 'Description for Card 3',
    infoText: 'This text could explain how the model is set up, or link to code.',
  },
  {
    name: 'Model 4',
    description: 'Description for Card 4',
    infoText: 'This text could explain how the model is set up, or link to code.',
  },
];

export default function ModelSelectionPage() {
  return (
    <Grid gutter="lg">
      <Grid.Col span={12}>
        <Text>
          You have chosen n stocks [Then name the stocks]. Please choose your ideal optimization model
        </Text>
      </Grid.Col>

      {models.map((model, idx) => (
        <Grid.Col key={idx} span={6}> {/* 2 columns per row */}
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
                  <Text size="sm" mt="md">{model.infoText}</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>

            <Text size="sm" c="dimmed">{model.description}</Text>

            <Button component='a' href='\optimization' color="blue" fullWidth mt="md" radius="md">
              Use this model
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
