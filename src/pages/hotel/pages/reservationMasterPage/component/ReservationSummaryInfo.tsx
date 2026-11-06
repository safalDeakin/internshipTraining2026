import { useReservationDetail } from "../provider/detailProvider/useReservationDetail";


function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex py-1">
            <span className="w-48 text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800">{value || '-'}</span>
        </div>
    );
}


export function ReservationSummaryInfo() {
    const { info } = useReservationDetail();
    return (
        <div className="px-4 py-3 border-b border-gray-200 bg-white shrink-0">
            <div className="grid grid-cols-1 gap-x-8">
                <div>
                    <Field label="Reservation Number" value={info.reservationCode} />
                    <Field label="Booking Date" value={info.bookingDate} />
                    <Field label="Reservation Status" value={info.status} />
                    <Field label="Source" value={info.source} />
                </div>
                <div>
                    <Field label="Rate Plan" value={info.ratePlan} />
                    <Field label="Adult" value={String(info.adults)} />
                    <Field label="Children" value={String(info.kids)} />
                    <Field label="Expected Arrival Time" value={info.expectedArrival} />
                </div>
            </div>
        </div>
    );
}