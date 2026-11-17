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
