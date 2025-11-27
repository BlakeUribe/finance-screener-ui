import React, { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { theme } from "@/theme";

const successColorShades = theme.colors?.success || [];
const failureColorShades = theme.colors?.danger || [];

const successColor = successColorShades[2] || "green";
const failureColor = failureColorShades[2] || "red";

interface PerformancePoint {
  Date: string | number | Date;
  Value: number;
  [key: string]: any;
}

interface PerformanceChartProps {
  data: PerformancePoint[];
  dataKey: string;
  positiveColor?: string;
  negativeColor?: string;
  unit?: string; // optional unit
}

export const PerformanceChart: React.FC<PerformanceChartProps> = memo(
  ({
    data,
    dataKey,
    positiveColor = successColor,
    negativeColor = failureColor,
    unit, // optional
  }) => {
    const values = data.map(d => d[dataKey]);
    const yMin = Math.min(...values, 0);
    const yMax = Math.max(...values, 0);

    const zeroOffset = yMax === yMin ? 0.5 : yMax / (yMax - yMin);

    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={zeroOffset} stopColor={positiveColor} stopOpacity={1} />
              <stop offset={zeroOffset} stopColor={negativeColor} stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Date"
            tickFormatter={(dateStr) => {
              const date = new Date(dateStr);
              return `${date.toLocaleString('default', { month: 'short' })}/${date.getFullYear()}`;
            }}
            tick={{ fontSize: 12 }}
            allowDuplicatedCategory={false}
            interval="preserveStartEnd"
          />
          <YAxis unit={unit} />
          <Tooltip
            formatter={(value: number) => unit ? `${value.toFixed(2)}${unit}` : value.toFixed(2)}
            isAnimationActive={false}
          />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={successColorShades[7]}
            fill="url(#splitColor)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
);
