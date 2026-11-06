import React, { useId } from "react";
import {
  Area,
  AreaChart as RAreaChart,
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const formatCurrency = (value: number) =>
  `Rs. ${Number(value).toLocaleString("en-IN")}`;

export const formatCompact = (value: number) =>
  value >= 1000 ? `${value / 1000}K` : String(value);

const AXIS_TICK = { fontSize: 11, fill: "#6b7280" };

// Barchrt
export interface BarChartProps {
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  showLabels?: boolean;
  yTicks?: number[];
  formatValue?: (v: number) => string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  yKey,
  color = "#2f6fed",
  height = 240,
  showLabels = true,
  yTicks,
  formatValue = formatCurrency,
}) => (
  <ResponsiveContainer width="100%" height={height}>
    <RBarChart data={data} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
      <XAxis
        dataKey={xKey}
        tickLine={false}
        axisLine={false}
        tick={AXIS_TICK}
      />
      <YAxis
        ticks={yTicks}
        tickFormatter={(v: any) => formatCompact(Number(v))}
        tickLine={false}
        axisLine={false}
        tick={AXIS_TICK}
        width={36}
      />
      <Bar dataKey={yKey} fill={color} radius={[3, 3, 0, 0]} maxBarSize={64}>
        {showLabels && (
          <LabelList
            dataKey={yKey}
            position="top"
            formatter={(v: any) => formatValue(Number(v))}
            style={{ fontSize: 11, fontWeight: 600, fill: "#111827" }}
          />
        )}
      </Bar>
    </RBarChart>
  </ResponsiveContainer>
);

// donut chart
export interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  data: DonutDatum[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  centerLabel,
  centerValue,
  size = 180,
}) => (
  <div className="relative" style={{ width: size, height: size }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius="68%"
          outerRadius="100%"
          paddingAngle={2}
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    {(centerValue || centerLabel) && (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {centerValue && (
          <span className="text-base font-extrabold text-gray-900">
            {centerValue}
          </span>
        )}
        {centerLabel && (
          <span className="text-xs text-gray-500">{centerLabel}</span>
        )}
      </div>
    )}
  </div>
);

// Areachart
export interface AreaChartProps {
  data: Record<string, any>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  yTicks?: number[];
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  xKey,
  yKey,
  color = "#22a06b",
  height = 220,
  yTicks,
}) => {
  const gradId = useId();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RAreaChart
        data={data}
        margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="#e5e7eb"
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tick={AXIS_TICK}
        />
        <YAxis
          ticks={yTicks}
          tickFormatter={(v: any) => formatCompact(Number(v))}
          tickLine={false}
          axisLine={false}
          tick={AXIS_TICK}
          width={36}
        />
        <Tooltip formatter={(v: any) => formatCurrency(Number(v))} />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradId})`}
          dot={{ r: 4, fill: "#fff", stroke: color, strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
      </RAreaChart>
    </ResponsiveContainer>
  );
};

// Sparkline
export interface SparklineProps {
  values: number[];
  color: string;
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  values,
  color,
  width = 90,
  height = 32,
}) => {
  const gradId = useId();
  const data = values.map((v, i) => ({ i, v }));
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RAreaChart
          data={data}
          margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradId})`}
            dot={false}
            isAnimationActive={false}
          />
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
