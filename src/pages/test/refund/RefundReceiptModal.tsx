// author: shrajja
import { useEffect } from "react";
import { X } from "lucide-react";
import type { RefundReceiptModalProps } from "./types/RefundTypes";

// Label / value row (justify-between)
const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);

const RefundReceiptModal = ({
  open,
  onClose,
  data,
}: RefundReceiptModalProps) => {
  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !data) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Refund Receipt</h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* REFUND DETAILS */}
        <div className="mt-5 space-y-3 border-b border-dashed border-gray-300 pb-4">
          <Row label="Refund Number" value={data.refundNumber} />
          <Row label="Invoice Number" value={data.invoiceNumber} />
          <Row label="Date & Time" value={data.dateTime} />
          <Row label="Processed By" value={data.processedBy} />
        </div>

        {/* ITEMS */}
        <div className="border-b border-dashed border-gray-300 py-4">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold text-gray-700">
            <span className="flex-1">Item</span>
            <span className="w-16 text-center">Quantity</span>
            <span className="w-24 text-right">Refund Amt</span>
          </div>

          <div className="space-y-2">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm text-gray-800"
              >
                <span className="flex-1">{item.name}</span>
                <span className="w-16 text-center">{item.quantity}</span>
                <span className="w-24 text-right">
                  Rs. {item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL + METHOD */}
        <div className="space-y-3 py-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-gray-700">
              Total Refund Amount
            </span>
            <span className="text-base font-bold text-gray-900">
              Rs. {data.totalAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-gray-500">Refund Method</span>
            <span className="text-sm font-medium text-gray-800">
              {data.refundMethod}
            </span>
          </div>
        </div>

        {/* THANK YOU */}
        <div className="border-t border-dashed border-gray-300 pt-4 text-center">
          <h4 className="text-sm font-semibold text-gray-900">Thank You</h4>
          <p className="mt-1 text-xs text-gray-500">
            We hope to serve you again
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundReceiptModal;
