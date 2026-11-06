
import type { DetailItem } from "../../../../../../domain/nightAudit";
import CardTitle from "../shared/CardTitle";
import DetailGrid from "../shared/DetailGrid";

interface OverviewCardProps {
    title: string;
    items: DetailItem[];
    variant: "shifts" | "occupancy";
}

export default function OverviewCard({
    title,
    items,
    variant,
}: OverviewCardProps) {
    return (
        <section className={`overview-card overview-card--${variant}`}>
            <CardTitle>{title}</CardTitle>
            <DetailGrid items={items} />
        </section>
    );
}