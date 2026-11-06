import type { DetailItem } from "../../../../../../domain/nightAudit";


interface DetailGridProps {
    items: DetailItem[];
}

export default function DetailGrid({ items }: DetailGridProps) {
    return (
        <dl className="detail-grid">
            {items.map((item) => (
                <div className="detail-pair" key={item.label}>
                    <dt>{item.label}</dt>

                    <dd className={item.accent === "success" ? "status" : undefined}>
                        {item.accent === "success" && (
                            <span className="status-dot" aria-hidden="true" />
                        )}

                        {item.value}
                    </dd>
                </div>
            ))}
        </dl>
    );
}