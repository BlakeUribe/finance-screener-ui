
// Check out useScrollSpy

import { useRef } from 'react';
import { Text, Container, Card, Grid, Title, Timeline, Stack } from '@mantine/core';
import { IconTable } from '@tabler/icons-react';

export default function PortfolioPage() {
  // Create refs for each section
  const screeningRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
  return (
    <Container fluid>
      <Grid>
        {/* Timeline Column */}
        <Grid.Col span={2}>
          <Card p="xl">
            <Timeline active={2} lineWidth={3} bulletSize={18}>
              <Timeline.Item
                bullet={<IconTable />}
                title="Stock Screening"
                style={{ cursor: 'pointer' }}
                onClick={() => scrollTo(screeningRef)}
              />

              <Timeline.Item
                title="Select Optimize Model"
                style={{ cursor: 'pointer' }}
                onClick={() => scrollTo(modelRef)}
              />

              <Timeline.Item
                title="FAQs / Portfolio Results"
                style={{ cursor: 'pointer' }}
                onClick={() => scrollTo(faqRef)}
              />
            </Timeline>
          </Card>
        </Grid.Col>

        {/* Content Column */}
        <Grid.Col span={10}>
          <Stack >
            <div ref={screeningRef}>
              <Card p="xl">
                <Title order={1} mb="md">
                  Quick Overview
                </Title>
                <Text size="lg" fw={500} mb="lg">
                  Users begin by screening stocks based on criteria such as high profit margins or risk-adjusted metrics like PE ratios. Once users select their desired stocks, they can choose an ideal model to optimize portfolio weights.  

                  Currently, we use Monte Carlo simulation, which runs multiple simulations of portfolio weights, backtests them over a selected period, and repeats the process for a specified number of iterations.  

                  The result provides the most optimal portfolio based on Sharpe ratio, helping users make data-driven investment decisions.
                </Text>
                
              </Card>
            </div>

            <div ref={modelRef}>
              <Card p="xl">
                <Title order={1} mb="md">
                  Model Selection
                </Title>
                <Text size="lg" fw={500} mb="lg">
                  Users can select an ideal model to optimize portfolio weights. Monte Carlo simulations run multiple iterations, backtesting the portfolio over a specified period.  

                  This provides the most optimal portfolio weights based on Sharpe ratio.
                </Text>
              </Card>
            </div>

            <div ref={faqRef}>
              <Card p="xl">
                <Title order={1} mb="md">
                  FAQs / Portfolio Results
                </Title>
                <Text>
                  Users can view detailed portfolio results and answers to frequently asked questions.
                </Text>
              </Card>
            </div>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
