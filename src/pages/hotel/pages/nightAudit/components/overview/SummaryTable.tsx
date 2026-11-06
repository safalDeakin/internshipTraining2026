
import type { SummaryRow } from "../../../../../../domain/nightAudit";
import CardTitle from "../shared/CardTitle";

interface SummaryTableProps {
    title: string;
    firstColumn: string;
    rows: SummaryRow[];
}

export default function SummaryTable({
    title,
    firstColumn,
    rows,
}: SummaryTableProps) {
    return (
        <section className="summary-section">
            <CardTitle>{title}</CardTitle>

            <div className="table-scroll">
                <table className="data-table summary-table">
                    <thead>
                        <tr>
                            <th>{firstColumn}</th>
                            <th>Count</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    {row.id}. <span className="link-text">{row.name}</span>
                                </td>

                                <td>{row.count}</td>
                                <td>{row.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}