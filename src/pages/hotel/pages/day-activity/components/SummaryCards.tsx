import type { SummaryItem } from "../../../../../domain/dayActivity";

type SummaryCardsProps = {
    items: SummaryItem[];
};

export function SummaryCards({ items }: SummaryCardsProps) {
    return (
        <section className="grid grid-cols-2 border border-[#dfe2e4] bg-white shadow-[0_1px_2px_rgba(0,0,0,.04)] sm:grid-cols-4">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="flex min-h-15.75 flex-col items-center justify-center border-[#eceeef] px-2 py-2 text-center even:border-l sm:border-l first:sm:border-l-0"
                >
                    <p className="max-w-26.25 text-[10px] font-semibold leading-[1.15] text-[#20282d]">
                        {item.label}
                    </p>
                    <p className="mt-1 text-[10px] leading-[1.15] text-[#343d42]">{item.value}</p>
                    {item.detail && (
                        <p className="text-[10px] leading-[1.15] text-[#343d42]">{item.detail}</p>
                    )}
                </div>
            ))}
        </section>
    );
}
