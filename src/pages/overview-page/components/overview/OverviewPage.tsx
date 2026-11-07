
import OverviewCard from "./OverviewCard";
import RevenueSection from "./RevenueSection";
import SummaryTable from "./SummaryTable";
import { useOverViewHook } from "../../hooks/useOverviewHook";
import OverviewTable from "./OverviewTable";
import CardTitle from "../shared/CardTitle";
import "../../styles/overviewPage.css"

export function OverviewPage() {
    const data = useOverViewHook();

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
                <h1 className="ml-10">
                    <CardTitle>Operational Overview</CardTitle>
                </h1>

                <div className="overview-grid">
                    <OverviewCard
                        title="Overview"
                        items={data.overview}
                        variant="shifts"
                    />

                    <OverviewCard
                        title=""
                        items={data.overview2}
                        variant="occupancy"
                    />
                </div>

                <OverviewTable
                    rows={data.overviewRows}
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
            </div>
        </main>
    );
}