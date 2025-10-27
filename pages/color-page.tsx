// pages/color-page.tsx
import {
  Stack,
  Title,
  Text,
  Group,
  Box,
  Button,
  Badge,
  Alert,
  useMantineTheme,
  Card,
  Table,
  TableData
} from "@mantine/core";
import { IconAlertCircle, IconCheck, IconInfoCircle } from "@tabler/icons-react";

const tableData: TableData = {
  caption: 'Some elements from periodic table',
  head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
  body: [
    [6, 12.011, 'C', 'Carbon'],
    [7, 14.007, 'N', 'Nitrogen'],
    [39, 88.906, 'Y', 'Yttrium'],
    [56, 137.33, 'Ba', 'Barium'],
    [58, 140.12, 'Ce', 'Cerium'],
  ],
};


export default function ColorPage() {
  const theme = useMantineTheme();
  const palettes = ["brand", "secondary", "danger", "warning", "success", "dark", "light"] as const;

  return (
    <Stack gap="xl" p="xl">
      <Title order={1}>Color Page Preview</Title>
      <Text>Check that all Buttons, Badges, Alerts, Card, and Table follow your global theme styles.</Text>

      {palettes.map((name) => (
        <Stack key={name} gap="sm">
          <Text fw={700}>{name} palette</Text>

          {/* Swatches */}
          <Group>
            {theme.colors[name].map((shade, i) => (
              <Box
                key={i}
                w={60}
                h={60}

                style={{
                  backgroundColor: shade,
                  borderRadius: "0.5rem",
                  // border: `2px solid rgba(0,0,0,0.15)`,
                  transition: "all 0.2s ease",
                }}
              >
                <Text>{i}</Text>
              </Box>
            ))}
          </Group>

          {/* Components */}
          <Group>
            <Button color={name}>Button</Button>
            <Badge color={name}>Badge</Badge>
            <Alert
              color={name}
              title={`${name} alert`}
              icon={
                name === "success"
                  ? <IconCheck size={16} />
                  : <IconAlertCircle size={16} />
              }
              w={260}
            >
              This is a {name} alert.
            </Alert>
          </Group>
        </Stack>
      ))}

      {/* Card Preview */}
      <Stack gap="sm" mt="xl">
        <Text fw={700}>Card Preview</Text>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text>This is a sample Card. It uses the global theme's border and shadow.</Text>
          <Button mt="sm" color="brand">Card Button</Button>
        </Card>
      </Stack>

      {/* Table Preview */}
      <Stack gap="sm" mt="xl">
        <Text fw={700}>Table Preview</Text>
        <Table withTableBorder highlightOnHover data={tableData}>
        </Table>
      </Stack>

      <Stack gap="sm" mt="xl">
        <Text fw={700}>Table in Card Preview</Text>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Table withTableBorder highlightOnHover data={tableData}>
          </Table>
        </Card>
      </Stack>

    </Stack>
  );
}
