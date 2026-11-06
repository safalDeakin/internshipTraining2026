import { useState } from "react";
import type { PaymentCard, PaymentReceiptProps } from "../types/PaymentTypes";
import ReceiptFrame from "../../../shared/components/forms/ReceiptFrame";

const PaymentReceipt = ({
  customer,
  total,
  paymentMethod,
  receivedAmount,
  vatAmount = 0,
  serviceCharge = 0,
  grandTotal,
  receivedBy = "XYZ",
  onClose,
  onDownloadPDF,
}: PaymentReceiptProps) => {
  const invoices = customer.invoice || [];

  const [receiptId] = useState(
    () => `R_${Math.floor(Math.random() * 900 + 100)}`,
  );

  const today = new Date().toLocaleDateString("en-CA").replace(/-/g, "/");

  return (
    <ReceiptFrame
      hotelName="VIP Restaurant"
      address="Banepa-07, Kavre"
      phone="01-11111111"
      onPrint={() => window.print()}
      onDownloadPDF={onDownloadPDF}
    >
      <div className="text-xs">
        {/* Receipt Information */}
        <div className="text-right text-gray-400">
          Receipt ID: <span className="text-gray-800">567</span>
        </div>

        <div className="mt-3 flex justify-between text-gray-500">
          <p>
            No: <span className="text-black">{receiptId}</span>
          </p>

          <p>
            Date: <span className="text-black">{today}</span>
          </p>
        </div>

        {/* Payment Details */}
        <h3 className="mt-4 text-lg font-semibold">Payment Details</h3>

        <p>
          Payment Method: <b>{paymentMethod}</b>
        </p>

        <p>
          Payment Note:{" "}
          <b>{receivedAmount < grandTotal ? "Partially paid" : "Fully paid"}</b>
        </p>

        {/* Customer Information */}
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

        {/* Invoice List */}
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
                <td>Rs {Math.round(total / (invoices.length || 1))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Amount Summary */}
        <div className="mt-2 space-y-1 pt-2">
          <div className="border-b border-gray-300">
            <Row label="Subtotal" value={`Rs ${total}`} />
          </div>

          <Row label="Tax (13% VAT)" value={`Rs ${vatAmount}`} />

          <Row label="10% Service Charge" value={`Rs ${serviceCharge}`} />

          <div className="mt-4 flex justify-between border-t border-gray-300 pt-2 text-sm font-bold">
            <span>Total Amount</span>
            <span className="text-orange-600">Rs {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Summary */}
        <p className="mt-3">Received Amount: Rs {receivedAmount.toFixed(2)}</p>

        <p>Received By: {receivedBy}</p>

        <p className="mt-3 text-center font-medium">Thank You!</p>
      </div>
    </ReceiptFrame>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default PaymentReceipt;
