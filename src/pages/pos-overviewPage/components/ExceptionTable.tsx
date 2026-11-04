import type { ExceptionRow } from "../../../domain/pos.overview";


export function ExceptionTable({ rows }: { rows: ExceptionRow[] }) {
    return (
        <div className="overflow-hidden">
            <div className="grid grid-cols-[1.55fr_.45fr_.62fr_.8fr] border-b border-[#edf0f2] pb-2 text-[12px] text-[#8c98a2]">
                <span>Exception Type ↓</span>
                <span>Count</span>
                <span>Value</span>
                <span>Recovery Potential</span>
            </div>
            <div>
                {rows.map((row, index) => (
                    <div
                        key={row.name}
                        className="grid min-h-8 grid-cols-[1.55fr_.45fr_.62fr_.8fr] items-center border-b border-[#edf0f2] text-[11px]"
                    >
                        <span className="text-[#4b9bc6]">
                            {index + 1}. {row.name}
                        </span>
                        <span>{row.count}</span>
                        <span>{row.value}</span>
                        <span>{row.recovery}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
