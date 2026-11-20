import { useMemo, useState, type ReactNode } from "react";
import type { InvoiceHistoryProps } from "../types/InvoiceTypes";
import { invoices } from "../data/InvoiceData";

import HistoryHeader from "../../shared/history/HistoryHeader";
import TableView from "../../shared/history/TableView";
import ReferenceDetailsModal from "../../modal/ReferenceDetailsModals";
import SalesReceipt from "../receipts/SalesReceipt";
import ReusableButton from "../../shared/components/ReusableButton";
import ApplyReturnModal from "../../modal/ApplyReturnModal";

import CollectOutstandingModal, {
  type OutstandingInvoice,
  type OutstandingPayment,
} from "../../modal/CollectOutstandingModal";
import OutstandingReceiptModal from "../../modal/OutstandingReceiptModal";
import OutstandingInvoiceModal from "../../modal/OutstandingInvoiceModal";

import useDialogBox from "../../../lib/component/DialogueBox/useDialogueBox";

/* ----------------------------- Helpers ----------------------------- */

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

/* ----------------------------- Component ----------------------------- */

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

  const { showDialog, closeDialog } = useDialogBox();

  /* ----------------------------- Filtering ----------------------------- */

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

  /* ----------------------------- Summary ----------------------------- */

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

  /* ----------------------------- Table Data ----------------------------- */

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

  /* ----------------------------- Apply Return ----------------------------- */

  const handleApplyReturn = () => {
    if (!selected) return;

    showDialog({
      title: "Return Request",
      width: 520,
      showHeader: true,
      closeOnEscape: true,
      closeOnBackdrop: true,
      content: (
        <ApplyReturnModal
          invoice={selected}
          onSubmit={(request) => {
            console.log("Return request:", request);

            // Connect your return approval API here.
            // Do not call closeDialog() here.
            // ApplyReturnModal handles closing after showing success.
          }}
        />
      ),
    });
  };

  /* ----------------------------- Outstanding Invoice Data ----------------------------- */

  const getOutstandingInvoice = (): OutstandingInvoice | null => {
    if (!selected) return null;

    return {
      invoiceNumber: selected.invoiceNumber,
      customerName: selected.customerName,
      phone: selected.phone,
      address: selected.address,
      references: selected.references,
      totalAmount: selected.totalAmount,
      paidAmount: selected.paidAmount,
      paymentMethod: selected.paymentMethod,
    };
  };

  /* ----------------------------- Step 3: Outstanding Invoice ----------------------------- */

  const handleShowOutstandingInvoice = (
    invoice: OutstandingInvoice,
    payment: OutstandingPayment,
    receiptNo: string,
  ) => {
    showDialog({
      title: "Outstanding Invoice",
      width: 600,
      showHeader: false,
      closeOnEscape: true,
      closeOnBackdrop: true,
      content: (
        <OutstandingInvoiceModal
          invoice={invoice}
          payment={payment}
          receiptNo={receiptNo}
          onPrint={() => window.print()}
          onDownloadPdf={() => {
            // Connect your PDF download implementation here.
            window.print();
          }}
        />
      ),
    });
  };

  /* ----------------------------- Step 2: Outstanding Receipt ----------------------------- */

  const handleGenerateOutstanding = (
    invoice: OutstandingInvoice,
    payment: OutstandingPayment,
  ) => {
    const receiptNo = `OUT-${Date.now()}`;

    showDialog({
      title: "Outstanding Receipt",
      width: 520,
      showHeader: true,
      closeOnEscape: true,
      closeOnBackdrop: true,
      content: (
        <OutstandingReceiptModal
          invoice={invoice}
          payment={payment}
          receiptNo={receiptNo}
          onPrint={() =>
            handleShowOutstandingInvoice(invoice, payment, receiptNo)
          }
        />
      ),
    });
  };

  /* ----------------------------- Step 1: Collect Outstanding ----------------------------- */

  const handleCollectOutstanding = () => {
    const invoice = getOutstandingInvoice();

    if (!invoice) return;

    const dueAmount = Math.max(0, invoice.totalAmount - invoice.paidAmount);

    if (dueAmount <= 0) {
      alert("This invoice has no outstanding amount.");
      return;
    }

    showDialog({
      title: "Collect Outstanding",
      width: 520,
      showHeader: true,
      closeOnEscape: true,
      closeOnBackdrop: true,
      content: (
        <CollectOutstandingModal
          invoice={invoice}
          onClose={closeDialog}
          onGenerate={(payment) => handleGenerateOutstanding(invoice, payment)}
        />
      ),
    });
  };

  /* ----------------------------- Selection & Search ----------------------------- */

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

  /* ----------------------------- UI ----------------------------- */

  return (
    <div className="px-4 py-4">
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
            <p className="mb-2 text-xs text-gray-500">Today's Invoice</p>

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

                <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
                  <div className="flex flex-col space-y-1.5">
                    <Field label="Invoice number">
                      {selected.invoiceNumber}
                    </Field>
                    <Field label="Date">{selected.date}</Field>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <ReusableButton
                      type="button"
                      title="Apply Return"
                      variant="primary"
                      size="sm"
                      className="w-auto"
                      onClick={handleApplyReturn}
                    />

                    <ReusableButton
                      type="button"
                      title="Collect Outstanding"
                      variant="primary"
                      size="sm"
                      className="w-auto"
                      onClick={handleCollectOutstanding}
                    />
                  </div>
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

/* ----------------------------- Empty State ----------------------------- */

const EmptyState = ({ message }: { message: string }) => (
  <div className="rounded border border-gray-200 bg-white py-12 text-center text-sm text-gray-400">
    {message}
  </div>
);

export default InvoiceHistory;
