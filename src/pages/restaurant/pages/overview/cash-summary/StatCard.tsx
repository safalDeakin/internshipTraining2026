import React from "react";
import { Sparkline } from "./Charts";
import { ArrowDown, ArrowUp } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  tone: string;
  iconBg: string;
  color: string;
  trend: number[];
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon,
  tone,
  iconBg,
  color,
  trend,
}) => (
  <div className={`flex items-center gap-3 rounded-xl border p-4 ${tone}`}>
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${iconBg}`}
    >
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-lg font-extrabold text-gray-900">{value}</p>
      <p
        className={`text-xs font-semibold ${
          change >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {change >= 0 ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )}{" "}
        {Math.abs(change)}%
      </p>
    </div>
    <Sparkline values={trend} color={color} />
  </div>
);

export default StatCard;
