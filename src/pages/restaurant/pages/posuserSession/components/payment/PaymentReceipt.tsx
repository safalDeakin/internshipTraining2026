import { Printer, Download, CreditCard, HandCoins } from "lucide-react";
import type { Cards } from "../../stepslayout/PaymentLayout";
import { useState } from "react";
import StatusOverlay from "../StatusOverlay";
import LoadingOverlay from "../LoadingOverlay";

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
  const [paymentSucess, setPaymentSucess] = useState(false);

  const invoices = customer.invoice || [];
  const perInvoice = Math.round(total / (invoices.length || 1));
  const vat = +(total * 0.13).toFixed(2);
  const service = +(total * 0.1).toFixed(2);
  const grandTotal = total + vat + service;
  const today = new Date().toLocaleDateString("en-CA").replace(/-/g, "/");
  const receiptId = `#R_${Math.floor(Math.random() * 900 + 100)}`; // replace with real ID from backend

  const handlePrint = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setPaymentSucess(false);
    setTimeout(() => {
      setIsPrinting(false);
      setPaymentSucess(true);
      //   window.print();
      setTimeout(() => {
        setPaymentSucess(false);
      }, 3000);
    }, 1500);
  };
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-xs shadow-sm">
      {/* Printable area */}
      <div id="receipt-print-area">
        <div className="text-center">
          <p className="text-sm font-semibold">VIP Restaurant</p>
          <p>Banepa-07, Kavre</p>
          <p>01-11111111</p>
        </div>
        <p className="text-gray-400 text-right">
          Receipt ID:<span className="text-gray-800">567</span>
        </p>
        <div className="mt-3 flex justify-between text-gray-500">
          <p>
            No:<span className="text-black">{receiptId}</span>
          </p>
          <p>
            Date:<span className="text-black"> {today}</span>
          </p>
        </div>

        <h3 className="mt-4 text-lg ">Payment Details</h3>
        <p>
          Payment Method: <b>{paymentMethod}</b>
        </p>
        <p>
          Payment Note:{" "}
          <b>{receivedAmount < grandTotal ? "Partially paid" : "Fully paid"}</b>
        </p>

        <h3 className="mt-4 text-sm font-semibold">Customer Information</h3>
        <div className="">
          <p>
            Customer: <b>{customer.name}</b>
          </p>
          <div className="flex justify-between">
            <p>
              Number: <b>{customer.number}</b>
            </p>
            <p className="">
              location: <b>nolocation</b>
            </p>
          </div>
        </div>

        <table className="mt-4 w-full text-left border-b border-gray-300">
          <thead>
            <tr className="font-semibold">
              <th className="py-1">S.No.</th>
              <th>Invoice Number</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={inv}>
                <td className="py-1">{i + 1}</td>
                <td>{inv}</td>
                <td>Rs {perInvoice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-2 space-y-1  pt-2">
          <div className="border-b border-gray-300">
            <Row label="Subtotal" value={`Rs ${total}`} />
          </div>

          <Row label="Tax (13% Vat)" value={`Rs ${vat}`} />
          <Row label="10% Service charge" value={`Rs ${service}`} />

          <div className="flex justify-between text-sm font-bold mt-4 border-t border-gray-300">
            <span>Total Amount</span>
            <span className="text-orange-600">Rs {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <p className="mt-3">Received Amount: Rs {receivedAmount.toFixed(2)}</p>
        <p>Received By: {receivedBy}</p>
        <p className="mt-3 text-center font-medium">Thank You!</p>
      </div>

      {/* Actions (hidden when printing) */}
      <div className="mt-auto flex flex-col gap-2 pt-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600"
        >
          <Printer size={14} /> Print Invoice
        </button>
        <button
          onClick={() => window.print()} // "Save as PDF" in the print dialog; see note below
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2 font-semibold text-gray-700 hover:bg-gray-50"
        >
          <Download size={14} /> Download PDF
        </button>
      </div>
      {isPrinting && <LoadingOverlay />}
      {paymentSucess && (
        <StatusOverlay
          show={paymentSucess}
          icon={<HandCoins className="h-16 w-16 text-blue-500" />}
          title="Payment Successful!"
        />
      )}
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center ">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default PaymentReceipt;
