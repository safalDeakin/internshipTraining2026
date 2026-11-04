
import type { POSOverview } from '../../../domain/pos.overview'
import { BarChart } from './BarChart'
import { ExceptionTable } from './ExceptionTable'
import { Panel, SectionTitle, SelectField } from './ui'

const overview = [
    ['Total Transaction', '120'],
    ['Total Item Sold', '231'],
    ['Net Revenue', '23000'],
    ['Gross Revenue', 'Rs.3000'],
    ['Tax Collected', '4'],
    ['Discounts', '24'],
    ['Exception Recovery', '23000'],
    ['Collection Contribution', '1'],
    ['Expenses', 'Rs.30000'],
    ['Total Returns', '25'],
    ['Total Voids', '125'],
    ['Total Item Voids', 'Rs.1000'],
]

export function CollectionSummary({ data }: { data: POSOverview }) {
    return (
        <Panel className="p-4 sm:p-6">
            <SectionTitle>Collection Summary</SectionTitle>
            <div className="border border-[#e2e7ea]">
                <div className="border-b border-[#e8ecef] p-4">
                    <h3 className="mb-3 text-[12px] font-medium">Overview</h3>
                    <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
                        {overview.map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-3 text-[11px]">
                                <span className="text-[#82909b]">{label}</span>
                                <strong className="font-medium">{value}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto p-4">
                    <div className="min-w-130">
                        <div className="grid grid-cols-4 border-b border-[#e9edf0] pb-2 text-[11px] text-[#8c98a2]">
                            <span>Payment Method ↓</span>
                            <span className="text-center">Transactions</span>
                            <span className="text-right">Sales Amount</span>
                            <span className="text-right">Tax Amount</span>
                        </div>
                        {data.paymentMethods.map((method, index) => (
                            <div key={method} className="grid grid-cols-4 border-b border-[#edf0f2] py-2 text-[11px]">
                                <span className="text-[#4b9bc6]">{index + 1}. {method}</span>
                                <span className="text-center">0</span>
                                <span className="text-right">2000</span>
                                <span className="text-right">140</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <SectionTitle>Cost and inventory</SectionTitle>
                <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
                    <div className="border border-[#e2e7ea] p-3">
                        <div className="mb-3 flex flex-wrap items-center gap-4">
                            <span className="text-[12px] font-medium">Transaction Exceptions</span>
                            <span className="text-[11px] text-[#7f8c96]">Total Variances: 23000+</span>
                            <div className="ml-auto"><SelectField label="Product" /></div>
                        </div>
                        <BarChart data={data.chartData} compact />
                    </div>
                    <div className="border border-[#e2e7ea] p-3">
                        <ExceptionTable rows={data.exceptionRows} />
                    </div>
                </div>
            </div>
        </Panel>
    )
}
