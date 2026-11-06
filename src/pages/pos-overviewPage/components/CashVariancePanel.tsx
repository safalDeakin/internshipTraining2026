
import type { ChartData } from '../../../domain/pos.overview'
import { BarChart } from './BarChart'
import { Panel, SectionTitle } from './ui'

export function CashVariancePanel({
    chartData,
    heatmap,
}: {
    chartData: ChartData[]
    heatmap: number[][]
}) {
    const shades = ['bg-[#fff6ed]', 'bg-[#fee0c4]', 'bg-[#ffc68d]', 'bg-[#ffab64]', 'bg-[#ff8b3d]', 'bg-[#ff6b21]']

    return (
        <Panel className="p-4 border-none sm:p-6">
            <SectionTitle>Cash Variances</SectionTitle>
            <div className="grid gap-5 lg:grid-cols-[.82fr_1.72fr]">
                <div className="border border-[#e5e9ec] p-3">
                    <div className="mb-5 flex items-center justify-between text-[12px]">
                        <span>HeatMap</span>
                        <button className="text-[#7380c9]">All⌄</button>
                    </div>
                    <div className="mb-3 grid grid-cols-7 text-center text-[11px] text-[#7e8a93]">
                        {'SMTWTFS'.split('').map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                        {heatmap.flatMap((week, row) =>
                            week.map((level, col) => (
                                <div
                                    key={`${row}-${col}`}
                                    className={`aspect-square rounded-[1px] ${shades[level]}`}
                                />
                            )),
                        )}
                    </div>
                </div>

                <div className="border border-[#e5e9ec] p-3">
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-[12px] font-medium">Todays Cash Varience</span>
                        <span className="text-[11px] text-[#7f8c96]">Total Variance: 23000+</span>
                    </div>
                    <BarChart data={chartData} compact />
                </div>
            </div>
        </Panel>
    )
}
