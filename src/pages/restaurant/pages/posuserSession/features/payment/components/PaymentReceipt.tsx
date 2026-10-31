import { Printer, Download, HandCoins } from "lucide-react";
import type { Cards } from "../../stepslayout/PaymentLayout";
import { useState } from "react";
import FormFrame from "../../shared/components/forms/FormFrame";
import LoadingOverlay from "../../shared/components/LoadingOverlay";
import StatusOverlay from "../../shared/components/StatusOverlay";

interface PaymentReceiptProps {
  customer: Cards;
  total: number;
  paymentMethod: string;
  receivedAmount: number;
  receivedBy?: string;
  onClose: () => void;
}

const PaymentReceipt = ({
  customer,
  total,
  paymentMethod,
  receivedAmount,
  receivedBy = "XYZ",
  onClose,
}: PaymentReceiptProps) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const invoices = customer.invoice || [];
  const perInvoice = Math.round(total / (invoices.length || 1));
  const vat = +(total * 0.13).toFixed(2);
  const service = +(total * 0.1).toFixed(2);
  const grandTotal = total + vat + service;

  const today = new Date().toLocaleDateString("en-CA").replace(/-/g, "/");
  const receiptId = `#R_${Math.floor(Math.random() * 900 + 100)}`;

  const handlePrint = () => {
    if (isPrinting) return;

    setIsPrinting(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsPrinting(false);
      setPaymentSuccess(true);

      // Connect actual printing here.
      // window.print();

      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <FormFrame
      title=" "
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2 text-xs font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            <Printer size={14} />
            {isPrinting ? "Preparing..." : "Print Invoice"}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      }
    >
      {/* Printable receipt */}
      <div id="receipt-print-area" className="text-xs">
        <div className="text-center">
          <p className="text-sm font-semibold">VIP Restaurant</p>
          <p>Banepa-07, Kavre</p>
          <p>01-11111111</p>
        </div>

        <p className="text-right text-gray-400">
          Receipt ID: <span className="text-gray-800">567</span>
        </p>

        <div className="mt-3 flex justify-between text-gray-500">
          <p>
            No: <span className="text-black">{receiptId}</span>
          </p>
          <p>
            Date: <span className="text-black">{today}</span>
          </p>
        </div>

        <h3 className="mt-4 text-lg font-semibold">Payment Details</h3>

        <p>
          Payment Method: <b>{paymentMethod}</b>
        </p>

        <p>
          Payment Note:{" "}
          <b>{receivedAmount < grandTotal ? "Partially paid" : "Fully paid"}</b>
        </p>

        <h3 className="mt-4 text-sm font-semibold">Customer Information</h3>

        <p>
          Customer: <b>{customer.name}</b>
        </p>

        <div className="flex justify-between">
          <p>
            Number: <b>{customer.number}</b>
          </p>
          <p>
            Location: <b>No location</b>
          </p>
        </div>

        <table className="mt-4 w-full border-b border-gray-300 text-left">
          <thead>
            <tr className="font-semibold">
              <th className="py-1">S.No.</th>
              <th>Invoice Number</th>
              <th>Paid Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={invoice}>
                <td className="py-1">{index + 1}</td>
                <td>{invoice}</td>
                <td>Rs {perInvoice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 space-y-1 pt-2">
          <div className="border-b border-gray-300">
            <Row label="Subtotal" value={`Rs ${total}`} />
          </div>

          <Row label="Tax (13% VAT)" value={`Rs ${vat}`} />
          <Row label="10% Service Charge" value={`Rs ${service}`} />

          <div className="mt-4 flex justify-between border-t border-gray-300 pt-2 text-sm font-bold">
            <span>Total Amount</span>
            <span className="text-orange-600">Rs {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <p className="mt-3">Received Amount: Rs {receivedAmount.toFixed(2)}</p>
        <p>Received By: {receivedBy}</p>

        <p className="mt-3 text-center font-medium">Thank You!</p>
      </div>

      {isPrinting && <LoadingOverlay />}

      {paymentSuccess && (
        <StatusOverlay
          show={paymentSuccess}
          icon={<HandCoins className="h-16 w-16 text-blue-500" />}
          title="Payment Successful!"
        />
      )}
    </FormFrame>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default PaymentReceipt;
