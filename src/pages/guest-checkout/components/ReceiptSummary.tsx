import type { FolioData } from "../data/guestCheckout.data"


type ReceiptSummaryProps = {
    receipt: FolioData["receipt"]
}

export function ReceiptSummary({ receipt }: ReceiptSummaryProps) {
    return (
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.05)] lg:p-6">
            <header className="mb-8 text-center">
                <h2 className="font-serif text-sm font-semibold tracking-wide text-slate-900 sm:text-base">
                    {receipt.propertyName}
                </h2>
                <p className="mt-1 font-serif text-[9px] text-slate-400 sm:text-[10px]">
                    {receipt.documentName}
                </p>
            </header>

            <div className="space-y-3 text-[10px] sm:text-xs">
                {receipt.lines.map((line, index) => (
                    <div
                        className={`flex items-center justify-between gap-4 ${index === receipt.lines.length - 1
                                ? "border-t border-dashed border-slate-200 pt-3"
                                : ""
                            }`}
                        key={line.label}
                    >
                        <span className="text-slate-400">{line.label}</span>
                        <span
                            className={
                                line.credit
                                    ? "font-medium text-emerald-500"
                                    : "font-medium text-slate-800"
                            }
                        >
                            {line.amount}
                        </span>
                    </div>
                ))}
            </div>

            <div className="my-5 bg-[#fff8f5] px-4 py-3 text-center">
                <p className="text-[9px] uppercase tracking-wide text-slate-400 sm:text-[10px]">
                    Net Payable Amount
                </p>
                <p className="mt-1 text-2xl font-bold leading-none text-orange-500 sm:text-3xl">
                    {receipt.total}
                </p>
            </div>

            <p className="text-center text-[9px] text-slate-400 sm:text-[10px]">
                {receipt.note}
            </p>
        </section>
    )
}
