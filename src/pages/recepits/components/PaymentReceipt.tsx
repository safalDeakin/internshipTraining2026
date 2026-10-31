import type { PaymentData, TableColumn } from '../types/receipts'
import { DocumentHeader } from './DocumentHeader'
import { InfoCard } from './InfoCard'
import { ReceiptTable } from './ReceiptTable'

const columns: TableColumn[] = [
    { key: 'no', label: 'S.No.' },
    { key: 'method', label: 'Payment Method', align: 'center' },
    { key: 'reference', label: 'Reference/Transaction Id', align: 'center' },
    { key: 'amount', label: 'Amount', align: 'right' },
]

export function PaymentReceipt({ data }: { data: PaymentData }) {
    return (
        <article className="a4-page">
            <DocumentHeader />
            <div className="receipt-heading">
                <strong>Receipt No: {data.receiptNumber}</strong>
                <strong>Date: {data.date}</strong>
                <h2>Guest Information</h2>
            </div>
            <div className="two-column-info receipt-info">
                <InfoCard items={data.guest} />
                <InfoCard items={data.invoice} />
            </div>
            <section className="table-section">
                <h2>Payment Summary</h2>
                <ReceiptTable columns={columns} rows={data.rows} />
                <div className="table-total"><span>Total Paid</span><strong>Rs 7,995</strong></div>
            </section>
            <section className="receipt-notes">
                <div><strong>Amount In Word</strong><b>Seven Thousand Nine Hundred Ninety Five</b></div>
                <p><strong>Received By :</strong> Utsha Shrestha</p>
                <strong>Signature</strong>
            </section>
        </article>
    )
}
