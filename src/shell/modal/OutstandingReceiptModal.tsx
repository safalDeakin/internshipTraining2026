import ReusableButton from "../shared/components/ReusableButton";
import type {
  OutstandingInvoice,
  OutstandingPayment,
} from "./CollectOutstandingModal";

interface OutstandingReceiptModalProps {
  invoice: OutstandingInvoice;
  payment: OutstandingPayment;
  receiptNo: string;
  onPrint: () => void;
}

const Row = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <div className="flex items-center justify-between ">
    <span className="text-gray-600">{label}</span>
    <span
      className={bold ? "font-bold text-gray-900" : "font-medium text-gray-800"}
    >
      {value}
    </span>
  </div>
);

const OutstandingReceiptModal = ({
  invoice,
  payment,
  receiptNo,
  onPrint,
}: OutstandingReceiptModalProps) => {
  const today = new Date().toLocaleDateString("en-CA").replace(/-/g, "/");

  // Display backend-provided remaining due if available.
  // Otherwise, use the payment data already supplied.
  const remaining = 100;

  const items = [
    { name: "Chicken Mo:Mo", amount: 450 },
    { name: "Veg Fried Rice", amount: 350 },
    { name: "Coke", amount: 100 },
    { name: "Mojito", amount: 250 },
  ];

  return (
    <div className="w-full p-4">
      {/* Receipt Header */}
      <div className="flex flex-col text-gray-500">
        <p>
          Receipt No:{" "}
          <span className="font-medium text-gray-900">{receiptNo}</span>
        </p>

        <p>
          Date: <span className="font-medium text-gray-900">{today}</span>
        </p>
      </div>

      {/* Customer Information */}
      <section className=" py-3">
        <Row label="Customer" value={invoice.customerName} />
        <Row label="Phone Number" value={invoice.phone} />
      </section>

      {/* Items and Amount */}
      <section className="py-3">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">S.No.</th>
              <th>Item</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="text-right">Rs {item.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-3 text-center text-gray-400">
                  No item details available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Amount Summary */}
      <section className="border-b border-gray-200 py-3">
        <Row
          label="Subtotal"
          //   value={`Rs ${invoice.subtotal ?? payment.totalAmount}`}
          value="100"
        />

        <Row label="Tax (13% VAT)" value="400" />

        <Row label="10% Service Charge" value="0" />

        <div className="mt-2 border-t border-gray-300 pt-2">
          <Row label="Total Amount" value={`Rs ${payment.totalAmount}`} />
        </div>
      </section>

      {/* Payment Summary */}
      <section className="py-3">
        <Row label="Amount Received" value={`Rs ${payment.receivedAmount}`} />
        <Row label="Advanced Ampount" value={`Rs ${payment.receivedAmount}`} />
      </section>

      {/* Print Button */}
      <ReusableButton
        type="button"
        title="Print Receipt"
        variant="primary"
        size="sm"
        className="mt-5 w-full"
        onClick={onPrint}
      />
    </div>
  );
};

export default OutstandingReceiptModal;
