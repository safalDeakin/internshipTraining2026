import { Printer, X } from "lucide-react";

interface ReceiptModalProps {
  onClose?: () => void;
  onPrintReceipt: () => void;
}

// UI only: static sample data matching the design
const receipt = {
  receiptNo: "#R_555",
  date: "2024/12/13",
  customer: "Ram Sharma",
  location: "28 Kilo, Dhulikhel",
  items: [
    { name: "Room Charge", amount: 5000 },
    { name: "Restaurant", amount: 5000 },
    { name: "Room Service", amount: 5000 },
  ],
  taxLabel: "Tax (13% Vat)",
  tax: 0,
  serviceChargeLabel: "10% Service charge",
  serviceCharge: 0,
  advance: 5000,
  received: 10000,
};

const formatCurrency = (amount: number) =>
  `Rs ${Number(amount).toLocaleString("en-IN")}`;

export default function ReceiptModal({
  onClose,
  onPrintReceipt,
}: ReceiptModalProps) {
  const subtotal = receipt.items.reduce((sum, i) => sum + i.amount, 0);
  const total = subtotal + receipt.tax + receipt.serviceCharge;

  return (
    <div className="relative w-full max-w-md bg-[#f7f7f7] p-6 text-gray-900">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-medium">Receipt</h2>
          <p className="text-sm text-gray-500">
            No:{" "}
            <span className="font-medium text-gray-900">
              {receipt.receiptNo}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Date:{" "}
            <span className="font-medium text-gray-900">{receipt.date}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-gray-800 hover:text-black"
        >
          <X size={20} />
        </button>
      </div>

      {/* Customer */}
      <div className="mt-6 space-y-2 border-t border-gray-200 pt-5 text-sm">
        <div className="grid grid-cols-[110px_1fr]">
          <span>Customer</span>
          <span className="font-medium">{receipt.customer}</span>
        </div>
        <div className="grid grid-cols-[110px_1fr]">
          <span>Location</span>
          <span className="pl-6">{receipt.location}</span>
        </div>
      </div>

      {/* Items */}
      <div className="mt-5 border-t border-gray-200 pt-4">
        <div className="flex justify-between pb-3 text-sm font-medium">
          <span>Items</span>
          <span>Amount</span>
        </div>

        <div className="border-t border-gray-200">
          {receipt.items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between border-b border-gray-200 py-3 text-xs"
            >
              <span>{item.name}</span>
              <span className="font-bold">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between py-3 text-sm font-medium">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {/* Tax */}
      <div className="space-y-3 border-t border-gray-300 py-4 text-xs">
        <div className="flex justify-between">
          <span>{receipt.taxLabel}</span>
          <span className="text-sm">{formatCurrency(receipt.tax)}</span>
        </div>
        <div className="flex justify-between">
          <span>{receipt.serviceChargeLabel}</span>
          <span className="text-sm">
            {formatCurrency(receipt.serviceCharge)}
          </span>
        </div>
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t border-gray-300 pt-4 text-sm">
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Total</span>
          <span className="text-lg font-bold">{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span>Advance Amount</span>
          <span>{formatCurrency(receipt.advance)}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span>Amount Received</span>
          <span>{formatCurrency(receipt.received)}</span>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={onPrintReceipt}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2.5 text-xs font-medium text-white transition hover:bg-orange-600 print:hidden"
      >
        <Printer size={16} />
        Print Receipt
      </button>
    </div>
  );
}
