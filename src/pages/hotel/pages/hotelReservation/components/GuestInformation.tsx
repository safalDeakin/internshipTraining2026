import { Field, FormActions, FormShell } from './FormFields'
import type { GuestDetails } from '../../../hooks/hotelReservation/useReservationFlow'

type Props = {
    data: GuestDetails
    onChange: (field: keyof GuestDetails, value: string) => void
    onBack: () => void
    onNext: () => void
}

export function GuestInformation({ data, onChange, onBack, onNext }: Props) {
    return (
        <FormShell title="Guest information">
            <div className="mb-7 flex flex-wrap items-center gap-5 text-sm">
                <span className="font-semibold text-slate-700">Guest type</span>
                <label className="flex items-center gap-2"><input type="radio" name="guest" checked={data.guestType === 'individual'} onChange={() => onChange('guestType', 'individual')} /> Individual</label>
                <label className="flex items-center gap-2"><input type="radio" name="guest" checked={data.guestType === 'company'} onChange={() => onChange('guestType', 'company')} /> Company</label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="First name" value={data.firstName} onChange={(value) => onChange('firstName', value)} />
                <Field label="Last name" value={data.lastName} onChange={(value) => onChange('lastName', value)} />
                <Field label="Phone number" type="tel" value={data.phone} onChange={(value) => onChange('phone', value)} />
                <Field label="Email address" type="email" value={data.email} onChange={(value) => onChange('email', value)} />
                <Field label="Address" value={data.address} onChange={(value) => onChange('address', value)} />
                <Field label="ID type" placeholder="Passport or identity card" value={data.idType} onChange={(value) => onChange('idType', value)} />
                <Field label="ID number" value={data.idNumber} onChange={(value) => onChange('idNumber', value)} />
            </div>
            <FormActions onBack={onBack} onNext={onNext} nextLabel="Next" />
        </FormShell>
    )
}
