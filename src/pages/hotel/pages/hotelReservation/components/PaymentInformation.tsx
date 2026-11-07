import { CreditCard } from 'lucide-react'
import { Field, FormActions, FormShell } from './FormFields'
import type { PaymentDetails } from '../../../hooks/hotelReservation/useReservationFlow'

type Props = {
    data: PaymentDetails
    onChange: (field: keyof PaymentDetails, value: string) => void
    onBack: () => void
    onSubmit: () => void
}

export function PaymentInformation({ data, onChange, onBack, onSubmit }: Props) {
    return (
        <FormShell title="Payment information">
            <div className="mb-7 flex flex-wrap items-center gap-5 text-sm">
                <span className="font-semibold text-slate-700">Advance payment</span>
                <label className="flex items-center gap-2"><input type="radio" name="advance" checked={data.advancePayment === 'yes'} onChange={() => onChange('advancePayment', 'yes')} /> Yes</label>
                <label className="flex items-center gap-2"><input type="radio" name="advance" checked={data.advancePayment === 'no'} onChange={() => onChange('advancePayment', 'no')} /> No</label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Payment method</span>
                    <span className="relative block">
                        <CreditCard className="absolute left-3 top-3 text-slate-400" size={18} />
                        <select className="form-control pl-10" value={data.paymentMethod} onChange={(event) => onChange('paymentMethod', event.target.value)}>
                            <option value="card">Credit or debit card</option>
                            <option value="cash">Cash</option>
                            <option value="bank">Bank transfer</option>
                        </select>
                    </span>
                </label>
                <Field label="Amount" placeholder="$50.00" value={data.amount} onChange={(value) => onChange('amount', value)} />
                <Field label="Card type" placeholder="Visa" value={data.cardType} onChange={(value) => onChange('cardType', value)} />
                <Field label="Card holder name" value={data.cardHolderName} onChange={(value) => onChange('cardHolderName', value)} />
                <Field label="Card number" placeholder="0000 0000 0000 0000" value={data.cardNumber} onChange={(value) => onChange('cardNumber', value)} />
                <Field label="Bank name" value={data.bankName} onChange={(value) => onChange('bankName', value)} />
            </div>
            <FormActions onBack={onBack} onNext={onSubmit} nextLabel="Make reservation" />
        </FormShell>
    )
}
