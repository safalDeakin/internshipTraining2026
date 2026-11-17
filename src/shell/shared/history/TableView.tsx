interface SummaryItem {
  label: string;
  value: string;
}

interface TableColumn {
  key: string;
  label: string;
}

interface TableViewProps {
  summary: SummaryItem[];
  columns: TableColumn[];
  rows: Record<string, React.ReactNode>[];
}

const TableView = ({ summary, columns, rows }: TableViewProps) => {
  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 rounded-lg border border-gray-300 sm:grid-cols-5">
        {summary.map((item, index) => (
          <div
            key={item.label}
            className={`flex flex-col items-center justify-center border-gray-300 px-3 py-3 text-center ${
              index !== summary.length - 1 ? "sm:border-r" : ""
            }`}
          >
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-semibold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Reusable table */}
      <div className="overflow-x-auto rounded-lg bg-gray-50">
        <table className="w-full min-w-[900px] text-center text-sm text-gray-700">
          <thead>
            <tr className="text-gray-700">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-4 py-4 font-medium"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={index} className="border-t border-gray-200">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-5">
                      {column.key === "receiptNo" ? (
                        <span className="whitespace-nowrap">
                          <span className="mr-2 text-gray-500">
                            {index + 1}
                          </span>
                          {row[column.key]}
                        </span>
                      ) : (
                        (row[column.key] ?? "-")
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
//  <div className="flex flex-col gap-6 lg:flex-row">
//           {/* sidebar */}
//           <aside className="w-full shrink-0 lg:w-64">
//             <p className="mb-2 text-xs text-gray-500">
//               <span className="text-sm font-medium text-gray-700">
//                 {filtered.length}
//               </span>{" "}
//               items
//             </p>

//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search item"
//               className="mb-3 w-full rounded border border-gray-300 px-2 py-1.5 text-xs outline-none focus:border-blue-400"
//             />

//             <ul className="space-y-1">
//               {filtered.map((r) => (
//                 <li key={r.id}>
//                   <button
//                     type="button"
//                     onClick={() => setSelectedId(r.id)}
//                     className={`w-full rounded border px-3 py-2 text-left ${
//                       r.id === selectedId
//                         ? "border-blue-400 bg-blue-50"
//                         : "border-transparent hover:bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="text-xs font-medium text-gray-800">
//                         {r.receiptNo}
//                       </span>
//                       {r.active && (
//                         <span className="text-[10px] text-green-600">
//                           Active
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-[10px] text-gray-500">{r.listDate}</p>
//                     <p className="text-[10px] text-gray-500">
//                       {r.customerName}
//                     </p>
//                   </button>
//                 </li>
//               ))}

//               {filtered.length === 0 && (
//                 <li className="px-3 py-4 text-center text-xs text-gray-400">
//                   No receipts found
//                 </li>
//               )}
//             </ul>
//           </aside>
//           {/* main content */}
//           <main className="flex-1">
//             {selected ? (
//               <div className="rounded border border-gray-200 bg-white px-8 py-6">
//                 <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
//                   Receipt
//                 </h2>

//                 <div className="space-y-1.5 pb-5">
//                   <p className="text-base text-gray-500">
//                     Receipt no:{" "}
//                     <span className="font-medium text-gray-900">
//                       {selected.receiptNo}
//                     </span>
//                   </p>
//                   <p className="text-base text-gray-500">
//                     Type:{" "}
//                     <span className="font-medium text-gray-900">
//                       {selected.type}
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Date:{" "}
//                     <span className="font-medium text-gray-900">
//                       {selected.date}
//                     </span>
//                   </p>
//                 </div>

//                 <section className="border-t border-gray-200 py-5">
//                   <p className="text-sm text-gray-500">
//                     Invoice number:{" "}
//                     {selected.invoices.map((inv) => (
//                       <span
//                         key={inv}
//                         className="mr-3 font-medium text-gray-900"
//                       >
//                         {inv}
//                       </span>
//                     ))}
//                   </p>
//                 </section>

//                 <Section title="Customer Information">
//                   <Field label="Customer name">{selected.customerName}</Field>
//                   <Field label="Phone number">{selected.phone}</Field>
//                   <Field label="Address">{selected.address}</Field>
//                 </Section>

//                 <Section title="Payment Details">
//                   <Field label="Cheque Number">{selected.chequeNumber}</Field>
//                   <Field label="Bank Name">{selected.bankName}</Field>
//                   <Field label="Payment Note">{selected.note}</Field>
//                 </Section>

//                 <section className="border-t border-gray-200 py-5">
//                   <table className="w-full text-sm">
//                     <thead>
//                       <tr className="text-left text-gray-600">
//                         <th className="pb-3 font-medium">Invoice Number</th>
//                         <th className="pb-3 font-medium">Invoice Date</th>
//                         <th className="pb-3 text-right font-medium">
//                           Due amount
//                         </th>
//                         <th className="pb-3 text-right font-medium">
//                           Paid Amount
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selected.invoiceRows.map((row) => (
//                         <tr key={row.invoiceNumber} className="text-gray-800">
//                           <td className="py-1.5">{row.invoiceNumber}</td>
//                           <td className="py-1.5">{row.invoiceDate}</td>
//                           <td className="py-1.5 text-right">{row.dueAmount}</td>
//                           <td className="py-1.5 text-right">
//                             {row.paidAmount}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </section>
//               </div>
//             ) : (
//               <p className="py-10 text-center text-sm text-gray-400">
//                 Select a receipt to view its details
//               </p>
//             )}
//           </main>
//         </div>
