import { CreditCard } from "lucide-react";
import { useState } from "react";

export type PaymentMethod = "Cash" | "Cheque" | "Banking" | "Digital";

interface PaymentMethodFieldsProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  receivedAmount: number;
  setReceivedAmount: (amount: number) => void;
}

const PaymentMethodFields = ({
  paymentMethod,
  setPaymentMethod,
  receivedAmount,
  setReceivedAmount,
}: PaymentMethodFieldsProps) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:outline-none";

  const labelClass = "text-sm font-medium text-gray-600";

  return (
    <div className="mt-2">
      <label
        htmlFor="payment-method"
        className="mb-1 block text-xs font-bold text-gray-800"
      >
        Payment
      </label>

      <div className="relative">
        <CreditCard
          size={13}
          className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-600"
        />

        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value as PaymentMethod);
            setShowPaymentForm(true);
          }}
          className="w-full rounded-md border border-gray-300 bg-white py-1 pl-7 pr-2 text-xs outline-none focus:border-blue-500"
        >
          <option value="Cash">Cash</option>
          <option value="Cheque">Cheque</option>
          <option value="Banking">Mobile Banking</option>
          <option value="Digital">Digital Card</option>
        </select>
      </div>

      {/* Cash */}
      {showPaymentForm && paymentMethod === "Cash" && (
        <div className="mt-2 flex flex-col gap-2 rounded-lg bg-blue-50 p-5">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Payer</label>
            <input className={inputClass} placeholder="Samir Blon" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Received Amount</label>
            <input
              type="number"
              min="0"
              value={receivedAmount || ""}
              onChange={(e) => setReceivedAmount(Number(e.target.value))}
              className={inputClass}
              placeholder="Enter amount"
            />
          </div>
        </div>
      )}

      {/* Cheque */}
      {showPaymentForm && paymentMethod === "Cheque" && (
        <div className="mt-2 flex flex-col gap-3 rounded-lg bg-blue-50 p-4">
          <div className="flex w-full flex-col gap-1">
            <label className={labelClass}>Bank Name</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Enter bank name"
            />
          </div>

          <div className="flex w-full gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label className={labelClass}>Cheque Number</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Enter cheque number"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label className={labelClass}>Cheque Date</label>
              <input type="date" className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Banking */}
      {showPaymentForm && paymentMethod === "Banking" && (
        <div className="mt-2 flex flex-col gap-2 rounded-lg bg-blue-50 p-5">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Bank Name</label>
            <input className={inputClass} placeholder="Bank name" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Account Number</label>
            <input className={inputClass} placeholder="Enter account number" />
          </div>
        </div>
      )}

      {/* Digital Payment */}
      {showPaymentForm && paymentMethod === "Digital" && (
        <div className="mt-2 flex flex-col gap-2 rounded-lg bg-blue-50 p-5">
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Payment Provider</label>
            <input className={inputClass} placeholder="eSewa" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={labelClass}>Transaction ID</label>
            <input className={inputClass} placeholder="00000000" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodFields;
