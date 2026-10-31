import { useRef } from "react";
import { Download, Printer, X } from "lucide-react";
import type { InvoiceType } from "../../features/invoicing/InvoicingLayout";

interface HistoryModalProps {
  item: {
    type: InvoiceType;
    reference: string;
    name: string;
    number: string;
    waiter: string;
    table: string;
    time: string;
    itemCount: number;
  };
  onClose: () => void;
}

const HistoryModal = ({ item, onClose }: HistoryModalProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString("en-GB");

  // Example item rows
  const invoiceItems = [
    {
      id: 1,
      name: "MoMo",
      quantity: 2,
      amount: 300,
    },
    {
      id: 2,
      name: "Coke",
      quantity: 1,
      amount: 100,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm "
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-fit max-w-[95vw] flex-col overflow-hidden rounded-xl bg-white shadow-xl print:max-h-none print:max-w-none "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex shrink-0 items-center justify-between px-5 py-3 print:hidden">
          {/* KOT title and date */}
          <div className="pb-4 text-center">
            <h1 className="text-xl font-bold tracking-wide text-gray-900">
              {item.type === "Reservation" ? "RESERVATION" : item.type}
            </h1>

            <p className="mt-1 text-xs text-gray-500">Date: {today}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Receipt content */}
        <div
          ref={receiptRef}
          className="min-h-0 flex-1 overflow-y-auto px-5 print:overflow-visible"
        >
          {/* Customer details */}
          <div className="flex flex-col">
            <Detail label="Customer Name" value={item.name} />
            <Detail label="Reference Number" value={item.reference} />
            <Detail label="Phone Number" value={item.number} />
          </div>

          {/* Items table */}
          <div className="mt-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-gray-600">
                  <th className="py-2 pr-2">S.N.</th>
                  <th className="py-2 text-center">Quantity</th>
                  <th className="py-2">Items</th>
                </tr>
              </thead>

              <tbody>
                {invoiceItems.map((invoiceItem, index) => (
                  <tr
                    key={invoiceItem.id}
                    className="border-b border-gray-100 text-gray-800"
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2 text-center">
                      {invoiceItem.quantity} Unit
                    </td>
                    <td className="py-2">{invoiceItem.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Staff */}
          <div className="mt-5 flex gap-2 items-center">
            <p className="text-sm text-gray-500">Staff Name: </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              {item.waiter}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col gap-3 p-4 ">
          <button
            type="button"
            onClick={handlePrint}
            className="flex flex-1 items-center justify-center gap-2 bg-orange-500 rounded-lg px-4 py-2 text-sm font-medium text-white "
          >
            <Printer size={16} />
            Print
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2 items-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 break-words text-sm font-medium text-gray-800">
      {value}
    </p>
  </div>
);

export default HistoryModal;
