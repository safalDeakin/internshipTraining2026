import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import HistoryHeader from "./HistoryHeader";
import TableView from "./TableView";
interface PaymentHistoryProps {
  onBack: () => void;
}
interface InvoiceRow {
  invoiceNumber: string;
  invoiceDate: string;
  dueAmount: string;
  paidAmount: string;
}

interface Receipt {
  id: number;
  receiptNo: string;
  type: string;
  date: string;
  listDate: string;
  customerName: string;
  phone: string;
  address: string;
  invoices: string[];
  chequeNumber: string;
  bankName: string;
  note: string;
  active?: boolean;
  invoiceRows: InvoiceRow[];
}

const receipts: Receipt[] = [
  {
    id: 1,
    receiptNo: "#R_555",
    type: "Cheque",
    date: "2024/12/13",
    listDate: "24/03/2024",
    customerName: "Ram Shrestha",
    phone: "9876543210",
    address: "Pokhara",
    invoices: ["INV_101", "INV_102", "INV_103"],
    chequeNumber: "#1234",
    bankName: "NIC Asia",
    note: "Amount received, Balance cleared",
    active: true,
    invoiceRows: [
      {
        invoiceNumber: "INV_101",
        invoiceDate: "2024/12/01",
        dueAmount: "Rs 500",
        paidAmount: "Rs 500",
      },
      {
        invoiceNumber: "INV_102",
        invoiceDate: "2024/12/05",
        dueAmount: "Rs 300",
        paidAmount: "Rs 300",
      },
      {
        invoiceNumber: "INV_103",
        invoiceDate: "2024/12/09",
        dueAmount: "Rs 200",
        paidAmount: "Rs 200",
      },
    ],
  },
  {
    id: 2,
    receiptNo: "#R_554",
    type: "Cash",
    date: "2023/11/11",
    listDate: "11/03/2023",
    customerName: "Prakash Periyar",
    phone: "9801234567",
    address: "Kathmandu",
    invoices: ["INV_098"],
    chequeNumber: "-",
    bankName: "-",
    note: "Paid in full",
    invoiceRows: [
      {
        invoiceNumber: "INV_098",
        invoiceDate: "2023/11/02",
        dueAmount: "Rs 1200",
        paidAmount: "Rs 1200",
      },
    ],
  },
  {
    id: 3,
    receiptNo: "#R_5553",
    type: "Cheque",
    date: "2023/11/11",
    listDate: "11/03/2023",
    customerName: "Pramod Agrawal",
    phone: "9860123456",
    address: "Butwal",
    invoices: ["INV_090", "INV_091"],
    chequeNumber: "#5678",
    bankName: "Nabil Bank",
    note: "Partial payment",
    invoiceRows: [
      {
        invoiceNumber: "INV_090",
        invoiceDate: "2023/10/20",
        dueAmount: "Rs 700",
        paidAmount: "Rs 400",
      },
      {
        invoiceNumber: "INV_091",
        invoiceDate: "2023/10/25",
        dueAmount: "Rs 900",
        paidAmount: "Rs 0",
      },
    ],
  },
];

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <p className="text-sm text-gray-500">
    {label}: <span className="font-medium text-gray-900">{children}</span>
  </p>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="border-t border-gray-200 py-5">
    <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
    <div className="space-y-1.5">{children}</div>
  </section>
);

type ViewMode = "grid" | "table";

