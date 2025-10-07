import { useEffect, useState } from 'react';
import { Text, Box, Code, ScrollArea, Alert } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

export default function OptimizationPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('optimizationResult');
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error parsing optimizationResult:', error);
    }
  }, []);

  if (!data) {
    return (
      <Alert
        icon={<IconAlertTriangle size={16} />}
        title="No Optimization Data Found"
        color="red"
      >
        Please go back and select a model from the previous page.
      </Alert>
    );
  }

  return (
    <Box p="md">
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        mb="md"
      >
        Optimization Results
      </Text>

      <ScrollArea h={500} offsetScrollbars>
        <Code block>
          {JSON.stringify(data, null, 2)}
        </Code>
      </ScrollArea>

      <Text mt="lg" size="md" c="dimmed">
        This output is the raw JSON returned by your Lambda (the `event` object).  
        You can now extract and use specific fields for your visualization or analysis.
      </Text>
    </Box>
  );
}
