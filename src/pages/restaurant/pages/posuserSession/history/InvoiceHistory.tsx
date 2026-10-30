import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import HistoryHeader from "./HistoryHeader";
import TableView from "./TableView";

interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  references: string[];
  serviceDate: string;
  receiptNo: string;
  paymentMethod: string;
  chequeNumber: string;
  bankName: string;
  totalAmount: number;
  paidAmount: number;
  items: {
    name: string;
    quantity: number;
    amount: number;
  }[];
}

interface InvoiceHistoryProps {
  onBack: () => void;
}

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV_555",
    date: "2024/12/13",
    customerName: "Ram Shrestha",
    phone: "9876543210",
    address: "Pokhara",
    references: ["KOT#125", "BOT#125"],
    serviceDate: "2025-02-02",
    receiptNo: "R_555",
    paymentMethod: "Cheque",
    chequeNumber: "#1234",
    bankName: "NIC Asia",
    totalAmount: 1500,
    paidAmount: 1000,
    items: [
      { name: "Chicken Momo", quantity: 2, amount: 800 },
      { name: "Coke", quantity: 2, amount: 200 },
      { name: "Fried Rice", quantity: 1, amount: 500 },
    ],
  },
  {
    id: 2,
    invoiceNumber: "INV_554",
    date: "2024/12/12",
    customerName: "Sita Thapa",
    phone: "9801234567",
    address: "Kathmandu",
    references: ["KOT#126"],
    serviceDate: "2024-12-12",
    receiptNo: "R_554",
    paymentMethod: "Cash",
    chequeNumber: "-",
    bankName: "-",
    totalAmount: 2000,
    paidAmount: 2000,
    items: [
      { name: "Veg Momo", quantity: 4, amount: 1200 },
      { name: "Juice", quantity: 2, amount: 800 },
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

const InvoiceHistory = ({ onBack }: InvoiceHistoryProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(
    invoices[0]?.id ?? null,
  );
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return invoices.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(q) ||
        invoice.customerName.toLowerCase().includes(q),
    );
  }, [query]);

  const selected =
    filtered.find((invoice) => invoice.id === selectedId) ?? null;

  const summary = [
    { label: "Total Invoices", value: String(filtered.length) },
    {
      label: "Total Amount",
      value: `Rs ${filtered.reduce((sum, invoice) => sum + invoice.totalAmount, 0)}`,
    },
    {
      label: "Received Amount",
      value: `Rs ${filtered.reduce((sum, invoice) => sum + invoice.paidAmount, 0)}`,
    },
    {
      label: "Due Amount",
      value: `Rs ${filtered.reduce((sum, invoice) => sum + Math.max(0, invoice.totalAmount - invoice.paidAmount), 0)}`,
    },
    {
      label: "Fully Paid",
      value: String(
        filtered.filter((invoice) => invoice.paidAmount >= invoice.totalAmount)
          .length,
      ),
    },
  ];

  const columns = [
    { key: "invoiceNumber", label: "Invoice Number" },
    { key: "date", label: "Date" },
    { key: "customerName", label: "Customer Name" },
    { key: "phone", label: "Phone Number" },
    { key: "references", label: "Reference Numbers" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "paidAmount", label: "Paid Amount" },
    { key: "dueAmount", label: "Due Amount" },
  ];

  const rows: Record<string, ReactNode>[] = filtered.map((invoice) => ({
    invoiceNumber: invoice.invoiceNumber,
    date: invoice.date,
    customerName: invoice.customerName,
    phone: invoice.phone,
    references: invoice.references.join(", "),
    totalAmount: `Rs ${invoice.totalAmount}`,
    paidAmount: `Rs ${invoice.paidAmount}`,
    dueAmount: `Rs ${Math.max(0, invoice.totalAmount - invoice.paidAmount)}`,
  }));

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
          <aside className="w-full shrink-0 lg:w-64">
            <p className="mb-2 text-xs text-gray-500">
              {filtered.length} items
            </p>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invoice"
              className="mb-3 w-full rounded border border-gray-300 px-2 py-2 text-xs outline-none focus:border-blue-400"
            />

            <ul className="space-y-1">
              {filtered.map((invoice) => (
                <li key={invoice.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(invoice.id)}
                    className={`w-full rounded border px-3 py-2 text-left ${
                      invoice.id === selectedId
                        ? "border-blue-400 bg-blue-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <p className="text-xs font-medium text-gray-800">
                      Invoice no: {invoice.invoiceNumber}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Customer: {invoice.customerName}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Date: {invoice.date}
                    </p>
                  </button>
                </li>
              ))}
            </ul>

            {filtered.length === 0 && (
              <p className="py-6 text-center text-xs text-gray-400">
                No invoices found
              </p>
            )}
          </aside>

          <main className="min-w-0 flex-1">
            {selected ? (
              <div className="rounded border border-gray-200 bg-white px-5 py-6 sm:px-8">
                <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
                  Invoice
                </h2>

                <div className="space-y-1.5 pb-5">
                  <Field label="Invoice number">{selected.invoiceNumber}</Field>
                  <Field label="Date">{selected.date}</Field>
                </div>

                <Section title="Billing Information">
                  <Field label="Ref Number">
                    {selected.references.join(", ")}
                  </Field>
                  <Field label="Service Date">{selected.serviceDate}</Field>
                </Section>

                <Section title="Customer Information">
                  <Field label="Customer name">{selected.customerName}</Field>
                  <Field label="Phone number">{selected.phone}</Field>
                  <Field label="Address">{selected.address}</Field>
                </Section>

                <Section title="Payment Details">
                  <Field label="Receipt no">{selected.receiptNo}</Field>
                  <Field label="Payment Method">{selected.paymentMethod}</Field>
                  <Field label="Cheque Number">{selected.chequeNumber}</Field>
                  <Field label="Bank Name">{selected.bankName}</Field>
                </Section>

                <section className="overflow-x-auto border-t border-gray-200 py-5">
                  <table className="w-full min-w-[450px] text-sm">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="pb-3 font-medium">Items</th>
                        <th className="pb-3 text-right font-medium">
                          Quantity
                        </th>
                        <th className="pb-3 text-right font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.items.map((item, index) => (
                        <tr key={`${item.name}-${index}`}>
                          <td className="py-2">{item.name}</td>
                          <td className="py-2 text-right">{item.quantity}</td>
                          <td className="py-2 text-right">Rs {item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 space-y-1 text-right text-sm">
                    <p>Total: Rs {selected.totalAmount}</p>
                    <p>Received: Rs {selected.paidAmount}</p>
                    <p className="font-semibold">
                      Due: Rs{" "}
                      {Math.max(0, selected.totalAmount - selected.paidAmount)}
                    </p>
                  </div>
                </section>
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-gray-400">
                Select an invoice to view its details
              </p>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default InvoiceHistory;
