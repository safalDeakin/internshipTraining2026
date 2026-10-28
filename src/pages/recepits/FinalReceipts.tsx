import { Invoice } from './components/Invoice'
import { PaymentReceipt } from './components/PaymentReceipt'
import { RefundReceipt } from './components/RefundReceipt'
import { useReceiptData } from './hooks/useReceiptData'
import "./styles/styles.css"

export default function FinalReceipts() {
    const data = useReceiptData()

    return (
        <main className="document-list">
            <Invoice data={data.invoice} />
            <PaymentReceipt data={data.payment} />
            <RefundReceipt data={data.refund} />
        </main>
    )
}
