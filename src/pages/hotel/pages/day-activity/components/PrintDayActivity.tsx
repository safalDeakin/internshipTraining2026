
import type { Building } from "../../../../../domain/dayActivity";

type PrintDayActivityProps = {
    building: Building;
};

export function PrintDayActivity({ building }: PrintDayActivityProps) {
    return (
        <div className="print-sheet">

            {/* Header */}
            <div className="print-header">
                <div>
                    <h2>Night Audit Checklist</h2>
                </div>

                <div className="hotel-info">
                    <strong>Vintage Yard Hotel Pvt</strong>
                    <span>Dhulikhel, Kavre</span>
                    <span>011-66543</span>
                </div>

                <div className="print-building">
                    <strong>{building.name}</strong>
                    <span>Date : 2083/01/01</span>
                </div>
            </div>

            {/* Summary */}
            <div className="print-summary">
                {building.summaryItems.map((item) => (
                    <div key={item.label}>
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                        {item.detail && <small>{item.detail}</small>}
                    </div>
                ))}
            </div>

            {/* Checklists */}
            <div className="print-checklists">
                {building.checklists.map((checklist) => (
                    <section key={checklist.title}>
                        <strong>{checklist.title}</strong>

                        {checklist.items.map((item, index) => (
                            <label key={index}>
                                <input type="checkbox" />
                                <span>{item}</span>
                            </label>
                        ))}
                    </section>
                ))}
            </div>

            {/* Payment Reconciliation */}
            <section className="print-table-section">
                <h3>Payment Reconciliation</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Particular</th>
                            <th>Expected (NPR)</th>
                            <th>Verified (NPR)</th>
                            <th>Difference</th>
                        </tr>
                    </thead>

                    <tbody>
                        {building.paymentRows.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index + 1}. {row.name}</td>
                                <td>{row.expected}</td>
                                <td><span className="print-input" /></td>
                                <td>{row.difference ?? "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Revenue Verification */}
            <section className="print-table-section">
                <h3>Room Revenue Verification</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Particular</th>
                            <th>Expected (NPR)</th>
                            <th>Verified (NPR)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {building.revenueRows.map((row, index) => (
                            <tr key={row.id}>
                                <td>{index + 1}. {row.name}</td>
                                <td>{row.expected}</td>
                                <td><span className="print-input" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Remark */}
            <section className="print-remark">
                <strong>Remark</strong>
                <div />
            </section>

            {/* Signatures */}
            <footer className="print-signatures">
                <div>
                    <strong>Checked By :</strong>
                    <span>Signature</span>
                </div>

                <div>
                    <strong>Approved By :</strong>
                    <span>Signature</span>
                </div>
            </footer>
        </div>
    );
}
