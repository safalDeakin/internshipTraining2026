import { Printer, Download } from "lucide-react";
import FormFrame from "../forms/FormFrame";

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

  const subtotal = invoice.items.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const today = invoice.serviceDate;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full  max-w-lg">
        <FormFrame
          title=""
          onClose={onClose}
          className="max-h-[90vh] "
          footer={
            <div className="flex flex-col gap-3 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-orange-600"
              >
                <Printer size={14} />
                Print Invoice
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Download size={14} />
                Download PDF
              </button>
            </div>
          }
        >
          <div
            id="reference-print-area"
            className="mx-auto w-full max-w-md space-y-3 text-xs"
          >
            {/* Restaurant Information */}
            <div className="text-center">
              <p className="font-semibold text-xl">{reference}</p>
            </div>

            {/* Reference and Date */}
            <div className="flex justify-between pb-3">
              <div className="text-left flex">
                <p className="text-gray-500">
                  Date:{" "}
                  <span className="font-medium text-gray-900">{today}</span>
                </p>
              </div>
            </div>

            {/* Customer Information */}

            <div>
              <p className="text-gray-500">
                Customer Name :{" "}
                <span className="font-semibold text-gray-800">
                  {invoice.customerName}
                </span>
              </p>
              <p className="text-gray-500">
                Reference Number:{" "}
                <span className="font-semibold text-gray-800">{reference}</span>
              </p>
              <p className="text-gray-500">
                Phone Number:{" "}
                <span className="font-semibold text-gray-800">
                  {invoice.phone}
                </span>
              </p>
            </div>

            <div></div>

            {/* Items Table */}

            <div className="overflow-x-auto">
              <table className="w-full border-b border-gray-300 text-left">
                <thead>
                  <tr className=" font-semibold text-gray-900">
                    <th className="p-2">S.No.</th>
                    <th className="p-2">Particulars</th>
                    <th className="p-2 text-right">Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr
                      key={`${item.name}-${index}`}
                      className="border-b border-gray-100"
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 text-right">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Staff Name below table */}
            <div className="mt-3 flex justify-start">
              <p className="text-gray-500">Staff Name :</p>
              <p className="font-semibold text-gray-800">
                {invoice.staffName || "XYZ"}
              </p>
            </div>
            <p className="pt-2 text-center font-medium">Thank You!</p>
          </div>
        </FormFrame>
      </div>
    </div>
  );
};

export default ReferenceDetailsModal;
