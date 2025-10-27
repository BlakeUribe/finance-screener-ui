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
  {
    label: 'Screeners',
    icon: <IconTable size={16} />,
    children: [
      { label: 'Stock Screener', href: '/stock-screener', icon: <IconCurrencyDollar size={16} /> },
      { label: 'Crypto Screener', href: '/crypto-screener', icon: <IconCoinBitcoin size={16} /> },
    ],
  },
  { label: 'Colors', href: '/color-page', icon: <IconRainbow size={16} /> },
  { label: 'Place Holder', href: '/placeholder', icon: <IconFolderPlus size={16} /> },
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
          <Group>
            {mounted && (
              <>
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
              </>
            )}
            <Title order={1}>My Finance Screener</Title>
          </Group>

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

      {/* Navbar */}
      <AppShell.Navbar>
        <AppShell.Section grow my="md" component={ScrollArea} px="md">
          {links.map((link) => renderNavLink(link))}
        </AppShell.Section>
      </AppShell.Navbar>

      {/* Main content */}
      <AppShell.Main>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}
