import { useMemo, useState, type ReactNode } from "react";
import HistoryHeader from "../../shared/history/HistoryHeader";
import TableView from "../../shared/history/TableView";
import SalesReceipt from "./components/SalesReceipt";
import ReferenceDetailsModal from "../../../../popup/ReferenceDetailsModals";
import type { InvoiceHistoryProps } from "./types/InvoiceTypes";
import { invoices } from "./constants/InvoiceData";

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
  const [selectedReference, setSelectedReference] = useState<string | null>(
    null,
  );
  const [showSalesReceipt, setShowSalesReceipt] = useState(false);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return invoices.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(search) ||
        invoice.customerName.toLowerCase().includes(search) ||
        invoice.receiptNo.toLowerCase().includes(search),
    );
  }, [query]);

  // Keep the selected invoice valid when search results change.
  const selected =
    filtered.find((invoice) => invoice.id === selectedId) ??
    filtered[0] ??
    null;

  const activeReference = selected?.references.find(
    (reference) => reference === selectedReference,
  );

  const summary = useMemo(
    () => [
      {
        label: "Total Invoices",
        value: String(filtered.length),
      },
      {
        label: "Total Amount",
        value: `Rs ${filtered.reduce(
          (sum, invoice) => sum + invoice.totalAmount,
          0,
        )}`,
      },
      {
        label: "Received Amount",
        value: `Rs ${filtered.reduce(
          (sum, invoice) => sum + invoice.paidAmount,
          0,
        )}`,
      },
      {
        label: "Due Amount",
        value: `Rs ${filtered.reduce(
          (sum, invoice) =>
            sum + Math.max(0, invoice.totalAmount - invoice.paidAmount),
          0,
        )}`,
      },
      {
        label: "Fully Paid",
        value: String(
          filtered.filter(
            (invoice) => invoice.paidAmount >= invoice.totalAmount,
          ).length,
        ),
      },
    ],
    [filtered],
  );

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

  const handleSelectInvoice = (invoiceId: number) => {
    setSelectedId(invoiceId);
    setSelectedReference(null);
    setShowSalesReceipt(false);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setSelectedReference(null);
    setShowSalesReceipt(false);
  };

  return (
    <div className="px-4 py-4 sm:px-6">
      <HistoryHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onBack={onBack}
      />

      {viewMode === "table" ? (
        <div className="mt-5">
          {filtered.length > 0 ? (
            <TableView summary={summary} columns={columns} rows={rows} />
          ) : (
            <EmptyState message="No invoices found" />
          )}
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-6 lg:flex-row">
          {/* Invoice List */}
          <aside className="w-full shrink-0 lg:w-64">
            <p className="mb-2 text-xs text-gray-500">
              {filtered.length} items
            </p>

            <input
              value={query}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search invoice"
              className="mb-3 w-full rounded border border-gray-300 px-3 py-2 text-xs outline-none focus:border-blue-400"
            />

            <ul className="space-y-1">
              {filtered.map((invoice) => (
                <li key={invoice.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectInvoice(invoice.id)}
                    className={`w-full rounded border px-3 py-2 text-left transition ${
                      invoice.id === selected?.id
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

          {/* Invoice Details */}
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
                    <div className="flex flex-wrap gap-3">
                      {selected.references.map((reference) => (
                        <button
                          key={reference}
                          type="button"
                          onClick={() => setSelectedReference(reference)}
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          {reference}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Service Date">{selected.serviceDate}</Field>
                </Section>

                <Section title="Customer Information">
                  <Field label="Customer name">{selected.customerName}</Field>
                  <Field label="Phone number">{selected.phone}</Field>
                  <Field label="Address">{selected.address}</Field>
                </Section>

                <Section title="Payment Details">
                  <Field label="Receipt no">
                    <button
                      type="button"
                      onClick={() => setShowSalesReceipt(true)}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {selected.receiptNo}
                    </button>
                  </Field>

                  <Field label="Payment Method">{selected.paymentMethod}</Field>
                  <Field label="Cheque Number">{selected.chequeNumber}</Field>
                  <Field label="Bank Name">{selected.bankName}</Field>
                </Section>
              </div>
            ) : (
              <EmptyState message="Select an invoice to view its details" />
            )}
          </main>
        </div>
      )}

      {/* Reference Details */}
      {selected && activeReference && (
        <ReferenceDetailsModal
          invoice={selected}
          reference={activeReference}
          onClose={() => setSelectedReference(null)}
        />
      )}

      {/* Sales Receipt */}
      {showSalesReceipt && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowSalesReceipt(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <SalesReceipt
              invoice={{
                receiptNo: selected.receiptNo,
                customerName: selected.customerName,
                phone: selected.phone,
                references: selected.references,
                items: selected.items,
                subtotal: selected.totalAmount,
                vat: 0,
                service: 0,
                totalAmount: selected.totalAmount,
                paidAmount: selected.paidAmount,
                paymentMethod: selected.paymentMethod,
                dueDate: "Not set",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="rounded border border-gray-200 bg-white py-12 text-center text-sm text-gray-400">
    {message}
  </div>
);

export default InvoiceHistory;
