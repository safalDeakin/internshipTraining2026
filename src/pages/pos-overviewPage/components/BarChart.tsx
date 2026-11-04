
import type { ChartData } from '../../../domain/pos.overview'
import { Legend, SelectField } from './ui'

export function BarChart({
    data,
    compact = false,
}: {
    data: ChartData[]
    compact?: boolean
}) {
    const max = 250

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <Legend />
                <SelectField label="Product" />
            </div>

            <div className={`relative mt-4 pl-8 ${compact ? 'h-48' : 'h-60'}`}>
                <div className="absolute inset-x-8 inset-y-0 flex flex-col justify-between">
                    {[250, 200, 150, 100, 50, 0].map((tick) => (
                        <div key={tick} className="relative border-t border-dashed border-[#e5e9ed]">
                            <span className="absolute -left-8 -top-1.5 text-[8px] text-[#8c98a2]">
                                {tick}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-x-9 inset-y-0 flex items-end justify-around gap-2">
                    {data.map((item) => (
                        <div key={item.label} className="flex h-full min-w-0 flex-1 flex-col justify-end">
                            <div className="flex h-[calc(100%-38px)] items-end justify-center gap-0.5">
                                <Bar value={item.forecasted} max={max} color="bg-[#545bd8]" />
                                <Bar value={item.actual} max={max} color="bg-[#f5bf04]" />
                            </div>
                            <div className="mt-2 h-8 text-center text-[7px] leading-tight text-[#61707c] sm:text-[8px]">
                                <div className="truncate">{item.label}</div>
                                <div>{item.time}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <span className="absolute -left-4 top-1/2 -rotate-90 text-[8px] text-[#667580]">
                    $ Sales Average
                </span>
            </div>
            <div className="mt-1 text-center text-[8px] text-[#63717c]">Category</div>
            <div className="mt-1 text-right text-[7px] text-[#8b97a0]">Scale : Time in Hours</div>
        </div>
    )
}

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
    return (
        <div
            className={`relative w-[42%] max-w-8 rounded-t-[1px] ${color}`}
            style={{ height: `${(value / max) * 100}%` }}
        >
            <span className="absolute inset-x-0 top-1 text-center text-[6px] text-white">
                {(value / 50).toFixed(1)}
            </span>
        </div>
    )
}
