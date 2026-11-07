import type { InfoItem } from '../types/receipts'

export function InfoCard({ items }: { items: InfoItem[] }) {
    return (
        <div className="info-card">
            {items.map((item) => (
                <div className="info-row" key={item.label}>
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                </div>
            ))}
        </div>
    )
}
