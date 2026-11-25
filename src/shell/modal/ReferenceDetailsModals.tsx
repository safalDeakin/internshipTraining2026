import ReceiptFrame from "../shared/components/ReceiptFrame";
import type { InvoiceCards } from "../types/InvoiceTypes";

interface ReferenceDetailsModalProps {
  invoice: InvoiceCards;
  onClose: () => void;
}

const ReferenceDetailsModal = ({
  invoice,
  onClose,
}: ReferenceDetailsModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg">
        <div className="relative max-h-[90vh] overflow-hidden rounded-xl bg-white">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 text-gray-500 hover:text-gray-800 print:hidden"
            aria-label="Close reference details"
          >
            ✕
          </button>

          <ReceiptFrame
            hotelName={invoice.reference}
            address=""
            phone={invoice.number}
            onPrint={() => window.print()}
          >
            <div
              id="reference-print-area"
              className="mx-auto w-full max-w-md space-y-4 text-xs"
            >
              {/* Reference Information */}
              <div>
                <p className="text-gray-500">
                  Type:{" "}
                  <span className="font-medium text-gray-900">
                    {invoice.type}
                  </span>
                </p>

                <p className="text-gray-500">
                  Time:{" "}
                  <span className="font-medium text-gray-900">
                    {invoice.time}
                  </span>
                </p>
              </div>

              {/* Customer Information */}
              <div className="space-y-1">
                <p className="text-gray-500">
                  Customer Name:{" "}
                  <span className="font-semibold text-gray-800">
                    {invoice.name}
                  </span>
                </p>

                <p className="text-gray-500">
                  Reference Number:{" "}
                  <span className="font-semibold text-gray-800">
                    {invoice.reference}
                  </span>
                </p>

                <p className="text-gray-500">
                  Phone Number:{" "}
                  <span className="font-semibold text-gray-800">
                    {invoice.number}
                  </span>
                </p>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="font-semibold text-gray-900">
                      <th className="p-2">S.No.</th>
                      <th className="p-2">Particulars</th>
                      <th className="p-2 text-right">Quantity</th>
                      <th className="p-2 text-right">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoice.invoiceItems.map((item, index) => (
                      <tr key={item.id}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-right">{item.quantity}</td>
                        <td className="p-2 text-right">Rs {item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Staff and Table Information */}
              <div className="space-y-1 border-t border-gray-200 pt-3">
                <p className="text-gray-500">
                  Waiter:{" "}
                  <span className="font-semibold text-gray-800">
                    {invoice.waiter}
                  </span>
                </p>

                <p className="text-gray-500">
                  Table:{" "}
                  <span className="font-semibold text-gray-800">
                    {invoice.table}
                  </span>
                </p>
              </div>

              <p className="pt-2 text-center font-medium">Thank You!</p>
            </div>
          </ReceiptFrame>
        </div>
      </div>
    </div>
  );
};

export default ReferenceDetailsModal;
