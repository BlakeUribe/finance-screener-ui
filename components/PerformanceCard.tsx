"use client";

import { Card, Text, Group, LoadingOverlay } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface PerformanceCardProps {
  title: string;
  value: number | string | null;
  lastUpdated?: string;
  isUp?: boolean;
  change?: number | null;
  colorUp?: string;
  colorDown?: string;
}

export function PerformanceCard({
  title,
  value,
  lastUpdated = "Just now",
  isUp = true,
  change = null,
  colorUp = "green",
  colorDown = "red",
}: PerformanceCardProps) {
  const icon = isUp ? (
    <IconTrendingUp color={colorUp} size={20} />
  ) : (
    <IconTrendingDown color={colorDown} size={20} />
  );

  const changeText =
    change !== null ? (
      <Text size="sm" c={isUp ? colorUp : colorDown}>
        {isUp ? "+" : "-"}
        {Math.abs(change)}%
      </Text>
    ) : null;

  return (
    <Card shadow="sm" radius="lg" p="md" withBorder>
            {value === null ? <LoadingOverlay visible /> : null}

      <Group justify="space-between" align="center">
        <Text size="sm" >
          {title}
        </Text>
        {icon}
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

