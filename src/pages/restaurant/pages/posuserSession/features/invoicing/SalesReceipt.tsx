import { useState } from "react";
import { Printer, Download, HandCoins } from "lucide-react";
import FormFrame from "../../shared/components/forms/FormFrame";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import StatusOverlay from "../../shared/components/StatusOverlay";

interface SalesReceiptProps {
  invoice: {
    receiptNo: string;
    customerName: string;
    phone: string;
    references: string[];
    items: {
      name: string;
      quantity: number;
      amount: number;
    }[];
    totalAmount: number;
    paidAmount: number;
    paymentMethod: string;
    subtotal?: number;
    vat?: number;
    service?: number;
    dueDate?: string;
  };
  onClose: () => void;
}

const SalesReceipt = ({ invoice, onClose }: SalesReceiptProps) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  const today = new Date().toLocaleDateString("en-CA").replace(/-/g, "/");

  const handlePrint = () => {
    if (isPrinting) return;

    setIsPrinting(true);
    setPrintSuccess(false);

    setTimeout(() => {
      setIsPrinting(false);
      setPrintSuccess(true);

      setTimeout(() => setPrintSuccess(false), 3000);
    }, 1000);
  };

  return (
    <FormFrame
      title=""
      onClose={onClose}
      className="max-h-[90vh]"
      footer={
        <div className="flex flex-col gap-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            <Printer size={14} />
            {isPrinting ? "Preparing..." : "Print Invoice"}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      }
    >
      <div
        id="invoicing-receipt-print-area"
        className="mx-auto w-full max-w-md space-y-3 text-xs"
      >
        <div className="text-center">
          <p className="text-sm font-semibold">VIP Restaurant</p>
          <p>Banepa-07, Kavre</p>
          <p>01-11111111</p>
        </div>

        <p className="text-right text-gray-500">
          Receipt ID:{" "}
          <span className="font-semibold text-gray-800">
            {invoice.receiptNo}
          </span>
        </p>

        <div className="flex justify-between border-b border-gray-200 pb-3 text-gray-500">
          <p>
            Date: <span className="text-gray-800">{today}</span>
          </p>
          <p>
            No:{" "}
            <span className="text-gray-800">
              {invoice.references[0] || "-"}
            </span>
          </p>
        </div>

        <h3 className="pt-2 text-sm font-semibold">Customer Information</h3>

        <p>
          Customer: <b>{invoice.customerName}</b>
        </p>
        <p>
          Number: <b>{invoice.phone}</b>
        </p>
        <p>
          Reference Numbers: <b>{invoice.references.join(", ") || "-"}</b>
        </p>

        <table className="mt-3 w-full border-b border-gray-300 text-left">
          <thead>
            <tr className="border-b border-gray-200 font-semibold">
              <th className="py-2">S.No.</th>
              <th>Items</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item, index) => (
              <tr
                key={`${item.name}-${index}`}
                className="border-b border-gray-100"
              >
                <td className="py-2">{index + 1}</td>
                <td>{item.name}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">Rs {item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-2 pt-2">
          {invoice.subtotal !== undefined && (
            <Row label="Subtotal" value={`Rs ${invoice.subtotal.toFixed(2)}`} />
          )}

          {invoice.vat !== undefined && (
            <Row label="Tax (13% VAT)" value={`Rs ${invoice.vat.toFixed(2)}`} />
          )}

          {invoice.service !== undefined && (
            <Row
              label="10% Service Charge"
              value={`Rs ${invoice.service.toFixed(2)}`}
            />
          )}

          <div className="flex justify-between border-t border-gray-300 pt-3 text-sm font-bold">
            <span>Total Amount</span>
            <span className="text-orange-600">
              Rs {invoice.totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-2">
            <Row
              label="Amount Received"
              value={`Rs ${invoice.paidAmount.toFixed(2)}`}
            />

            <Row
              label="Remaining Amount"
              value={`Rs ${Math.max(
                invoice.totalAmount - invoice.paidAmount,
                0,
              ).toFixed(2)}`}
            />

            {invoice.dueDate && (
              <Row label="Due Date" value={invoice.dueDate} />
            )}
          </div>
        </div>

        <p className="pt-3 text-center font-medium">Thank You!</p>
      </div>

      {isPrinting && <LoadingOverlay />}

      {printSuccess && (
        <StatusOverlay
          show={printSuccess}
          icon={<HandCoins className="h-16 w-16 text-blue-500" />}
          title="Receipt Ready!"
        />
      )}
    </FormFrame>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-3">
    <span>{label}</span>
    <span className="text-right">{value}</span>
  </div>
);

export default SalesReceipt;