const PaymentHistory = ({ onBack }: PaymentHistoryProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(
    receipts[0]?.id ?? null,
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return receipts.filter(
      (r) =>
        r.receiptNo.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q),
    );
  }, [query]);

  const selected = filtered.find((r) => r.id === selectedId) ?? null;

  // Table summary
  const summary = [
    { label: "Total Receipts", value: String(filtered.length) },
    {
      label: "Total Amount",
      value: `Rs ${filtered.reduce(
        (sum, r) =>
          sum +
          r.invoiceRows.reduce(
            (total, row) =>
              total + Number(row.dueAmount.replace(/[^\d.]/g, "")),
            0,
          ),
        0,
      )}`,
    },
    {
      label: "Received Amount",
      value: `Rs ${filtered.reduce(
        (sum, r) =>
          sum +
          r.invoiceRows.reduce(
            (total, row) =>
              total + Number(row.paidAmount.replace(/[^\d.]/g, "")),
            0,
          ),
        0,
      )}`,
    },
    {
      label: "Due Amount",
      value: `Rs ${filtered.reduce(
        (sum, r) =>
          sum +
          r.invoiceRows.reduce(
            (total, row) =>
              total +
              Math.max(
                0,
                Number(row.dueAmount.replace(/[^\d.]/g, "")) -
                  Number(row.paidAmount.replace(/[^\d.]/g, "")),
              ),
            0,
          ),
        0,
      )}`,
    },
    {
      label: "Payment Types",
      value: String(new Set(filtered.map((r) => r.type)).size),
    },
  ];

  const columns = [
    { key: "receiptNo", label: "Receipt No" },
    { key: "date", label: "Date" },
    { key: "customerName", label: "Customer Name" },
    { key: "type", label: "Payment Type" },
    { key: "phone", label: "Phone Number" },
    { key: "bankName", label: "Bank Name" },
    { key: "chequeNumber", label: "Cheque Number" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "paidAmount", label: "Paid Amount" },
  ];

  const rows: Record<string, ReactNode>[] = filtered.map((r) => {
    const total = r.invoiceRows.reduce(
      (sum, row) => sum + Number(row.dueAmount.replace(/[^\d.]/g, "")),
      0,
    );

    const paid = r.invoiceRows.reduce(
      (sum, row) => sum + Number(row.paidAmount.replace(/[^\d.]/g, "")),
      0,
    );

    return {
      receiptNo: r.receiptNo,
      date: r.date,
      customerName: r.customerName,
      type: r.type,
      phone: r.phone,
      bankName: r.bankName,
      chequeNumber: r.chequeNumber,
      totalAmount: `Rs ${total}`,
      paidAmount: `Rs ${paid}`,
    };
  });

  return (
    <div className="px-4 py-4 sm:px-6">
      <HistoryHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onBack={onBack}
      />

      {viewMode === "table" ? (
        <div className="mt-5">
          <TableView summary={summary} columns={columns} rows={rows} />
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar  make reusable */}
          <aside className="w-full shrink-0 lg:w-64">
            <p className="mb-2 text-xs text-gray-500">
              <span className="text-sm font-medium text-gray-700">
                {filtered.length}
              </span>{" "}
              items
            </p>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search item"
              className="mb-3 w-full rounded border border-gray-300 px-2 py-2 text-xs outline-none focus:border-blue-400"
            />

            <ul className="space-y-1">
              {filtered.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(r.id)}
                    className={`w-full rounded border px-3 py-2 text-left ${
                      r.id === selectedId
                        ? "border-blue-400 bg-blue-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-800">
                        {r.receiptNo}
                      </span>

                      {r.active && (
                        <span className="text-[10px] text-green-600">
                          Active
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-gray-500">{r.listDate}</p>
                    <p className="text-[10px] text-gray-500">
                      {r.customerName}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Receipt details */}
          <main className="min-w-0 flex-1">
            {selected ? (
              <div className="rounded border border-gray-200 bg-white px-5 py-6 sm:px-8">
                <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
                  Receipt
                </h2>

                <div className="space-y-1.5 pb-5">
                  <Field label="Receipt no">{selected.receiptNo}</Field>
                  <Field label="Type">{selected.type}</Field>
                  <Field label="Date">{selected.date}</Field>
                </div>

                <section className="border-t border-gray-200 py-5">
                  <Field label="Invoice number">
                    {selected.invoices.join(", ")}
                  </Field>
                </section>

                <Section title="Customer Information">
                  <Field label="Customer name">{selected.customerName}</Field>
                  <Field label="Phone number">{selected.phone}</Field>
                  <Field label="Address">{selected.address}</Field>
                </Section>

                <Section title="Payment Details">
                  <Field label="Cheque Number">{selected.chequeNumber}</Field>
                  <Field label="Bank Name">{selected.bankName}</Field>
                  <Field label="Payment Note">{selected.note}</Field>
                </Section>

                <section className="overflow-x-auto border-t border-gray-200 py-5">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="pb-3 font-medium">Invoice Number</th>
                        <th className="pb-3 font-medium">Invoice Date</th>
                        <th className="pb-3 text-right font-medium">
                          Due Amount
                        </th>
                        <th className="pb-3 text-right font-medium">
                          Paid Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {selected.invoiceRows.map((row) => (
                        <tr key={row.invoiceNumber} className="text-gray-800">
                          <td className="py-2">{row.invoiceNumber}</td>
                          <td className="py-2">{row.invoiceDate}</td>
                          <td className="py-2 text-right">{row.dueAmount}</td>
                          <td className="py-2 text-right">{row.paidAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-gray-400">
                {filtered.length === 0
                  ? "No receipts found"
                  : "Select a receipt to view its details"}
              </p>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
