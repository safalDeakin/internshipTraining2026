import { useState } from "react";
import ReceiptFrame from "../../shared/components/ReceiptFrame";
import type { PaymentReceiptProps } from "../types/PaymentTypes";

const PaymentReceipt = ({
  customer,
  total,
  paymentMethod,
  receivedAmount,
  vatAmount = 0,
  serviceCharge = 0,
  grandTotal,
  receivedBy = "XYZ",
  onDownloadPDF,
}: PaymentReceiptProps) => {
  const invoices = customer.invoice || [];

  const [receiptId] = useState(
    () => `R_${Math.floor(Math.random() * 900 + 100)}`,
  );

  const today = new Date().toLocaleDateString("en-GB");

  // Replace with actual item data from your payment details
  const items = customer.items || [];

  return (
    <ReceiptFrame
      hotelName="VIP Restaurant"
      address="Banepa-07, Kavre"
      phone="01-11111111"
      onPrint={() => window.print()}
      onDownloadPDF={onDownloadPDF}
    >
      <div className="mx-auto w-full max-w-md space-y-4 text-xs text-gray-700">
        {/* Receipt Details */}
        <div className="flex flex-col items-end">
          <ReceiptRow label="Receipt No." value={receiptId} />
          <ReceiptRow label="Date" value={today} />
        </div>

        {/* Customer Information */}
        <div className="space-y-2">
          <ReceiptRow label="Customer" value={customer.name || "-"} />
          <ReceiptRow label="Phone" value={customer.number || "-"} />
          <ReceiptRow label="Location" value="No location" />
        </div>

        {/* Items Table */}
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-2 font-medium">S.N.</th>
                <th className="py-2 font-medium">Item</th>
                <th className="py-2 text-center font-medium">Qty</th>
                <th className="py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td className="py-2 pr-2">{index + 1}</td>
                  <td className="py-2 pr-2">{item.name}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">
                    Rs {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="space-y-2">
          <ReceiptRow label="Payment Method" value={paymentMethod} />
          <ReceiptRow
            label="Payment Status"
            value={
              receivedAmount < grandTotal ? "Partially paid" : "Fully paid"
            }
          />
        </div>

        {/* Amount Summary */}
        <div className="space-y-2 border-t border-gray-300 pt-3">
          <ReceiptRow label="Subtotal" value={`Rs ${total.toFixed(2)}`} />

          <ReceiptRow label="VAT (13%)" value={`Rs ${vatAmount.toFixed(2)}`} />

          <ReceiptRow
            label="Service Charge (10%)"
            value={`Rs ${serviceCharge.toFixed(2)}`}
          />

          <div className="flex justify-between border-t border-gray-300 pt-3 text-sm font-bold text-gray-900">
            <span>Total Amount</span>
            <span className="text-orange-600">Rs {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="space-y-2">
          <ReceiptRow
            label="Amount Received"
            value={`Rs ${receivedAmount.toFixed(2)}`}
          />

          <ReceiptRow
            label="Remaining Amount"
            value={`Rs ${Math.max(grandTotal - receivedAmount, 0).toFixed(2)}`}
          />

          <ReceiptRow label="Received By" value={receivedBy} />
        </div>

        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="font-semibold text-gray-900">Thank You!</p>
        </div>
      </div>
    </ReceiptFrame>
  );
};

interface ReceiptRowProps {
  label: string;
  value: string;
}

const ReceiptRow = ({ label, value }: ReceiptRowProps) => (
  <div className="flex items-start justify-between gap-3">
    <span className="text-gray-500">{label}</span>
    <span className="text-right font-medium text-gray-800">{value}</span>
  </div>
);

export default PaymentReceipt;
