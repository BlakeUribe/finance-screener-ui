"use client";
import React from "react";

import { Card, Text, Group, LoadingOverlay } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { ReactNode } from "react";

import { theme, defaultShade } from "@/theme";

const brandColor = theme.colors?.brand?.[defaultShade] ?? '#1f3eff';

interface PerformanceCardProps {
  title: string;
  value: number | string | null;
  lastUpdated?: string;
  isUp?: boolean;                // true = up, false = down, undefined = neutral
  change?: number | null;
  icon?: React.ReactElement<{ color?: string }>; // only allow elements that can accept color
  iconColor?: string | null;            // optional override for icon color
}

export function PerformanceCard({
  title,
  value,
  lastUpdated = "Just now",
  isUp,
  change = null,
  icon,
  iconColor = brandColor,
}: PerformanceCardProps) {
  // Fixed colors
  const upColor = "green";
  const downColor = "red";

  // Determine icon color: user-provided takes priority
  const colorToUse = iconColor || (isUp === true ? upColor : isUp === false ? downColor : undefined);

  // Determine which icon to show
  const displayIcon =
    icon ? (
      React.cloneElement(icon, { color: iconColor || (isUp === true ? "green" : isUp === false ? "red" : undefined) })
    ) : isUp === true ? (
      <IconTrendingUp color="green" size={20} />
    ) : isUp === false ? (
      <IconTrendingDown color="red" size={20} />
    ) : null;

  // Format change text if provided
  const changeText =
    change !== null ? (
      <Text size="sm" c={isUp === true ? upColor : isUp === false ? downColor : undefined}>
        {isUp === true ? "+" : isUp === false ? "-" : ""}
        {Math.abs(change)}%
      </Text>
    ) : null;

  return (
    <Card shadow="sm" radius="lg" p="md" withBorder>
      {value === null && <LoadingOverlay visible />}

      <Group justify="space-between" align="center">
        <Text size="sm">{title}</Text>
        {displayIcon}
      </Group>

      <Text fw={700} fz="lg">
        {typeof value === "number" ? value.toFixed(2) : value}
      </Text>

      {changeText}

      <Text size="xs" mt="xs">
        Last updated: {lastUpdated}
      </Text>
    </Card>
  );
}
