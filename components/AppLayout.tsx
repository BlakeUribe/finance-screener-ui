'use client';

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
  Box,
  Stack,
  Flex
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
  IconRainbow,
  IconHexagon3d, //IconDeviceAnalytics also cool design
  IconUserHexagon,
  IconSettings,
  IconBell
} from '@tabler/icons-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Define links with potential nested children
const links = [
  { label: 'Home', href: '/', icon: <IconHomeFilled size={16} /> },
  { label: 'Portfolio', href: '/portfolio', icon: <IconChartDots2 size={16} /> },
  { label: 'Stock Screener', href: '/stock-screener', icon: <IconTable size={16} /> },
  { label: 'Brand Theme', href: '/color-page', icon: <IconRainbow size={16} /> },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // Recursive function to render NavLinks including nested children
  const renderNavLink = (link: any) => {
    if (link.children) {
      return (
        <NavLink
          key={link.label}
          label={link.label}
          leftSection={link.icon}
          childrenOffset={28}
          variant="subtle"
        >
          {link.children.map((child: any) => renderNavLink(child))}
        </NavLink>
      );
    }

    return (
      <NavLink
        key={link.href}
        component={Link}
        href={link.href}
        label={link.label}
        leftSection={link.icon}
        active={pathname === link.href}
        variant={pathname === link.href ? "filled" : "subtle"}
        style={(theme) => ({
          borderRadius: theme.radius.md,
        })}
      />
    );
  };

  return (
    <AppShell
      // padding="lg"
      header={{ height: 60 }}
      navbar={{
        width: 175,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}

    >
      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Flex align="center" gap="md">
            {mounted && (
              <>
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="xs" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="xs" size="sm" />
              </>
            )}

            <Flex align="center" gap="sm">
              <IconHexagon3d size={38} />
              <Title order={1}>OptimizerLab</Title>
            </Flex>
          </Flex>

          <Group>
            <IconBell>

            </IconBell>

            {mounted && (
              <ActionIcon
                onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                aria-label="Toggle color scheme"
              >
                {colorScheme === 'light' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
              </ActionIcon>
            )}


          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar */}
      <AppShell.Navbar>
        <AppShell.Section grow my="md" component={ScrollArea} px="md">
          {links.map((link) => renderNavLink(link))}
        </AppShell.Section>

        <AppShell.Section my="md" px="md">
          <Stack gap={8}>

            <NavLink
              label="Settings"
              leftSection={<IconSettings size={18} />}
              component={Link}
              href="/settings"
              variant="subtle"
              style={(theme) => ({
                borderRadius: theme.radius.md,
              })}
            />
            <NavLink
              label="John Doe"
              leftSection={<IconUserHexagon size={18} />}
              component={Link}
              href="/user"
              variant="subtle"
              style={(theme) => ({
                borderRadius: theme.radius.md,
              })}
            />


          </Stack>
        </AppShell.Section>


      </AppShell.Navbar>

      {/* Main content */}
      <AppShell.Main>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
