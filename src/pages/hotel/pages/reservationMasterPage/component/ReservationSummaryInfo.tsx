

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex py-1">
            <span className="w-48 text-xs text-gray-500 shrink-0">{label}</span>
            <span className="text-xs text-gray-800">{value || '-'}</span>
        </div>
    );
}

type ReservationSummaryProps = {
    reservationCode: string,
    bookingDate: string,
    reservationStatus: string,
    source: string,
    ratePlan: string,
    adults: number,
    kids: number,
    expectedArrival: string
};


export function ReservationSummaryInfo({
    reservationCode,
    bookingDate,
    reservationStatus,
    source,
    ratePlan,
    adults,
    kids,
    expectedArrival }: ReservationSummaryProps) {

    return (
        <div className="px-4 py-3 border-b border-gray-200 bg-white shrink-0">
            <div className="grid grid-cols-1 gap-x-8">
                <div>
                    <Field label="Reservation Number" value={reservationCode} />
                    <Field label="Booking Date" value={bookingDate} />
                    <Field label="Reservation Status" value={reservationStatus} />
                    <Field label="Source" value={source} />
                </div>
                <div>
                    <Field label="Rate Plan" value={ratePlan} />
                    <Field label="Adult" value={String(adults)} />
                    <Field label="Children" value={String(kids)} />
                    <Field label="Expected Arrival Time" value={expectedArrival} />
                </div>
            </div>
        </div>
    );
}