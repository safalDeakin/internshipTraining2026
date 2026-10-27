import type { RefundData, TableColumn } from '../types/receipts'
import { DocumentHeader } from './DocumentHeader'
import { InfoCard } from './InfoCard'
import { ReceiptTable } from './ReceiptTable'

const columns: TableColumn[] = [
    { key: 'no', label: 'S.No.' },
    { key: 'description', label: 'Description', align: 'center' },
    { key: 'original', label: 'Original Amount', align: 'center' },
    { key: 'amount', label: 'Refund Amount', align: 'right' },
]

export function RefundReceipt({ data }: { data: RefundData }) {
    return (
        <article className="a4-page">
            <DocumentHeader />
            <div className="refund-heading">
                <p>Refund Receipt No: {data.receiptNumber}</p>
                <p>Refund Date: {data.date}</p>
                <h2>Guest Information</h2>
            </div>
            <InfoCard items={data.guest} />
            <section className="table-section refund-table">
                <h2>Refund Summary</h2>
                <ReceiptTable columns={columns} rows={data.rows} />
                <div className="table-total"><span>Total Paid</span><span>Rs 5,000</span></div>
            </section>
            <section className="refund-notes">
                <div><strong>Amount In Word</strong><b>Seven Thousand Nine Hundred Ninety Five</b></div>
                <div><strong>Refund Reason</strong><b>Reservation Cancellation</b></div>
            </section>
            <footer className="refund-footer">
                <strong>Signature</strong>
                <span><strong>Refund By :</strong> Utsha Shrestha</span>
            </footer>
        </article>
    )
}
