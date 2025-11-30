import { useState } from 'react';
import { Container, Card, Group, Text, Badge, Stack, Tabs, Divider } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { theme, defaultShade } from '@/theme';


export default function UserPage() {
  const [value, setValue] = useState<string | null>('gallery');

  const brandColor = theme.colors?.brand?.[defaultShade];

  const userTabs = [
    { value: 'gallery', label: 'Gallery', icon: <IconPhoto size={12} />, content: 'Gallery tab content' },
    { value: 'messages', label: 'Messages', icon: <IconMessageCircle size={12} />, content: 'Messages tab content' },
    { value: 'settings', label: 'Settings', icon: <IconSettings size={12} />, content: 'Settings tab content' },
  ];

  return (
    <Container p="xl">
      <Card mb="xl" p="lg">
        <Group mb="sm">
          <Text fw={600}>John Doe</Text>
          <Badge color="blue">Standard Member</Badge>
        </Group>

        <Stack>
          <Text>Email: john.doe@example.com</Text>
          <Text>Location: Seattle, WA</Text>
          <Text>Join Date: Jan 1, 2023</Text>
        </Stack>
      </Card>

      <Tabs
        variant="pills"
        color={brandColor}
        autoContrast={true}
        value={value}
        onChange={setValue} radius="md"
      >
        <Tabs.List>
          {userTabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value} leftSection={tab.icon}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Divider />
        {userTabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            {tab.content}
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
}
