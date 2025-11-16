"use client";
import React from "react";

import { Card, Text, Group, LoadingOverlay } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

import { theme, defaultShade } from "@/theme";

const brandColor = theme.colors?.brand?.[defaultShade] ?? "#1f3eff";

interface PerformanceCardProps {
  title: string;
  value: number | string | null | React.ReactNode;
  lastUpdated?: string | null; // optional, default null
  isUp?: boolean;
  change?: number | null;
  icon?: React.ReactElement<{ color?: string }>;
  iconColor?: string | null;
}

export function PerformanceCard({
  title,
  value,
  lastUpdated = null,
  isUp,
  change = null,
  icon,
  iconColor = brandColor,
}: PerformanceCardProps) {
  const upColor = "green";
  const downColor = "red";

  const colorToUse =
    iconColor || (isUp === true ? upColor : isUp === false ? downColor : undefined);

  const displayIcon =
    icon ? (
      React.cloneElement(icon, { color: colorToUse })
    ) : isUp === true ? (
      <IconTrendingUp color="green" size={20} />
    ) : isUp === false ? (
      <IconTrendingDown color="red" size={20} />
    ) : null;

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
        {typeof value === "number"
          ? new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(value)
          : value}
      </Text>

      {changeText}

      {lastUpdated && (
        <Text size="xs" mt="xs">
          Last updated: {lastUpdated}
        </Text>
      )}
    </Card>
  );
}
