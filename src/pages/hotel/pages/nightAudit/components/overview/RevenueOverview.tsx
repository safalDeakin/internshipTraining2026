
import type { DetailItem } from "../../../../../../domain/nightAudit";
import CardTitle from "../shared/CardTitle";
import DetailGrid from "../shared/DetailGrid";
import RevenueTable from "./RevenueTable";

type RevenueRows = React.ComponentProps<typeof RevenueTable>["rows"];

interface RevenueOverviewProps {
    cashBalance: DetailItem[];
    revenueRows: RevenueRows;
}

export default function RevenueOverview({
    cashBalance,
    revenueRows,
}: RevenueOverviewProps) {
    return (
        <section className="revenue-overview">
            <h2 className="section-title">Revenue Overview</h2>

            <div className="cash-card">
                <CardTitle>Cash Balance</CardTitle>
                <DetailGrid items={cashBalance} />
            </div>

            <RevenueTable rows={revenueRows} />
        </section>
    );
}