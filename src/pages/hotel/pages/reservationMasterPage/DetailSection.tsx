
import { ReservationSummaryInfo } from "./component/ReservationSummaryInfo"
import TabView from "../../../../component/Tabview/TabView";
import ReservationToolbar from "./component/ReservationToolbar";
import type { ReservationDetailModel } from "./model/ReservationModel";


import CustomerDetails from './component/tabs/CustomerDetails';
import GuestFolio from './component/tabs/GuestFolio';
import RoomTab from './component/tabs/RoomTab';
import NotesTab from './component/tabs/NotesTab';
import StayTab from './component/tabs/StayTab';
import PaymentsTab from './component/tabs/PaymentsTab';

type DetailSectionProps = {
    data: ReservationDetailModel;
};

const tabComponents: { label: string, content: React.ComponentType }[] = [
    {
        label: 'Customer Details',
        content: CustomerDetails
    },
    {
        label: 'Guest Folio',
        content: GuestFolio
    },
    {
        label: 'Room',
        content: RoomTab
    },
    {
        label: 'Notes',
        content: NotesTab
    },
    {
        label: 'Stay',
        content: StayTab
    },
    {
        label: 'Payments',
        content: PaymentsTab
    },

];


export default function DetailSection({
    data,
}: DetailSectionProps) {

    return (
        <div className="flex flex-col flex-1 min-h-0">
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
            <TabView tabs={tabComponents} />
        </div>
    );
}