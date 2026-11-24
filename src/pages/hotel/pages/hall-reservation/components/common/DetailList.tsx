import type { DetailItem } from "../../../../../../domain/hallReservation";

export function DetailList({ title, items }: { title: string; items: DetailItem[] }) {
    return (
        <section className="mb-5 break-inside-avoid">
            <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
            <dl className="grid grid-cols-[minmax(96px,0.85fr)_minmax(130px,2fr)] gap-x-4 gap-y-1">
                {items.map((item) => (
                    <div className="contents" key={item.label}>
                        <dt className="text-slate-600">{item.label}</dt>
                        <dd className="font-medium text-slate-800">{item.value}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
