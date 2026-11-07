interface RevenueRow {
    id: string | number;
    category: string;
    amount: string | number;
    percentage: string | number;
}

interface RevenueTableProps {
    rows: RevenueRow[];
}

export default function RevenueTable({ rows }: RevenueTableProps) {
    return (
        <div className="table-scroll">
            <table className="data-table revenue-table">
                <thead>
                    <tr>
                        <th>Revenue Id</th>
                        <th>Amount</th>
                        <th>% of Total</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>
                                {row.id}. <span className="link-text">{row.category}</span>
                            </td>

                            <td>{row.amount}</td>
                            <td>{row.percentage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}