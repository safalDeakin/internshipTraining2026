import ReceiptFrame from "../pages/posuserSession/shared/components/forms/ReceiptFrame";

interface ReferenceInvoice {
  customerName: string;
  phone: string;
  serviceDate: string;
  staffName?: string;
  items: {
    name: string;
    quantity: number;
    amount: number;
  }[];
}

interface ReferenceDetailsModalProps {
  invoice: ReferenceInvoice;
  reference: string;
  onClose: () => void;
}

const ReferenceDetailsModal = ({
  invoice,
  reference,
  onClose,
}: ReferenceDetailsModalProps) => {
  const isKOT = reference.startsWith("KOT");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg">
        <div className="relative max-h-[90vh] overflow-hidden rounded-xl bg-white">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 text-gray-500 hover:text-gray-800 print:hidden"
          >
            ✕
          </button>

          <ReceiptFrame
            hotelName={reference}
            address=""
            phone={invoice.phone}
            onPrint={() => window.print()}
          >
            <div
              id="reference-print-area"
              className="mx-auto w-full max-w-md space-y-4 text-xs"
            >
              {/* Date */}
              <div>
                <p className="text-gray-500">
                  Date:{" "}
                  <span className="font-medium text-gray-900">
                    {invoice.serviceDate}
                  </span>
                </p>
              </div>

              {/* Customer Information */}
              <div className="space-y-1">
                <p className="text-gray-500">
                  Customer Name:{" "}
                  <span className="font-semibold text-gray-800">
                    {invoice.customerName}
                  </span>
                </p>

                <p className="text-gray-500">
                  Reference Number:{" "}
                  <span className="font-semibold text-gray-800">
                    {reference}
                  </span>
                </p>

                <p className="text-gray-500">
                  Phone Number:{" "}
                  <span className="font-semibold text-gray-800">
                    {invoice.phone}
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
                    </tr>
                  </thead>

                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={`${item.name}-${index}`}>
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-right">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Staff Name */}
              <div className="flex gap-2 pt-3">
                <p className="text-gray-500">Staff Name:</p>
                <p className="font-semibold text-gray-800">
                  {invoice.staffName || "XYZ"}
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
