import { Text, Box } from '@mantine/core';

export default function OptimizationPage() {
  return (
    <Box>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        mb="md"
      >
        Possibly this would then trigger a lambda function,
        or could use SageMaker to run the model?
      </Text>
    </Box>
  );
}
