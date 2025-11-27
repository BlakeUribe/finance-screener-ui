import { useState, useRef } from 'react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import classes from '../components/Tabs.module.css';
import { Card, Group, Text, Badge, Container, Stack } from '@mantine/core';
export default function UserPage() {
  const [value, setValue] = useState<string | null>('1');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controlsRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setControlRef = (val: string) => (node: HTMLButtonElement | null) => {
    controlsRefs.current[val] = node; // update mutable ref, no state change
  };

  return (
    <>
<Container>
      <Card mb="xl" p="lg">
        <Group mb="sm">
          <Text fw={600}>John Doe</Text>
          <Badge color="blue">Standard Member</Badge>
        </Group>

        <Stack >
          <Text>Email: john.doe@example.com</Text>
          <Text>Location: Seattle, WA</Text>
          <Text>Join Date: Jan 1, 2023</Text>
        </Stack>
      </Card>
    <Tabs variant="none" value={value} onChange={setValue}>
      <Tabs.List ref={rootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          First tab
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          Settings tab
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs.current[value] : null}
          parent={rootRef.current}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">First tab content</Tabs.Panel>
      <Tabs.Panel value="2">Second tab content</Tabs.Panel>
      <Tabs.Panel value="3">Third tab content</Tabs.Panel>
    </Tabs>
    </Container>
    </>
  );
}
