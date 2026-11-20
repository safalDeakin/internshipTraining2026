import ReusableButton from "../shared/components/ReusableButton";
import type {
  OutstandingInvoice,
  OutstandingPayment,
} from "./CollectOutstandingModal";

interface OutstandingInvoiceModalProps {
  invoice: OutstandingInvoice;
  payment: OutstandingPayment;
  receiptNo: string;
  onPrint?: () => void;
  onDownloadPdf?: () => void;
}

const OutstandingInvoiceModal = ({
  invoice,
  payment,
  receiptNo,
  onPrint = () => window.print(),
  onDownloadPdf = () => window.print(),
}: OutstandingInvoiceModalProps) => {
  const today = new Date().toISOString().slice(0, 10);

  const paidNow = payment.receivedAmount;

  const dueAfter = Math.max(0, payment.dueAmount - paidNow);

  return (
    <div className="w-full p-4">
      {/* Restaurant Information */}
      <div className="mb-4 text-center">
        <p className="text-base font-semibold text-gray-900">VIP Restaurant</p>
        <p className="text-sm text-gray-600">Banepa-07, Kavre</p>
        <p className="text-sm text-gray-600">01-11111111</p>
      </div>

      {/* Receipt Information */}
      <div className="mb-4 text-right text-sm text-gray-500">
        <p>Receipt ID: #{receiptNo}</p>
        <p>Date: {today}</p>
      </div>

      {/* Payment Details */}
      <h3 className="mb-2 font-semibold text-gray-900">Payment Details</h3>

      <div className="mb-4 space-y-1 text-sm">
        <p>Payment Method: {invoice.paymentMethod ?? "Cash"}</p>
        <p>Payment Note: {dueAfter > 0 ? "Partially paid" : "Fully paid"}</p>
      </div>

      {/* Customer Information */}
      <h3 className="mb-2 font-semibold text-gray-900">Customer Information</h3>

      <div className="mb-4 flex flex-col gap-2 text-sm">
        <span>Customer: {invoice.customerName}</span>
        <span>Number: {invoice.phone}</span>
        <span>Location: Banepa</span>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[380px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2">S.No.</th>
              <th>Invoice Number</th>
              <th>Due Amount</th>
              <th>Paid Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-2">1</td>
              <td>{invoice.invoiceNumber}</td>
              <td>Rs {payment.dueAmount}</td>
              <td>Rs {paidNow}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-sm font-semibold">
        <span>Subtotal</span>
        <span>Rs {paidNow}</span>
      </div>

      <div className="flex justify-between py-2 text-sm">
        <span>Remaining Due</span>
        <span>Rs {dueAfter}</span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col gap-2">
        <ReusableButton
          type="button"
          title="Print Invoice"
          variant="primary"
          size="sm"
          className="w-full"
          onClick={onPrint}
        />

        <ReusableButton
          type="button"
          title="Download PDF"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onDownloadPdf}
        />
      </div>
    </div>
  );
};

export default OutstandingInvoiceModal;
