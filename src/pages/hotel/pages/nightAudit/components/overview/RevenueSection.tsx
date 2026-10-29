

import TransactionChart from "./TransactionChart";
import ExceptionsTable from "./ExceptionsTable";
import type { ExceptionRow, TransactionItem } from "../../../../../../domain/nightAudit";

interface RevenueSectionProps {
    transactions: TransactionItem[];
    totalVariance: string;
    exceptions: ExceptionRow[];
}

export default function RevenueSection({
    transactions,
    totalVariance,
    exceptions,
}: RevenueSectionProps) {
    return (
        <section className="revenue-section">
            <h2 className="section-title">Revenue</h2>

            <div className="revenue-grid">
                <TransactionChart
                    transactions={transactions}
                    totalVariance={totalVariance}
                />

                <ExceptionsTable rows={exceptions} />
            </div>
        </section>
    );
}