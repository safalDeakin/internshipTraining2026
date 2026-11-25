import { Download, Printer, X } from "lucide-react";

interface PrintReceiptModalProps {
  onClose: () => void;
}

// UI only: static sample data matching the design
const receipt = {
  restaurantName: "VIP Restaurant",
  address: "Banepa-07, Kavre",
  phone: "01-11111111",
  receiptId: "#R_555",
  date: "2024/12/13",
  paymentMethod: "Cash",
  paymentNote: "Partially paid",
  customer: "Ram Shrestha",
  number: "9800000000",
  location: "Banepa",
  items: [
    { sn: 1, invoiceNo: "INV101", due: 550, paid: 350 },
    { sn: 1, invoiceNo: "INV101", due: 550, paid: 350 },
    { sn: 1, invoiceNo: "INV101", due: 550, paid: 350 },
    { sn: 1, invoiceNo: "INV101", due: 550, paid: 350 },
  ],
};

const formatCurrency = (amount: number) =>
  `Rs ${Number(amount).toLocaleString("en-IN")}`;

export default function PrintReceiptModal({ onClose }: PrintReceiptModalProps) {
  const subtotal = receipt.items.reduce((sum, i) => sum + i.paid, 0);

  return (
    <div className="">
      {/* Printable Content */}
      <div id="printable-receipt" className="px-6 pb-6 pt-5">
        {/* Header */}
        <div className="relative text-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-0 top-0 text-gray-800 hover:text-black print:hidden"
          >
            <X size={20} />
          </button>
          <h2 className="text-base font-semibold text-gray-900">
            {receipt.restaurantName}
          </h2>
          <p className="text-sm font-medium text-gray-800">{receipt.address}</p>
          <p className="text-sm font-medium text-gray-800">{receipt.phone}</p>
        </div>

        {/* Receipt meta */}
        <div className="mt-4 space-y-0.5 text-right text-sm text-gray-500">
          <p>
            Receipt ID:{" "}
            <span className="font-medium text-gray-700">
              {receipt.receiptId}
            </span>
          </p>
          <p>
            Date:{" "}
            <span className="font-medium text-gray-700">{receipt.date}</span>
          </p>
        </div>

        {/* Payment Details */}
        <section className="mt-5">
          <h3 className="text-base font-semibold text-gray-900">
            Payment Details
          </h3>
          <div className="mt-2 space-y-1 text-sm text-gray-800">
            <p>
              Payment Method:{" "}
              <span className="font-semibold">{receipt.paymentMethod}</span>
            </p>
            <p>
              Payment Note:{" "}
              <span className="font-semibold">{receipt.paymentNote}</span>
            </p>
          </div>
        </section>

        {/* Customer Information */}
        <section className="mt-5">
          <h3 className="text-base font-semibold text-gray-900">
            Customer Information
          </h3>
          <div className="mt-2 space-y-1 text-sm text-gray-800">
            <p>
              Customer:{" "}
              <span className="font-semibold">{receipt.customer}</span>
            </p>
            <div className="flex items-center justify-between">
              <p>
                Number: <span className="font-semibold">{receipt.number}</span>
              </p>
              <p>
                Location:{" "}
                <span className="font-semibold">{receipt.location}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Table */}
        <table className="mt-5 w-full text-left text-sm text-gray-800">
          <thead>
            <tr className="font-semibold text-gray-900">
              <th className="py-2 pr-2">S.No.</th>
              <th className="py-2 pr-2">Invoice Number</th>
              <th className="py-2 pr-2">Due Amount</th>
              <th className="py-2 text-right">Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-1.5 pr-2">{item.sn}</td>
                <td className="py-1.5 pr-2">{item.invoiceNo}</td>
                <td className="py-1.5 pr-2">{formatCurrency(item.due)}</td>
                <td className="py-1.5 text-right">
                  {formatCurrency(item.paid)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-300 font-semibold text-gray-900">
              <td colSpan={3} className="pt-3">
                Subtotal
              </td>
              <td className="pt-3 text-right">{formatCurrency(subtotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Actions */}
      <div className="space-y-3 px-6 pb-6 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          <Printer size={18} />
          Print Invoice
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Download size={18} />
          Download PDF
        </button>
      </div>
    </div>
  );
}
