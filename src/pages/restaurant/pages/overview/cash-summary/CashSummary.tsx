import React, { useState } from "react";
import {
  Banknote,
  Calendar,
  ChevronDown,
  CreditCard,
  Download,
  Smartphone,
  Wallet,
} from "lucide-react";
import StatCard from "./StatCard";
import { AreaChart, BarChart, DonutChart, formatCurrency } from "./Charts";

const Card: React.FC<{
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, action, children }) => (
  <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
    {(title || action) && (
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        {action}
      </div>
    )}
    {children}
  </section>
);

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-gray-200 bg-white p-0.5 text-xs">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full px-3 py-1 font-medium transition ${
            opt === value
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right";
  render: (row: T) => React.ReactNode;
}

function DataTable<T>({
  columns,
  rows,
  rowKey,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500">
            {columns.map((c) => (
              <th
                key={c.key}
                className={`px-3 py-2 font-semibold ${
                  c.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-gray-50 last:border-0"
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={`px-3 py-2 text-gray-700 ${
                    c.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ReconRow: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between py-1 text-xs text-gray-700">
    <span>{label}</span>
    <span className={value < 0 ? "text-red-600" : ""}>
      {value < 0
        ? `(${formatCurrency(Math.abs(value))})`
        : formatCurrency(value)}
    </span>
  </div>
);

type Range = "Today" | "This Week" | "This Month";
const RANGES = ["Today", "This Week", "This Month"] as const;

const salesTrend: Record<Range, { slot: string; sales: number }[]> = {
  Today: [
    { slot: "9 AM – 12 PM", sales: 8200 },
    { slot: "12 PM – 3 PM", sales: 14750 },
    { slot: "3 PM – 6 PM", sales: 10600 },
    { slot: "6 PM – 9 PM", sales: 9200 },
  ],
  "This Week": [
    { slot: "Mon", sales: 31000 },
    { slot: "Tue", sales: 28500 },
    { slot: "Wed", sales: 35200 },
    { slot: "Thu", sales: 42750 },
  ],
  "This Month": [
    { slot: "Week 1", sales: 190000 },
    { slot: "Week 2", sales: 214000 },
    { slot: "Week 3", sales: 176000 },
    { slot: "Week 4", sales: 42750 },
  ],
};

const paymentBreakdown = [
  { name: "Cash", value: 18500, color: "#2f6fed" },
  { name: "Card", value: 17250, color: "#3fb68b" },
  { name: "eSewa / Khalti", value: 4200, color: "#8b5cf6" },
  { name: "Others", value: 2800, color: "#f59e42" },
];

const cashMovement = [
  { time: "9 AM", amount: 3500 },
  { time: "12 PM", amount: 7800 },
  { time: "3 PM", amount: 8600 },
  { time: "6 PM", amount: 12000 },
  { time: "9 PM", amount: 10200 },
];

const reconciliation = {
  openingCash: 5000,
  cashSales: 18500,
  cashRefunds: -500,
  cashExpenses: -800,
  cashDrops: -1000,
  actualCounted: 21000,
};

interface Transaction {
  time: string;
  invoice: string;
  orderType: string;
  method: string;
  amount: number;
  status: "Paid" | "Pending";
}

const transactions: Transaction[] = [
  {
    time: "08:45 PM",
    invoice: "INV-1047",
    orderType: "Dine In",
    method: "Cash",
    amount: 1200,
    status: "Paid",
  },
  {
    time: "08:40 PM",
    invoice: "INV-1046",
    orderType: "Takeaway",
    method: "Card",
    amount: 850,
    status: "Paid",
  },
  {
    time: "08:35 PM",
    invoice: "INV-1045",
    orderType: "Dine In",
    method: "eSewa",
    amount: 980,
    status: "Paid",
  },
  {
    time: "08:30 PM",
    invoice: "INV-1044",
    orderType: "Room Service",
    method: "Card",
    amount: 2500,
    status: "Paid",
  },
];

const txColumns: Column<Transaction>[] = [
  { key: "time", header: "Time", render: (r) => r.time },
  { key: "invoice", header: "Invoice No.", render: (r) => r.invoice },
  { key: "orderType", header: "Order Type", render: (r) => r.orderType },
  { key: "method", header: "Payment Method", render: (r) => r.method },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (r) => formatCurrency(r.amount),
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (r) => (
      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
        {r.status}
      </span>
    ),
  },
];

const CashSummary = () => {
  const [range, setRange] = useState<Range>("Today");

  const total = paymentBreakdown.reduce((s, p) => s + p.value, 0);
  const r = reconciliation;
  const expectedCash =
    r.openingCash + r.cashSales + r.cashRefunds + r.cashExpenses + r.cashDrops;
  const difference = r.actualCounted - expectedCash;

  return (
    <div className="space-y-4 bg-slate-50 p-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-extrabold">Cash Summary</h1>
          <p className="text-gray-600">
            Overview of sales and cash details of selected period
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm">
            <Calendar size={16} /> Today (Nov 4, 2026) <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-blue-600">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 text-sm font-medium">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs text-white">
              JD
            </span>
            John Doe <ChevronDown size={14} />
          </button>
        </div>
      </header>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Sales"
          value="Rs. 42,750"
          change={12}
          icon={<Wallet size={22} />}
          tone="border-blue-100 bg-blue-50"
          iconBg="bg-blue-600"
          color="#2f6fed"
          trend={[3, 4, 3, 5, 6, 8]}
        />
        <StatCard
          label="Cash Received"
          value="Rs. 18,500"
          change={8}
          icon={<Banknote size={22} />}
          tone="border-green-100 bg-green-50"
          iconBg="bg-emerald-500"
          color="#22a06b"
          trend={[2, 3, 3, 4, 4, 6]}
        />
        <StatCard
          label="Card Payment"
          value="Rs. 17,250"
          change={15}
          icon={<CreditCard size={22} />}
          tone="border-purple-100 bg-purple-50"
          iconBg="bg-violet-500"
          color="#8b5cf6"
          trend={[2, 2, 4, 3, 5, 7]}
        />
        <StatCard
          label="Digital Payment"
          value="Rs. 7,000"
          change={10}
          icon={<Smartphone size={22} />}
          tone="border-orange-100 bg-orange-50"
          iconBg="bg-orange-400"
          color="#f59e42"
          trend={[1, 2, 2, 3, 3, 5]}
        />
      </div>

      {/* Sales trend + payment breakdown */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Sales Trend"
          action={
            <SegmentedControl
              options={RANGES}
              value={range}
              onChange={setRange}
            />
          }
        >
          <BarChart data={salesTrend[range]} xKey="slot" yKey="sales" />
        </Card>

        <Card title="Payment Method Breakdown">
          <div className="flex flex-wrap items-center gap-6">
            <DonutChart
              data={paymentBreakdown}
              centerValue={formatCurrency(total)}
              centerLabel="Total Sales"
            />
            <ul className="flex-1 space-y-3 text-xs">
              {paymentBreakdown.map((p) => (
                <li key={p.name} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: p.color }}
                  />
                  <span className="flex-1">{p.name}</span>
                  <span className="w-12 text-right text-gray-500">
                    {((p.value / total) * 100).toFixed(1)}%
                  </span>
                  <span className="w-20 text-right font-medium">
                    {formatCurrency(p.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
      {/*  */}
      {/* Reconciliation + cash movement */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Cash Reconciliation">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <ReconRow label="Opening Cash" value={r.openingCash} />
              <ReconRow label="Cash Sales" value={r.cashSales} />
              <ReconRow label="Cash Refunds" value={r.cashRefunds} />
            </div>
            <div>
              <ReconRow label="Cash Expenses" value={r.cashExpenses} />
              <ReconRow label="Cash Drops" value={r.cashDrops} />
              <div className="mt-1 flex justify-between rounded bg-blue-50 px-2 py-1.5 text-xs font-semibold">
                <span>Expected Cash</span>
                <span className="text-blue-700">
                  {formatCurrency(expectedCash)}
                </span>
              </div>
              <ReconRow label="Actual Cash Counted" value={r.actualCounted} />
              {difference !== 0 && (
                <div className="flex justify-between rounded bg-red-100 px-2 py-1.5 text-xs font-semibold text-red-600">
                  <span>
                    Cash Difference ({difference < 0 ? "Short" : "Over"})
                  </span>
                  <span>{formatCurrency(Math.abs(difference))}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card title="Cash Movement">
          <AreaChart
            data={cashMovement}
            xKey="time"
            yKey="amount"
            yTicks={[0, 5000, 10000, 15000]}
            height={180}
          />
        </Card>
      </div>

      <Card
        title="Recent Transactions"
        action={
          <button className="text-xs font-medium text-blue-600">
            View All →
          </button>
        }
      >
        <DataTable
          columns={txColumns}
          rows={transactions}
          rowKey={(t) => t.invoice}
        />
      </Card>
    </div>
  );
};
export default CashSummary;
