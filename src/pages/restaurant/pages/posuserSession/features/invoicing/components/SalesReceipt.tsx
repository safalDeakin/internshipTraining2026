import ReceiptFrame from "../../../shared/components/forms/ReceiptFrame";
import type { SalesReceiptProps } from "../types/InvoiceTypes";

const SalesReceipt = ({ invoice }: SalesReceiptProps) => {
  const today = new Date().toLocaleDateString("en-GB");

  const remainingAmount = Math.max(invoice.totalAmount - invoice.paidAmount, 0);

  return (
    <ReceiptFrame
      hotelName="VIP Restaurant"
      address="Banepa-07, Kavre"
      phone="01-11111111"
    >
      <div className="mx-auto w-full max-w-md space-y-4 text-xs text-gray-700">
        {/* Receipt Details */}
        <div className="flex flex-col items-end ">
          <ReceiptRow label="Sales Order." value={invoice.receiptNo} />
          <ReceiptRow label="Date" value={today} />
        </div>
        <div className="space-y-2">
          <ReceiptRow
            label="Customer"
            value={invoice.customerName || "Walk-in Customer"}
          />
          <ReceiptRow label="Phone" value={invoice.phone || "-"} />
          <ReceiptRow label="Location." value={"bnp"} />
        </div>

        {/* Items Table */}
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-2 text-left font-medium">S.N.</th>
                <th className="py-2 font-medium">Item</th>
                <th className="py-2 text-center font-medium">Qty</th>
                <th className="py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>

            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td className="py-2 pr-2 text-left">{index + 1}</td>
                  <td className="py-2 pr-2">{item.name}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">
                    Rs {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}

              {invoice.items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Amount Summary */}
        <div className="space-y-2 pt-3">
          <ReceiptRow
            label="Subtotal"
            value={`Rs ${invoice.subtotal.toFixed(2)}`}
          />

          {/* Backend will calculate these amounts */}
          <ReceiptRow label="VAT (13%)" value="Rs -" />
          <ReceiptRow label="Service Charge (10%)" value="Rs -" />

          <div className="flex justify-between border-t border-gray-300 pt-3 text-sm font-bold text-gray-900">
            <span>Total Amount</span>
            <span className="text-orange-600">
              Rs {invoice.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-2pt-3">
          <ReceiptRow
            label="Amount Received"
            value={`Rs ${invoice.paidAmount.toFixed(2)}`}
          />

          <ReceiptRow
            label="Remaining Amount"
            value={`Rs ${remainingAmount.toFixed(2)}`}
          />

          <ReceiptRow label="Due Date" value={invoice.dueDate || "Not set"} />
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
  <div className="flex items-start gap-3">
    <span className="text-gray-500">{label}</span>
    <span className="text-right font-medium text-gray-800">{value}</span>
  </div>
);

export default SalesReceipt;
