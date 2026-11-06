import { Download, Printer } from "lucide-react"

const buttonClass =
    "flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-medium text-slate-800 shadow-[0_1px_5px_rgba(15,23,42,0.04)] transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:text-xs"

export function ActionButtons() {
    return (
        <div className="flex gap-3">
            <button className={buttonClass} type="button">
                <Printer aria-hidden="true" className="size-4" strokeWidth={1.8} />
                Print Pro-Forma
            </button>
            <button className={buttonClass} type="button">
                <Download aria-hidden="true" className="size-4" strokeWidth={1.8} />
                Download PDF
            </button>
        </div>
    )
}
