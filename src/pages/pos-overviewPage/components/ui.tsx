import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export function Panel({
    children,
    className = '',
}: {
    children: ReactNode
    className?: string
}) {
    return <section className={`bg-white ${className}`}>{children}</section>
}

export function SectionTitle({
    children,
    action,
}: {
    children: ReactNode
    action?: ReactNode
}) {
    return (
        <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-[12px] font-semibold text-[#253544]">{children}</h2>
            {action}
        </div>
    )
}

export function SelectField({ label }: { label: string }) {
    return (
        <button className="flex h-7 min-w-28 items-center justify-between gap-4 rounded-sm border border-[#e2e7eb] bg-white px-2.5 text-[9px] text-[#8b98a3]">
            {label}
            <ChevronDown size={11} strokeWidth={1.8} />
        </button>
    )
}

export function Legend() {
    return (
        <div className="flex items-center gap-4 text-[9px] text-[#81909c]">
            <span className="flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-full bg-[#5960d9]" /> Forecasted
            </span>
            <span className="flex items-center gap-1.5">
                <i className="h-2 w-2 rounded-full bg-[#f5bf04]" /> Actual Sales
            </span>
        </div>
    )
}
