const summary = [
  { label: "Total Invoices", value: "8" },
  { label: "Total Amount", value: "Rs 120000" },
  { label: "Received Amount", value: "Rs 25000" },
  { label: "Due Amount", value: "Rs 25000" },
  { label: "Total Paid", value: "Rs 25000" },
];

const columns = [
  "Receipt No",
  "Invoice Number",
  "Customer",
  "Contact",
  "Date",
  "Reference Number",
  "Type",
  "Sub total",
  "Total Amount",
];

const rows = Array.from({ length: 5 }, () => ({
  receiptNo: "#R_555",
  invoiceNumber: "INV_555",
  customer: "Ram",
  contact: "9876543210",
  date: "2024-12-23",
  references: ["KOT#125", "BOT#125"],
  type: "Cheque",
  subTotal: "Rs 800",
  totalAmount: "Rs 832.35",
}));

const TableView = () => {
  return (
    <div className="">
      <div className="grid grid-cols-2 rounded-lg border border-gray-300 sm:grid-cols-5">
        {summary.map((item, index, items) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center px-3 py-2 text-center ${
              index !== items.length - 1 ? "sm:border-r border-gray-300" : ""
            }`}
          >
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-semibold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg bg-gray-50">
        <table className="w-full min-w-[900px] text-center text-sm text-gray-700">
          <thead>
            <tr className="text-gray-700">
              {columns.map((col) => (
                <th key={col} className="px-4 py-4 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-5 text-left">
                  <span className="mr-2 text-gray-500">{index + 1}</span>
                  {row.receiptNo}
                </td>
                <td className="px-4 py-5">{row.invoiceNumber}</td>
                <td className="px-4 py-5">{row.customer}</td>
                <td className="px-4 py-5">{row.contact}</td>
                <td className="px-4 py-5">{row.date}</td>
                <td className="px-4 py-5">
                  {row.references.map((ref) => (
                    <div key={ref}>{ref}</div>
                  ))}
                </td>
                <td className="px-4 py-5">{row.type}</td>
                <td className="px-4 py-5">{row.subTotal}</td>
                <td className="px-4 py-5">{row.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
