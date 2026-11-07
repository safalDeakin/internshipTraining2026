import type { ChartData, ExceptionRow } from "../../../domain/pos.overview";

export const chartData: ChartData[] = [
  { label: "Tiya Piya", time: "7:30–1:30", forecasted: 138, actual: 165 },
  { label: "Prabin Doe", time: "1:30–6:30", forecasted: 145, actual: 121 },
  { label: "John Shrestha", time: "6:30–11:00", forecasted: 145, actual: 122 },
  { label: "Electronics", time: "", forecasted: 228, actual: 184 },
  { label: "Furniture", time: "", forecasted: 177, actual: 195 },
];

export const exceptionRows: ExceptionRow[] = [
  { name: "Void Bills", count: 0, value: "5 Hrs", recovery: "6 Hrs" },
  { name: "Line Item Voids", count: 0, value: "6 Hrs", recovery: "6 Hrs" },
  { name: "Refunds", count: 0, value: "6 Hrs", recovery: "6 Hrs" },
  { name: "Price Override", count: 0, value: "14 Hrs", recovery: "20 Hrs" },
  { name: "Discount Overrides", count: 0, value: "17 Hrs", recovery: "23 Hrs" },
  { name: "Large Refunds", count: 0, value: "24 Hrs", recovery: "34 Hrs" },
  { name: "Cash Mismatch", count: 0, value: "10 Hrs", recovery: "10 Hrs" },
  { name: "Pending Approvals", count: 0, value: "10 Hrs", recovery: "10 Hrs" },
  { name: "High Discounts", count: 0, value: "10 Hrs", recovery: "10 Hrs" },
];

export const heatmap = [
  [1, 1, 2, 4, 1, 1, 0],
  [2, 3, 4, 5, 2, 2, 1],
  [2, 4, 5, 4, 3, 2, 1],
  [1, 3, 4, 3, 2, 1, 1],
];

export const paymentMethods = [
  "Cash",
  "Card",
  "Cheques",
  "Digital Wallet",
  "Credit Sale (AR)",
];

import type { POSOverview } from "../../../domain/pos.overview";

export const initialPOSOverview: POSOverview[] = [
  {
    id: "pos-overview-1",
    date: "2026-11-07",
    sessionId: "POS001",
    staffName: "Ram Shrestha",
    chartData,
    exceptionRows,
    heatmap,
    paymentMethods,
  },
  {
    id: "pos-overview-2",
    date: "2026-11-07",
    sessionId: "POS002",
    staffName: "Sita Thapa",
    chartData,
    exceptionRows,
    heatmap,
    paymentMethods,
  },
];
