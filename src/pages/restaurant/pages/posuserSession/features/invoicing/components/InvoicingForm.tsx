import { useEffect, useMemo, useState } from "react";
import { Download, Printer, X } from "lucide-react";

import type { InvoiceCards, InvoicingFormProps } from "../types/InvoiceTypes";
import type { PaymentMethod } from "../../../shared/components/reuse/PaymentMethodFields";

import FormFrame from "../../../shared/components/forms/FormFrame";
import PaymentMethodFields from "../../../shared/components/reuse/PaymentMethodFields";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import ReusableButton from "../../../shared/components/reuse/ReusableButton";
import PhoneInput from "../../../shared/components/reuse/PhoneInput";
import SalesReceipt from "./SalesReceipt";

const inputClass =
  "h-9 w-full bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

const InvoicingForm = ({
  customers,
  onRemove,
  onClose,
  onGenerate,
  onSplit,
}: InvoicingFormProps) => {
  const [guest, setGuest] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");

  const [receivedAmount, setReceivedAmount] = useState(0);

  const [extraPayments, setExtraPayments] = useState<
    { id: number; method: PaymentMethod; amount: number }[]
  >([]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const isProcessing = isGenerating || isSplitting;

  const today = new Date().toLocaleDateString("en-CA");

  // Prefill customer details
  const primary = customers[0];

  useEffect(() => {
    if (primary) {
      setGuest(primary.name);
      setPhone(primary.number);
    } else {
      setGuest("");
      setPhone("");
    }
  }, [primary?.id]);

  // Combine invoice items
  const rows = useMemo(
    () =>
      customers.flatMap((customer) =>
        customer.invoiceItems.map((item) => ({
          ...item,
          key: `${customer.id}-${item.id}`,
        })),
      ),
    [customers],
  );

  // Calculate subtotal
  const subtotal = useMemo(
    () => rows.reduce((sum, item) => sum + item.amount, 0),
    [rows],
  );

  // Add another payment method
  const addPayment = () => {
    setExtraPayments((prev) => [
      ...prev,
      {
        id: Date.now(),
        method: "Cash",
        amount: 0,
      },
    ]);
  };

  // Update additional payment
  const updatePayment = (
    id: number,
    patch: Partial<{
      method: PaymentMethod;
      amount: number;
    }>,
  ) => {
    setExtraPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, ...patch } : payment,
      ),
    );
  };

  // Receipt payment methods
  const receiptPaymentMethod = [
    ...(receivedAmount > 0 ? [paymentMethod] : []),
    ...extraPayments
      .filter((payment) => payment.amount > 0)
      .map((payment) => payment.method),
  ].join(", ");

  // Generate sales receipt
  const handleGenerate = async () => {
    if (isProcessing || customers.length === 0) return;

    setIsGenerating(true);

    try {
      onGenerate?.({
        guest,
        phone,
        references: customers.map((customer) => customer.reference),
        total: subtotal,
      });

      // Replace with your actual API request.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowReceipt(true);
    } catch (error) {
      console.error("Failed to generate invoice:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Split bill
  const handleSplit = async () => {
    if (isProcessing || customers.length === 0 || !onSplit) return;

    setIsSplitting(true);

    try {
      // Replace with your actual split bill API request.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      onSplit();
    } catch (error) {
      console.error("Failed to split bill:", error);
    } finally {
      setIsSplitting(false);
    }
  };

  // Sales receipt view
  if (showReceipt) {
    return (
      <SalesReceipt
        invoice={{
          receiptNo: `INV-${Date.now()}`,
          customerName: guest,
          phone,
          references: customers.map((customer) => customer.reference),
          items: rows.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            amount: item.amount,
          })),
          subtotal,
          vat: 0,
          service: 0,
          totalAmount: subtotal,
          paidAmount: receivedAmount,
          paymentMethod: receiptPaymentMethod || "Not selected",
          dueDate: "Not set",
        }}
      />
    );
  }

  return (
    <FormFrame
      title="Invoice"
      description={`Date: ${today}`}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2">
          <ReusableButton
            title="Generate Sales Receipt"
            variant="primary"
            size="md"
            type="button"
            onClick={handleGenerate}
            disabled={isProcessing || customers.length === 0}
            icon={<Download size={16} />}
            className="w-full"
          />

          <ReusableButton
            title="Split Bill"
            variant="primary"
            size="md"
            type="button"
            onClick={handleSplit}
            disabled={isProcessing || customers.length === 0 || !onSplit}
            icon={<Download size={16} />}
            className="w-full"
          />
        </div>
      }
    >
      {/* Customer Billing Info */}
      <h3 className="mb-2 text-xs font-semibold text-gray-800">
        Customer Billing Info
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="guest-name" className="text-[11px] font-medium">
            Guest Name
          </label>

          <input
            id="guest-name"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            placeholder="Full Name"
            className={inputClass}
          />
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Mobile Number</label>
          <PhoneInput />
        </div>
      </div>

      {/* Reference Numbers */}
      <div className="mt-3 rounded-lg border border-gray-300 p-3">
        <p className="mb-2 text-xs font-semibold text-gray-800">
          Reference Number
        </p>

        <div className="flex flex-wrap gap-2">
          {customers.map((customer) => (
            <span
              key={customer.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {customer.reference}

              <button
                type="button"
                onClick={() => onRemove(customer.id)}
                aria-label={`Remove ${customer.reference}`}
                className="rounded-full p-0.5 hover:bg-blue-200"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-300 font-semibold text-gray-800">
              <th className="py-2">S.No.</th>
              <th>Items</th>
              <th className="text-center">Quantity</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item, index) => (
              <tr key={item.key} className="text-gray-700">
                <td className="py-2">{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-center">{item.quantity} Unit</td>
                <td className="text-right">Rs {item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Amount Summary */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-300 pt-3">
        <span className="text-sm font-medium text-gray-700">Subtotal</span>

        <span className="text-sm font-semibold text-gray-800">
          Rs {subtotal.toFixed(2)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-gray-300 pt-3">
        <span className="text-sm font-bold text-gray-900">Total Amount</span>

        <span className="text-sm font-bold text-orange-600">
          Rs {subtotal.toFixed(2)}
        </span>
      </div>

      {/* Print Sample */}
      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
      >
        <Printer size={16} />
        Print Sample
      </button>

      {/* Primary Payment Method */}
      <PaymentMethodFields
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        receivedAmount={receivedAmount}
        setReceivedAmount={setReceivedAmount}
      />

      {/* Additional Payment Methods */}
      {extraPayments.map((payment) => (
        <PaymentMethodFields
          key={payment.id}
          paymentMethod={payment.method}
          setPaymentMethod={(method) => updatePayment(payment.id, { method })}
          receivedAmount={payment.amount}
          setReceivedAmount={(amount) => updatePayment(payment.id, { amount })}
        />
      ))}

      {/* Add Payment */}
      <div className="mt-3 flex flex-col items-start gap-1">
        <button
          type="button"
          onClick={addPayment}
          className="text-sm italic underline"
        >
          Add Another payment method
        </button>

        <p className="text-sm text-gray-500">or add on A/C</p>
      </div>

      {/* Loading Overlay */}
      {isProcessing && <LoadingOverlay />}
    </FormFrame>
  );
};

export default InvoicingForm;
