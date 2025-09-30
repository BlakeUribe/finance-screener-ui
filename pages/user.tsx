import { Text, Box } from '@mantine/core';

export default function UserPage() {
  return (
    <Box>
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        mb="md"
      >
        This will display user information
      </Text>
    </Box>
  );
}
