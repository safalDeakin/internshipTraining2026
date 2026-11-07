
import type { ExceptionRow } from "../../../../../../domain/nightAudit";
import CardTitle from "../shared/CardTitle";

interface ExceptionsTableProps {
    rows: ExceptionRow[];
}

export default function ExceptionsTable({
    rows,
}: ExceptionsTableProps) {
    return (
        <section className="exceptions">
            <CardTitle>Exceptions</CardTitle>

            <div className="table-scroll">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Exception Type</th>
                            <th>Count</th>
                            <th>Open Since</th>
                            <th>Priority/Related</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    {row.id}. <span className="link-text">{row.type}</span>
                                </td>

                                <td>{row.count}</td>
                                <td>{row.duration}</td>
                                <td>{row.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}