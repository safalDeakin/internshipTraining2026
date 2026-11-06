
import { ReservationSummaryInfo } from "./component/ReservationSummaryInfo"
import ReservationToolbar from "./component/ReservationToolbar";
import type { ReservationDetailModel } from "./model/ReservationModel";

type DetailSectionProps = {
    data: ReservationDetailModel;
};

export default function DetailSection({
    data,
}: DetailSectionProps) {

    return (
        <div className="flex flex-1 min-h-0">
            <ReservationToolbar reservationCode={data.reservationCode}
                reservationId={data.id}
                roomNumber={data.roomNumber}
                status={data.status}
                data={data}
            ></ReservationToolbar>
            <ReservationSummaryInfo reservationCode={data.reservationCode}
                bookingDate={data.bookingDate}
                reservationStatus={data.status}
                source={data.source}
                ratePlan={data.ratePlan}
                adults={data.adults}
                kids={data.kids}
                expectedArrival={data.expectedArrival} />
            {/* <ReservationTab /> */}

        </div>
    );
}