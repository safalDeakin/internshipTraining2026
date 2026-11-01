import { useState } from "react";
import { Loader2, UserRound } from "lucide-react";
import type { PaymentMethod } from "../../../shared/components/reuse/PaymentMethodFields";

import FormFrame from "../../../shared/components/forms/FormFrame";
import PaymentMethodFields from "../../../shared/components/reuse/PaymentMethodFields";
import type { PaymentCard, PaymentFormProps } from "../types/PaymentTypes";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import PaymentReceipt from "./PaymentReceipt";

const PaymentForm = ({ customer, onCancel }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(0);

  const total = Number(customer.payment || 0);
  const serviceCharge = 0;
  const vatAmount = 0;
  const grandTotal = total + vatAmount + serviceCharge;
  const remainingAmount = 82;
  const invoiceCount = customer.invoice?.length || 1;
  const invoiceAmount = Math.round(total / invoiceCount);

  const initials = (customer.name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter(
      (_: string, index: number, arr: string[]) =>
        index === 0 || index === arr.length - 1,
    )
    .map((part: any) => part[0])
    .join("")
    .toUpperCase();
  const handleGenerate = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to generate payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <PaymentReceipt
        customer={customer}
        total={total}
        paymentMethod={paymentMethod}
        receivedAmount={receivedAmount}
        vatAmount={vatAmount}
        serviceCharge={serviceCharge}
        grandTotal={grandTotal}
        onClose={onCancel}
      />
    );
  }

  return (
    <FormFrame
      title="Payment"
      onClose={onCancel}
      className="min-h-[420px]"
      footer={
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={15} className="animate-spin" />}
            {isSubmitting ? <LoadingOverlay /> : "Generate"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full rounded-md border border-gray-300 bg-white py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="mb-4 flex items-center gap-2">
        {customer.image ? (
          <img
            src={customer.image}
            alt={customer.name || "Customer"}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-medium text-white">
            {initials || <UserRound size={18} />}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-gray-800">
            {customer.name}
          </p>
          <p className="text-[10px] text-gray-500">{customer.number}</p>
        </div>

        <p className="text-[10px] text-gray-500">
          {customer.email || "no mail"}
        </p>
      </div>

      <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-800">
        <span>Items</span>
        <span>Paid Amount</span>
      </div>

      <div className="space-y-2">
        {(customer.invoice || []).map((invoice: any) => (
          <div
            key={invoice}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <span className="truncate text-gray-700">Invoice #{invoice}</span>
            <span className="shrink-0 text-gray-700">Rs {invoiceAmount}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-300 pt-2">
        <span className="text-sm font-bold text-gray-900">Total</span>
        <span className="text-sm text-orange-600">Rs {total}</span>
      </div>

      <div className="mt-5 text-xs text-gray-900">
        Remaining Amount: Rs. {remainingAmount.toFixed(2)}
      </div>

      <div className="mt-4">
        <PaymentMethodFields
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          receivedAmount={receivedAmount}
          setReceivedAmount={setReceivedAmount}
        />
      </div>
    </FormFrame>
  );
};

export default PaymentForm;
