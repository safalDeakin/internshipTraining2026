import type { TableColumn, TableRow } from '../types/receipts'

export function ReceiptTable({
    columns,
    rows,
}: {
    columns: TableColumn[]
    rows: TableRow[]
}) {
    return (
        <table className="receipt-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th className={column.align ?? 'left'} key={column.key}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={`${row.no}-${index}`}>
                        {columns.map((column) => (
                            <td className={column.align ?? 'left'} key={column.key}>
                                {row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
