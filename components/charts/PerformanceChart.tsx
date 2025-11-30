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
import { Box } from '@mantine/core';

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
  unit?: string;
  toolTipName?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = memo(
  ({ data,
    dataKey,
    positiveColor = successColor,
    negativeColor = failureColor,
    unit,
    toolTipName
  }) => {
    const values = data.map(d => d[dataKey]);
    const yMin = Math.min(...values);
    const yMax = Math.max(...values);
    const zeroOffset = yMax === yMin ? 0.5 : yMax / (yMax - yMin);

    return (
      <Box style={{ width: '100%', height: 250, minHeight: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={zeroOffset} stopColor={positiveColor} stopOpacity={1} />
                <stop offset={zeroOffset} stopColor={negativeColor} stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="Date"
              tickFormatter={(dateStr) => {
                const date = new Date(dateStr);
                return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
              }}
              tick={{ fontSize: 10 }}
              allowDuplicatedCategory={false}
              interval="equidistantPreserveStart"

            />

            <YAxis
              unit={unit}
              domain={[yMin * 0.98, yMax * 1.02]}
              tickFormatter={(v) => Number(v.toFixed(2)).toLocaleString()}
              style={{ fontSize: 10 }}
              tickLine={false} // removes top tick marker
            />

            <Tooltip
              formatter={(value: number) =>
                unit ? `${value.toFixed(2)}${unit}` : value.toFixed(2)
              }
              isAnimationActive={false}
              
              contentStyle={{
                backgroundColor: '#1a1a1a', // background color
                border: '1px solid #555',   // border
                borderRadius: 6,             // rounded corners
                padding: '8px 12px',         // padding inside tooltip
                color: '#fff',               // text color
              }}

              itemStyle={{
                color: '#4caf50',            // color for the value/item
                fontSize: 12,                // font size for each row
              }}
            />

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={successColorShades[7]}
              fill="url(#splitColor)"
              isAnimationActive={false}
              name={toolTipName}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    );
  }
);
