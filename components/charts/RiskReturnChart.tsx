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

const successColorShades = theme.colors?.success || [];


const brandColors = theme.colors?.brand || ["#1509f1"];
const successColor = successColorShades[2] || "green";

interface PortfolioPoint {
  portfolio_std: number;
  portfolio_ret: number;
  [key: string]: any;
}

interface RiskReturnChartProps {
  distinct: PortfolioPoint[];
  frontier: PortfolioPoint[];
  sharpeRatio: number;
  expectedReturn: number;
  portfolioStd: number;
  distinctColor?: string;
  frontierColor?: string;
}

export const RiskReturnChart: React.FC<RiskReturnChartProps> = memo(
  ({
    distinct,
    frontier,
    sharpeRatio,
    expectedReturn,
    portfolioStd,
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

    const riskFreeRate = 0.041 // NEED from backend

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
          />


          <Legend align="right" wrapperStyle={{ fontSize: 12, lineHeight: '16px' }} />

          <Scatter
            name="Distinct Portfolios"
            data={distinct}
            fill={distinctColor}
            isAnimationActive={false}
            tooltipType="none"

          />

          <Scatter
            name="Frontier Portfolios"
            data={frontier}
            fill={frontierColor}
            isAnimationActive={false}
            tooltipType="none"
          />


          <ReferenceLine
            // label="CAL"
            stroke={brandColors[defaultShade]}
            strokeWidth={4}
            segment={[
              { x: 0.0, y: riskFreeRate }, // need to fetch risk free rate
              { x: ((retMax - riskFreeRate) / sharpeRatio), y: retMax } // this will basically be a math function
              // retMax varible here would dictate how far the line would

            ]}
          />
          {/* <ReferenceDot
            x={portfolioStd}
            y={expectedReturn}
            r={6}
            fill={successColor}
            label={{
              value: "Optimal Portfolio",
              position: "top",   // place above
              offset: 10,       // move slightly further up
              fontSize: 12,      // optional: adjust size
              // textAnchor: "end"  // align left relative to dot
            }}
          /> */}

          <Scatter
            name="Optimal Portfolio"
            data={[{ portfolio_std: portfolioStd, portfolio_ret: expectedReturn }]}
            fill={successColor}
            r={6}

          >
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}

              formatter={(value: number, name: string) => {
                const prettyNames: Record<string, string> = {
                  portfolio_std: "Risk (Std Dev)",
                  portfolio_ret: "Return"
                };

                const label = prettyNames[name] ?? name;

                return [`${(value * 100).toFixed(2)}%`, label];
              }}

              labelFormatter={() => ""}

              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #555",
                borderRadius: 6,
                padding: "8px 12px",
                color: "#fff",
              }}

              itemStyle={{
                color: "#fff",
                fontSize: 12,
              }}
            />
          </Scatter>

          <ReferenceLine y={0} strokeWidth={2} />
          <ReferenceLine x={0} strokeWidth={2} />


        </ScatterChart>
      </ResponsiveContainer>
    );
  }
);
