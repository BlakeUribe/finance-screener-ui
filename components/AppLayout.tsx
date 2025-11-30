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
  Flex,
  useComputedColorScheme
} from '@mantine/core';

import {
  IconHomeFilled,
  IconChartDots2,
  IconTable,
  IconSun,
  IconMoon,
  IconRainbow,
  IconHexagon3d,
  IconUserHexagon,
  IconSettings,
  IconBell
} from '@tabler/icons-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cx from 'clsx';
import classes from './Demo.module.css';


interface AppLayoutProps {
  children: React.ReactNode;
}

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

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  // Close sidebar by default on home page
  useEffect(() => {
    if (pathname === "/") {
      if (desktopOpened) toggleDesktop();
      if (mobileOpened) toggleMobile();
    }
  }, [pathname]);

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
        variant={pathname === link.href ? 'filled' : 'subtle'}
        style={(theme) => ({ borderRadius: theme.radius.md })}
      />
    );
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 175,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
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
            <IconBell />
            <ActionIcon
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

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
              active={pathname === '/settings'}
              variant={pathname === '/settings' ? 'filled' : 'subtle'}
              style={(theme) => ({
                borderRadius: theme.radius.md,
              })}
            />
            <NavLink
              label="John Doe"
              leftSection={<IconUserHexagon size={18} />}
              component={Link}
              href="/user"
              active={pathname === '/user'}
              variant={pathname === '/user' ? 'filled' : 'subtle'}
              style={(theme) => ({
                borderRadius: theme.radius.md,
              })}
            />
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
