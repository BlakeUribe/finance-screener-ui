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
  TableData,
  useMantineColorScheme
} from "@mantine/core";

import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { defaultShade } from "@/theme";

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
    const { colorScheme } = useMantineColorScheme(); // <-- get current theme

  return (
    <Stack gap="xl" p="xl">
      <Title order={1}>Color Page Preview</Title>
      <Text>Check that all Buttons, Badges, Alerts, Card, and Table follow your global theme styles.</Text>
      <Text>Current theme: <b>{colorScheme}</b></Text> {/* <-- show theme */}
      <Text> Default Shade: <b>{defaultShade}</b></Text> {/* <-- show theme */}

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
                <Text>{i+1}</Text>
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

        <Card withBorder>

          <Text>This is a sample Card. It uses the our theme's border and shadow.</Text>
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
        <Card withBorder>
          <Table withTableBorder highlightOnHover data={tableData}>
          </Table>
        </Card>
      </Stack>

      <Stack>
        <Button>
          Defualt
        </Button>
        <Button variant="outline">
          Outline "outline"
        </Button>
        <Button variant="filledAlt">
          White Background w Brand colors "filledAlt"
        </Button>
        <Button variant="alt">
          Transpart Background w white text "alt"
        </Button>

      </Stack>

    </Stack>
  );
}
