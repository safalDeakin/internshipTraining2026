import { BedIcon } from "../Icons";
import type { StatusSummary } from "../model/roomStatusTypes";

export function StatusSummaryCards({ summaries }: { summaries: StatusSummary[] }) {
    return (
        <section className="summary-grid" aria-label="Room status summary">
            {summaries.map((summary) => (
                <article className={`summary-card ${summary.tone}`} key={summary.label}>
                    <span className="summary-icon"><BedIcon /></span>
                    <span>
                        <strong>{summary.value}</strong>
                        <small>{summary.label}</small>
                    </span>
                </article>
            ))}
        </section>
    );
}
