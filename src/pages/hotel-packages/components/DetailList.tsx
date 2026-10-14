import type { DetailField } from "../types/package"

export function DetailList({
    items,
    className = "",
}: {
    items: DetailField[]
    className?: string
}) {
    return (
        <dl className={`space-y-2 ${className}`}>
            {items.map((item) => (
                <div
                    className="grid grid-cols-[minmax(110px,0.75fr)_minmax(0,1.4fr)] gap-3"
                    key={item.label}
                >
                    <dt className="text-[#696965]">{item.label}</dt>
                    <dd className="font-medium text-[#292927]">{item.value}</dd>
                </div>
            ))}
        </dl>
    )
}
