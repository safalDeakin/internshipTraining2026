import type { InvoiceData, TableColumn } from '../types/receipts'
import { DocumentHeader } from './DocumentHeader'
import { InfoCard } from './InfoCard'
import { ReceiptTable } from './ReceiptTable'

const columns: TableColumn[] = [
    { key: 'no', label: 'S.No.' },
    { key: 'description', label: 'Description' },
    { key: 'date', label: 'Date', align: 'center' },
    { key: 'quantity', label: 'Quantity', align: 'center' },
    { key: 'rate', label: 'Rate', align: 'right' },
    { key: 'amount', label: 'Amount', align: 'right' },
]

export function Invoice({ data }: { data: InvoiceData }) {
    return (
        <article className="a4-page invoice-page">
            <DocumentHeader />
            <div className="document-number">
                <strong>{data.invoiceNumber}</strong>
                <strong>{data.date}</strong>
            </div>
            <div className="two-column-info">
                <section>
                    <h2>Guest Information</h2>
                    <InfoCard items={data.guest} />
                </section>
                <section>
                    <h2>Reservation Information</h2>
                    <InfoCard items={data.reservation} />
                </section>
            </div>
            <ReceiptTable columns={columns} rows={data.rows} />
            <div className="totals">
                <div><span>Subtotal</span><span>Rs 6,500</span></div>
                <div><span>Tax (13% Vat)</span><strong>Rs 845</strong></div>
                <div><span>10% Service charge</span><strong>Rs 650</strong></div>
                <div className="grand-total"><span>Total</span><strong>Rs 7,995</strong></div>
            </div>
            <section className="payment-summary">
                <h2>Payment Summary</h2>
                <p><span>Advance Payment</span><span>Rs. 2,000</span></p>
                <p><span>Outstanding Payment</span><span className="red">Rs. 5,995</span></p>
            </section>
        </article>
    )
}
