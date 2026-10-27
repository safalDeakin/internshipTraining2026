export type InfoItem = {
    label: string
    value: string
}

export type TableColumn = {
    key: string
    label: string
    align?: 'left' | 'center' | 'right'
}

export type TableRow = Record<string, string>

export type InvoiceData = {
    invoiceNumber: string
    date: string
    guest: InfoItem[]
    reservation: InfoItem[]
    rows: TableRow[]
}

export type PaymentData = {
    receiptNumber: string
    date: string
    guest: InfoItem[]
    invoice: InfoItem[]
    rows: TableRow[]
}

export type RefundData = {
    receiptNumber: string
    date: string
    guest: InfoItem[]
    rows: TableRow[]
}
