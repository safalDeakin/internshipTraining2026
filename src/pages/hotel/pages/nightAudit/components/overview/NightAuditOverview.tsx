import { useNightAuditHook } from "../../context/NightAuditProvider";
import OverviewCard from "./OverviewCard";
import RevenueOverview from "./RevenueOverview";
import RevenueSection from "./RevenueSection";
import SummaryTable from "./SummaryTable";
import "../../styles/nightAudit.css"

export function NightAuditOverview() {
    const { data: nightAudits } = useNightAuditHook();

    const data = nightAudits[0];

    if (!data) {
        return <p>No Night Audit data available.</p>;
    }

    return (
        <main className="night-audit-shell">
            <div className="report">
                <header className="report-header">
                    <h1>Overview</h1>
                </header>

                <div className="overview-grid">
                    <OverviewCard
                        title="PMS Shifts"
                        items={data.pmsShifts}
                        variant="shifts"
                    />

                    <OverviewCard
                        title="Room & Occupancy Snapshot"
                        items={data.occupancy}
                        variant="occupancy"
                    />
                </div>

                <RevenueOverview
                    cashBalance={data.cashBalance}
                    revenueRows={data.revenueRows}
                />

                <RevenueSection
                    transactions={data.transactions}
                    totalVariance={data.totalVariance}
                    exceptions={data.exceptions}
                />

                <SummaryTable
                    title="Payment Collection Summary"
                    firstColumn="Payment Method"
                    rows={data.paymentCollections}
                />

                <SummaryTable
                    title="Adjustment/Discount/Refund"
                    firstColumn="Deduction"
                    rows={data.adjustments}
                />

                <SummaryTable
                    title="Folio Summary"
                    firstColumn="Folio Type"
                    rows={data.folios}
                />
            </div>
        </main>
    );
}