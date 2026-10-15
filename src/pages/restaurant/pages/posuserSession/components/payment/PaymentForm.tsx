import { useState } from "react";
import { CreditCard, UserRound } from "lucide-react";
import type { Cards } from "../../steps/PaymentLayout";
import LoadingOverlay from "../LoadingOverlay";
import PaymentReceipt from "./PaymentReceipt";

interface PaymentFormProps {
  customer: Cards;
  onCancel: () => void;
}

const PaymentForm = ({ customer, onCancel }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
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
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-1 pl-7 pr-2 text-xs outline-none focus:border-blue-500"
          >
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
            <option value="Banking">Mobile Banking</option>
            <option value="Digital">Digital Card</option>
          </select>
        </div>
        {/* Cash */}
        {paymentMethod === "Cash" && (
          <div className="bg-blue-50 p-5 rounded-lg flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 ">Payer</label>
              <input
                className=" text-sm border border-gray-300 rounded-lg p-2 focus:outline-none"
                placeholder="Samir Blon"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Received Amount</label>
              <input
                type="number"
                value={receivedAmount || ""}
                onChange={(e) => setReceivedAmount(Number(e.target.value))}
                className="text-sm border border-gray-300 rounded-lg p-2 focus:outline-none"
                placeholder="Enter Amount"
              />
            </div>
          </div>
        )}
        {/* Cheque */}
        {paymentMethod === "Cheque" && (
          <div className="flex flex-col gap-3 rounded-lg bg-blue-50 p-4">
            {/* Bank Name */}
            <div className="flex w-full flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Bank Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="Enter bank name"
              />
            </div>

            <div className="flex w-full gap-3">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Cheque Number
                </label>
                <input
                  type="text"
                  className="w-full min-w-0 rounded-lg border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Enter cheque number"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Cheque Date
                </label>
                <input
                  type="date"
                  className="w-full min-w-0 rounded-lg border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
        {/* Mobile banking */}
        {paymentMethod === "Banking" && (
          <div className="bg-blue-50 p-5 rounded-lg flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 ">Bank Name</label>
              <input
                className="text-sm border border-gray-300 rounded-lg p-2 focus:outline-none"
                placeholder="Bank NAme"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Account number</label>
              <input
                className="text-sm border border-gray-300 rounded-lg p-2 focus:outline-none"
                placeholder="Enter Amount"
              />
            </div>
          </div>
        )}
        {/* Digital */}
        {paymentMethod === "Digital" && (
          <div className="bg-blue-50 p-5 rounded-lg flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 ">Payment Provider</label>
              <input
                className="text-sm border border-gray-300 rounded-lg p-2 focus:outline-none "
                placeholder="E-sewa"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Transaction Id</label>
              <input
                className="text-sm border border-gray-300 rounded-lg p-2 focus:outline-none text-black"
                placeholder="00000000"
              />
            </div>
          </div>
        )}
      </div>

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
