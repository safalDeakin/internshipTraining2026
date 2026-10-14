import { useReservationState } from '../../../../hooks/allReservation/useReservationState';

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex py-1">
            <span className="w-48 text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800">{value || '-'}</span>
        </div>
    );
}

export default function ReservationInfo() {
    const { selectedReservation: r } = useReservationState();

    return (
        <div className="px-4 py-3 border-b border-gray-200 bg-white shrink-0">
            <div className="grid grid-cols-1 gap-x-8">
                <div>
                    <Field label="Reservation Number" value={r.reservationNumber} />
                    <Field label="Booking Date" value={r.bookingDate} />
                    <Field label="Reservation Status" value={r.reservationStatus} />
                    <Field label="Source" value={r.source} />
                </div>
                <div>
                    <Field label="Rate Plan" value={r.ratePlan} />
                    <Field label="Adult" value={String(r.adults)} />
                    <Field label="Children" value={String(r.children)} />
                    <Field label="Expected Arrival Time" value={r.expectedArrival} />
                </div>
            </div>
        </div>
    );
}
