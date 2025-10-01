'use client'; // ensure this is a client component for Mantine hooks

import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  AppShell,
  Burger,
  Group,
  Title,
  NavLink,
  ScrollArea,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';

import {
  IconHomeFilled,
  IconChartDots2,
  IconTable,
  IconFolderPlus,
  IconSun,
  IconMoon,
  IconCurrencyDollar,
  IconCoinBitcoin,
} from '@tabler/icons-react';

import Link from 'next/link';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="lg"
      header={{ height: 60 }}
      navbar={{
        width: 175,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          {/* Left side items */}
          <Group>
            {mounted && (
              <>
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
              </>
            )}
            <Title order={1}>My Finance Screener</Title>
          </Group>

          {/* Right side items */}
          <Group>
            {mounted && (
              <ActionIcon
                onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                aria-label="Toggle color scheme"
              >
                {colorScheme === 'light' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
              </ActionIcon>
            )}

            <ActionIcon component={Link} href="/user">
              BU
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section grow my="md" component={ScrollArea} px="md">
          <NavLink component={Link} href="/" label="Home" leftSection={<IconHomeFilled size={16} stroke={1.5} />} />
          <NavLink component={Link} href="/portfolio" label="My Portfolio" leftSection={<IconChartDots2 size={16} stroke={1.5} />} />
          <NavLink label="Screeners" leftSection={<IconTable size={16} stroke={1.5} />} childrenOffset={28}>
            <NavLink component={Link} href="/stock-screener" label="Stock Screener" leftSection={<IconCurrencyDollar size={16} stroke={1.5} />} />
            <NavLink component={Link} href="/crypto-screener" label="Crypto Screener" leftSection={<IconCoinBitcoin size={16} stroke={1.5} />} />
          </NavLink>
          <NavLink href="https://www.example.com/" label="Place Holder" leftSection={<IconFolderPlus size={16} stroke={1.5} />} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
