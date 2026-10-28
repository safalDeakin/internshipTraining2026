import { useState } from "react";
import { CreditCard, UserRound } from "lucide-react";
import type { Cards } from "../../steps/PaymentLayout";
import LoadingOverlay from "../LoadingOverlay";
import PaymentReceipt from "./PaymentReceipt";
import PaymentMethodFields, {
  type PaymentMethod,
} from "../PaymentMethodFields";

interface PaymentFormProps {
  customer: Cards;
  onCancel: () => void;
}

const PaymentForm = ({ customer, onCancel }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [isSubmitting, setIsSubmitting] = useState(false); //order is currently being submitted.
  const [submitted, setSubmitted] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const total = Number(customer.payment || 0);
  const remainingAmount = 82;

  const initials = (customer.name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((_, index, arr) => index === 0 || index === arr.length - 1)
    .join("")
    .toUpperCase();

  const handleGenerate = async () => {
    // console.log("Payment generated:", {
    //   customer: customer.name,
    //   invoice: customer.invoice,
    //   total,
    //   paymentMethod,
    // });
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitted && !isSubmitting) {
    return (
      <PaymentReceipt
        customer={customer}
        total={total}
        paymentMethod={paymentMethod}
        receivedAmount={receivedAmount}
        onClose={onCancel}
      />
    );
  }
  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-800">Payment</h2>

      {/* Customer details */}
      <div className="mb-4 flex items-center gap-2">
        {customer.image ? (
          <img
            src={customer.image}
            alt={customer.name}
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

      {/* Items header */}
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-800">
        <span>Items</span>
        <span>Paid Amount</span>
      </div>

      {/* Invoice list */}
      <div className="space-y-2">
        {(customer.invoice || []).map((invoice, index) => (
          <div
            key={invoice}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <span className="truncate text-gray-700">Invoice #{invoice}</span>
            <span className="shrink-0 text-gray-700">
              Rs {Math.round(total / (customer.invoice?.length || 1))}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-300 pt-2">
        <span className="text-sm font-bold text-gray-900">Total</span>
        <span className="text-sm text-orange-600">Rs {total}</span>
      </div>

      {/* Remaining amount */}
      <div className="mt-5 text-xs text-gray-900">
        Remaining Amount: Rs. ${remainingAmount.toFixed(2)}
      </div>

      {/* Payment method */}

      <PaymentMethodFields
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        receivedAmount={receivedAmount}
        setReceivedAmount={setReceivedAmount}
      />
      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2 pt-6">
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full rounded-md bg-orange-500 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          Generate
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-md border border-gray-300 bg-white py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>

      {isSubmitting && <LoadingOverlay />}
      {submitted && (
        <>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsa
          ab quos perspiciatis porro consectetur, ea, et eaque veritatis tempore
          ullam odit quam voluptas iure obcaecati assumenda esse a explicabo?
        </>
      )}
    </div>
  );
};

export default PaymentForm;
