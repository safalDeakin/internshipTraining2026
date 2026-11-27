import type { ReactNode } from "react";

import type { InvoiceHistoryProps } from "../../types/InvoiceTypes";

import HistoryHeader from "../../shared/history/HistoryHeader";
import TableView from "../../shared/history/TableView";
import ReferenceDetailsModal from "../../modal/ReferenceDetailsModals";

import useInvoiceHistory from "../../hooks/useInvoiceHistory";
import useDialogBox from "../../../lib/component/DialogueBox/useDialogueBox";

import ApplyReturnModal from "../../modal/ApplyReturnModal";
import PaymentForm from "../forms/PaymentForm";
import PaymentReceipt from "../receipts/PaymentReceipt";

import ReusableButton from "../../shared/components/ReusableButton";
import { ArrowDown, ReceiptText } from "lucide-react";

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

const InvoiceHistory = ({ onBack }: InvoiceHistoryProps) => {
  const {
    filtered,
    loading,
    selected,
    selectedCards,
    viewMode,
    setViewMode,
    query,
    handleSearch,
    activeReference,
    handleReferenceClick,
    closeReferenceDetails,
    summary,
    columns,
    rows,
    handleSelectInvoice,
  } = useInvoiceHistory();

  const { showDialog, closeDialog } = useDialogBox();

  // Apply Return
  const handleApplyReturn = () => {
    if (!selected) {
      alert("Please select a customer first.");
      return;
    }

    showDialog({
      title: "Apply Return",
      content: (
        <ApplyReturnModal
          invoice={{
            invoiceNumber: selected.references[0] ?? "N/A",
            customerName: selected.customerName,
            phone: selected.phone,
            date: new Date().toLocaleDateString("en-GB"),
            totalAmount: 5000,
            items: selected.cards.flatMap((card) =>
              card.invoiceItems.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                amount: item.amount,
              })),
            ),
          }}
          onSubmit={(request) => {
            console.log("Return request:", request);
          }}
        />
      ),
    });
  };

  // Collect Outstanding
  const handleCollectOutstanding = () => {
    if (!selected) {
      alert("Please select a customer first.");
      return;
    }

    const outstanding = selected.cards.reduce(
      (total, card) =>
        total +
        card.invoiceItems.reduce((sum, item) => sum + Number(item.amount), 0),
      0,
    );

    showDialog({
      title: "Collect Outstanding",
      content: (
        <PaymentForm
          customer={{
            name: selected.customerName,
            number: selected.phone,
            email: "",
            payment: String(outstanding),
            invoice: selected.references,
          }}
          onCancel={() => closeDialog()}
        />
      ),
    });
  };

  // Billing Receipt - includes all references for selected customer
  const handleBillingReceipt = () => {
    if (!selected) return;

    const items = selected.cards.flatMap((card) =>
      card.invoiceItems.map((item) => ({
        name: item.name,
        quantity: Number(item.quantity),
        amount: Number(item.amount),
      })),
    );

    const total = items.reduce((sum, item) => sum + item.amount, 0);

    showDialog({
      title: "Billing Receipt",
      showHeader: true,
      content: (
        <PaymentReceipt
          customer={{
            name: selected.customerName,
            number: selected.phone,
            invoice: selected.references,
            items,
          }}
          total={total}
          paymentMethod="Cash"
          receivedAmount={total}
          vatAmount={0}
          serviceCharge={0}
          grandTotal={total}
          receivedBy="XYZ"
          onClose={() => closeDialog()}
        />
      ),
    });
  };

  return (
    <div className="px-4 py-4">
      <HistoryHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onBack={onBack}
      />

      {loading ? (
        <p className="py-10 text-center text-sm text-gray-400">
          Loading customer history...
        </p>
      ) : viewMode === "table" ? (
        <div className="mt-5">
          {filtered.length > 0 ? (
            <TableView summary={summary} columns={columns} rows={rows} />
          ) : (
            <EmptyState message="No customer records found" />
          )}
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-6 lg:flex-row">
          {/* Customer List */}
          <aside className="w-full shrink-0 lg:w-64">
            <p className="mb-2 text-xs text-gray-500">
              {filtered.length} customers
            </p>

            <input
              value={query}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search customer or reference"
              className="mb-3 w-full rounded border border-gray-300 px-3 py-2 text-xs outline-none focus:border-blue-400"
            />

            <ul className="space-y-1">
              {filtered.map((customer) => (
                <li key={customer.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectInvoice(customer.id)}
                    className={`w-full rounded border px-3 py-2 text-left transition ${
                      customer.id === selected?.id
                        ? "border-blue-400 bg-blue-50"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <p className="text-xs font-medium text-gray-800">
                      {customer.customerName}
                    </p>

                    <p className="text-[10px] text-gray-500">
                      Phone: {customer.phone}
                    </p>

                    <p className="text-[10px] text-gray-500">
                      {customer.cards.length} reference(s)
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500">
                      {customer.references.join(", ")}
                    </p>
                  </button>
                </li>
              ))}
            </ul>

            {filtered.length === 0 && (
              <p className="py-6 text-center text-xs text-gray-400">
                No customers found
              </p>
            )}
          </aside>

          {/* Customer Details */}
          <main className="min-w-0 flex-1">
            {selected ? (
              <div className="rounded border border-gray-200 bg-white px-5 py-6 sm:px-8">
                <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
                  Invoice History
                </h2>

                <Section title="Customer Information">
                  <Field label="Customer name">{selected.customerName}</Field>
                  <Field label="Phone number">{selected.phone}</Field>
                </Section>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <ReusableButton
                    variant="primary"
                    size="sm"
                    icon={<ArrowDown size={14} />}
                    onClick={handleApplyReturn}
                  >
                    Apply return
                  </ReusableButton>

                  <ReusableButton
                    variant="primary"
                    size="sm"
                    icon={<ArrowDown size={14} />}
                    onClick={handleCollectOutstanding}
                  >
                    Collect Outstanding
                  </ReusableButton>
                </div>

                {/* Billing References */}
                <Section title="Billing References">
                  <div className="flex flex-wrap gap-3">
                    {selected.cards.map((card) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleReferenceClick(card.reference)}
                        className="border border-gray-200 px-3 py-2 text-xs text-blue-600 transition hover:bg-gray-50"
                      >
                        {card.reference}
                        <span className="ml-2 text-gray-500">
                          ({card.type})
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* One Billing Receipt Button */}
                  <div className="mt-4">
                    <ReusableButton
                      variant="primary"
                      size="sm"
                      icon={<ReceiptText size={14} />}
                      onClick={handleBillingReceipt}
                    >
                      Billing Receipt
                    </ReusableButton>
                  </div>
                </Section>

                {/* Reference Summary */}
                <Section title="Reference Summary">
                  <Field label="Total references">{selectedCards.length}</Field>

                  <Field label="KOT">
                    {selectedCards.filter((card) => card.type === "KOT").length}
                  </Field>

                  <Field label="BOT">
                    {selectedCards.filter((card) => card.type === "BOT").length}
                  </Field>

                  <Field label="Reservations">
                    {
                      selectedCards.filter(
                        (card) => card.type === "Reservation",
                      ).length
                    }
                  </Field>
                </Section>
              </div>
            ) : (
              <EmptyState message="Select a customer to view their history" />
            )}
          </main>
        </div>
      )}

      {/* Existing Reference Details Modal */}
      {activeReference && (
        <ReferenceDetailsModal
          invoice={activeReference}
          onClose={closeReferenceDetails}
        />
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
