

import type { OverviewRow } from "../../types/overview.tyes";

interface OverviewTableProps {
    rows: OverviewRow[];
}

export default function OverviewTable({
    rows,
}: OverviewTableProps) {
    return (
        <section className="exceptions">

            <div className="table-scroll">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Room Revenue</th>
                            <th>Food & Beverage</th>
                            <th>Laundry</th>
                            <th>Other Service</th>
                            <th>Total Revenue</th>

                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    {row.id}. <span className="link-text">{row.department}</span>
                                </td>

                                <td>{row.roomrevenue}</td>
                                <td>{row.foodandbeverage}</td>
                                <td>{row.laundry}</td>
                                <td>{row.otherservice}</td>
                                <td>{row.totalrevenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}