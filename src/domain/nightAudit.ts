export interface DetailItem {
    label: string
    value: string
    accent?: "success"
}

export interface RevenueRow {
    id: number
    category: string
    amount: string
    percentage: string
}

export interface TransactionItem {
    category: string
    forecasted: number
    actual: number
}

export interface ExceptionRow {
    id: number
    type: string
    count: number
    duration: string
    priority: string
}

export interface SummaryRow {
    id: number
    name: string
    count: number
    amount: string
}

export interface NightAuditData {
    id:string
    pmsShifts: DetailItem[]
    occupancy: DetailItem[]
    cashBalance: DetailItem[]
    revenueRows: RevenueRow[]
    transactions: TransactionItem[]
    totalVariance: string
    exceptions: ExceptionRow[]
    paymentCollections: SummaryRow[]
    adjustments: SummaryRow[]
    folios: SummaryRow[]
}
