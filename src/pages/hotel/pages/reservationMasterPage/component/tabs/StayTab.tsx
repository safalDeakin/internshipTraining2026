import { useReservationDetail } from '../../provider/detailProvider/useReservationDetail';

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex py-2 border-b border-gray-50 last:border-0">
            <span className="w-48 text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800">{value}</span>
        </div>
    );
}

export default function StayTab() {
    const reservation = useReservationDetail();
    const info = reservation.info;
    const [checkIn, checkOut] = info.bookingDate.split(' - ');

    return (
        <div className="py-4 px-2 space-y-5">
            <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Stay Details</h3>
                <div className="border border-gray-200 rounded p-3">
                    <InfoRow label="Reservation Number" value={info.reservationCode} />
                    <InfoRow label="Check-in Date" value={checkIn?.trim() ?? '-'} />
                    <InfoRow label="Check-out Date" value={checkOut?.trim() ?? '-'} />
                    <InfoRow label="Number of Nights" value={String(reservation.payment.nights)} />
                    <InfoRow label="Expected Arrival Time" value={info.expectedArrival} />
                    <InfoRow label="Adults" value={String(info.adults)} />
                    <InfoRow label="Children" value={String(info.kids)} />
                    <InfoRow label="Source" value={info.source} />
                    <InfoRow label="Rate Plan" value={info.ratePlan} />
                    <InfoRow label="Reservation Status" value={info.status} />
                </div>
            </div>
        </div>
    );
}
