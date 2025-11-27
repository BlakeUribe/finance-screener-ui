import React, { memo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';

import { theme, defaultShade } from "@/theme";

const brandColors = theme.colors?.brand || ["#1509f1"];

interface PortfolioPoint {
  portfolio_std: number;
  portfolio_ret: number;
  [key: string]: any;
}

interface RiskReturnChartProps {
  distinct: PortfolioPoint[];
  frontier: PortfolioPoint[];
  distinctColor?: string;
  frontierColor?: string;
}

export const RiskReturnChart: React.FC<RiskReturnChartProps> = memo(
  ({
    distinct,
    frontier,
    distinctColor = brandColors[defaultShade - 4] ?? brandColors[1],
    frontierColor = brandColors[defaultShade]
  }) => {

    const allPoints = [...distinct, ...frontier];
    const stds = allPoints.map(p => p.portfolio_std);
    const rets = allPoints.map(p => p.portfolio_ret);

    const stdMin = Math.min(...stds);
    const stdMax = Math.max(...stds);
    const retMin = Math.min(...rets);
    const retMax = Math.max(...rets);

    const stdPadding = (stdMax - stdMin) * 0.3;
    const retPadding = (retMax - retMin) * 0.3;

    const sharpeRatio = 1.29
    const riskFreeRate = 0.041

    return (
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="portfolio_std"
            label={{ value: "Risk (Std Dev)", position: "insideBottom", offset: -20 }}
            padding={{ left: 20, right: 20 }}
            // domain={[(stdMin - stdPadding), (stdMax + stdPadding) ]}
            domain={[0, (stdMax + stdPadding)]}

            tickFormatter={(val) => `${Math.round(val * 100)}%`} // convert to percent and round
          // tickCount={Math.ceil((stdMax - stdMin)/ 2)} // approximate ticks every 5%
          />

          <YAxis
            type="number"
            dataKey="portfolio_ret"
            label={{ value: "Return", angle: -90, position: "insideLeft", offset: -10 }}
            padding={{ top: 20, bottom: 20 }}
            domain={[retMin - retPadding, retMax + retPadding]}
            tickFormatter={(val) => `${Math.round(val * 100)}%`} // convert to percent and round
          // tickCount={Math.ceil(retMin)} // approximate ticks every 5%
          />

          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value: number) => `${Math.round(value * 100)}%`}
          />

          <Legend align="right" wrapperStyle={{ fontSize: 12, lineHeight: '16px' }} />

          <Scatter
            name="Distinct Portfolios"
            data={distinct}
            fill={distinctColor}
            isAnimationActive={false}
          />

          <Scatter
            name="Frontier Portfolios"
            data={frontier}
            fill={frontierColor}
            isAnimationActive={false}
          />


          <ReferenceLine
            stroke={brandColors[defaultShade]}
            strokeWidth={2}
            segment={[
              { x: 0.0, y: riskFreeRate }, // need to fetch risk free rate
              { x: ((retMax - riskFreeRate) / sharpeRatio), y: retMax } // this will basically be a math function
              // retMax varible here would dictate how far the line would

            ]}
          />
          <ReferenceDot
            x={0.19}      // std
            y={0.29}      // return, can fetch both from api
            r={4}        // radius
            fill="red"
          />

          <ReferenceLine y={0} strokeWidth={2} />

        </ScatterChart>
      </ResponsiveContainer>
    );
  }
);
