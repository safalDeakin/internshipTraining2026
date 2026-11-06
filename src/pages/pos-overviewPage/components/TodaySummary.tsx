import {
    BanknoteArrowDown,
    Clock3,
    Download,
    FileText,
    Monitor,
    PackageCheck,
    ReceiptText,
    ScanLine,
    Utensils,
} from 'lucide-react'
import { BarChart } from './BarChart'
import { ExceptionTable } from './ExceptionTable'
import { Panel, SectionTitle, SelectField } from './ui'
import type { POSOverview } from '../../../domain/pos.overview'

const metrics = [
    ['Active', '12'],
    ['Pending', '3'],
    ['Closed and Approved', '9'],
    ['Terminal Online', '5'],
    ['Total Staffs', '5'],
    ['Total Hours', '10'],
]

const sales = [
    ['Total Item Sold', '125'],
    ['Net Sales', 'Rs.30000'],
    ['Total Collected', 'Rs.24000'],
    ['Gross Sale', 'Rs.25000'],
    ['Total Tax', 'Rs.5000'],
    ['Total Discounts', 'Rs.1000'],
]

const shortcuts = [
    { label: 'Record\nUnavailability', icon: Utensils, accent: '#ff7043' },
    { label: 'Run Pos', icon: Monitor, accent: '#2c81e8' },
    { label: 'Record\nExpenses', icon: ReceiptText, accent: '#20c979' },
    { label: 'View Pending\nApproval', icon: Clock3, accent: '#ffad55' },
]

export function TodaySummary({ data }: { data: POSOverview }) {
    return (
        <Panel className="p-4 border-none sm:p-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                    <h1 className="text-[13px] font-semibold">Todays Summary</h1>
                    <span className="text-[10px] text-[#8b98a2]">( last record 5 July 2026)</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button className="h-8 rounded bg-[#497dae] px-3 text-[9px] font-medium text-white">
                        Open Shell
                    </button>
                    <TopAction icon={BanknoteArrowDown} label="Cash Movement" />
                    <TopAction icon={PackageCheck} label="Item Status" />
                    <TopAction icon={Download} label="Export CSV" plain />
                    <TopAction icon={FileText} label="Download Pdf" plain />
                </div>
            </header>

            <div className="mt-7">
                <SectionTitle>Overview</SectionTitle>
                <div className="grid gap-5 border border-[#e1e6ea] p-4 md:grid-cols-2">
                    <MetricBlock title="POS Shifts" items={metrics} />
                    <MetricBlock title="Sales" items={sales} />
                </div>
            </div>

            <div className="mt-5">
                <SectionTitle>Shortcuts Actions</SectionTitle>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {shortcuts.map(({ label, icon: Icon, accent }) => (
                        <button
                            key={label}
                            className="relative flex min-h-16 items-center justify-center rounded-sm border border-[#e0e6ea] bg-white px-3 shadow-[0_3px_7px_rgba(34,57,76,0.1)] transition-transform hover:-translate-y-0.5"
                        >
                            <i className="absolute inset-y-2 left-0 w-0.75 rounded-r" style={{ background: accent }} />
                            <span className="whitespace-pre-line text-center text-[10px] leading-tight text-[#3d4952]">
                                {label}
                            </span>
                            <Icon className="absolute right-2 top-2 text-[#36586a]" size={15} strokeWidth={1.8} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <SectionTitle>Exceptions</SectionTitle>
                <div className="grid gap-5 border border-[#e1e6ea] p-3 lg:grid-cols-[1.08fr_.92fr]">
                    <div>
                        <div className="mb-3 flex flex-wrap items-center gap-5">
                            <span className="text-[11px] font-medium">Transaction Exceptions</span>
                            <span className="text-[9px] text-[#7f8c96]">Total Variances: 23000+</span>
                            <div className="ml-auto">
                                <SelectField label="Product" />
                            </div>
                        </div>
                        <BarChart data={data.chartData} compact />
                    </div>
                    <ExceptionTable rows={data.exceptionRows} />
                </div>
            </div>
        </Panel>
    )
}

function MetricBlock({ title, items }: { title: string; items: string[][] }) {
    return (
        <div>
            <h3 className="border-b border-[#e4e8eb] pb-2 text-[12px] font-medium">{title}</h3>
            <div className="grid grid-cols-2 gap-x-7 pt-2">
                {items.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-2 text-[11px] leading-5">
                        <span className="text-[#7b8994]">{label}</span>
                        <strong className="font-medium text-[#33424d]">{value}</strong>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TopAction({
    icon: Icon,
    label,
    plain = false,
}: {
    icon: typeof ScanLine
    label: string
    plain?: boolean
}) {
    return (
        <button
            className={`flex h-8 items-center gap-1.5 px-2 text-[9px] ${plain ? 'text-[#596873]' : 'rounded border border-[#dbe2e7] bg-white'
                }`}
        >
            <Icon size={12} strokeWidth={1.8} />
            {label}
        </button>
    )
}
