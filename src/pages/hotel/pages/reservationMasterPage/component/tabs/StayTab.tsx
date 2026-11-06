import { useReservationState } from '../../../../../hooks/allReservation/useReservationState';

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex py-2 border-b border-gray-50 last:border-0">
            <span className="w-48 text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800">{value}</span>
        </div>
    );
}

export default function StayTab() {
    const { selectedReservation: r } = useReservationState();
    const [checkIn, checkOut] = r.bookingDate.split(' - ');

    return (
        <div className="py-4 px-2 space-y-5">
            <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Stay Details</h3>
                <div className="border border-gray-200 rounded p-3">
                    <InfoRow label="Reservation Number" value={r.reservationNumber} />
                    <InfoRow label="Check-in Date" value={checkIn?.trim() ?? '-'} />
                    <InfoRow label="Check-out Date" value={checkOut?.trim() ?? '-'} />
                    <InfoRow label="Number of Nights" value={String(r.payment.nights)} />
                    <InfoRow label="Expected Arrival Time" value={r.expectedArrival} />
                    <InfoRow label="Adults" value={String(r.adults)} />
                    <InfoRow label="Children" value={String(r.children)} />
                    <InfoRow label="Source" value={r.source} />
                    <InfoRow label="Rate Plan" value={r.ratePlan} />
                    <InfoRow label="Reservation Status" value={r.reservationStatus} />
                </div>
            </div>
        </div>
    );
}
