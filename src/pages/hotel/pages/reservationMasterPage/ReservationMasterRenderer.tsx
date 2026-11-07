import MasterDetailView from "../../../../lib/component/MasterDetailView/MasterDetailView"
import { Plus, X } from "lucide-react";
import { useReservationList } from "./provider/listProvider/useReservationList";
import type { ReservationListModel } from "./model/ReservationModel";
import ReservationListProvider from "./provider/listProvider/ReservationListProvider";
import ReservationDetailProvider from "./provider/detailProvider/ReservationDetailProvider";

import { ReservationSummaryInfo } from "./component/ReservationSummaryInfo"
import ReservationToolbar from "./component/ReservationToolbar";

import CustomerDetails from './component/tabs/CustomerDetails';
import GuestFolio from './component/tabs/GuestFolio';
import RoomTab from './component/tabs/RoomTab';
import NotesTab from './component/tabs/NotesTab';
import StayTab from './component/tabs/StayTab';
import PaymentsTab from './component/tabs/PaymentsTab';
import TabView from "../../../../lib/component/Tabview/TabView";
import { useState } from "react";
import HotelReservation from "../hotelReservation/HotelReservation";


const tabComponents: { label: string, content: React.ComponentType }[] = [
    {
        label: 'Customer Details',
        content: CustomerDetails
    },
    {
        label: 'Room',
        content: RoomTab
    },
    {
        label: 'Stay',
        content: StayTab
    },

    {
        label: 'Notes',
        content: NotesTab
    },

    {
        label: 'Guest Folio',
        content: GuestFolio
    },
    {
        label: 'Payments',
        content: PaymentsTab
    },

];

function ReservationMasterDetailView() {
    const reservationListContext = useReservationList();

    const [openMakeReservation, setOpenMakeReservation] = useState(false)

    const detailContentBuilder = (selectId: string) => {
        return (
            <ReservationDetailProvider id={selectId}>
                <div className="flex flex-col flex-1 min-h-0">
                    <ReservationToolbar />
                    <ReservationSummaryInfo />
                    <TabView tabs={tabComponents} />
                </div>
            </ReservationDetailProvider>

        );
    };

    // This function generate List items for reservation.
    const listItemBuilder = (item: ReservationListModel) => {
        return (
            <>
                {/* Top row */}
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12px] font-medium text-[#29445f]">
                        {item.guestName}
                    </span>

                    {item.checkInTime && (
                        <span className="shrink-0 text-[11px] text-[#9ba7b5]">
                            {item.checkInTime}
                        </span>
                    )}
                </div>

                {/* Reservation details */}
                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#8a98a8]">
                    <span>
                        {item.reservationCode.replace('RV-', 'R')}
                    </span>

                    <span>•</span>

                    <span>
                        Room {item.roomNumber}
                    </span>
                </div>
            </>
        );
    };

    const actionButton = <button
        type="button"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-[#f3f7fb]"
        onClick={() => setOpenMakeReservation(true)}
        aria-label="Add reservation"
    >
        <Plus
            size={20}
            strokeWidth={2}
            className="text-[#0066B3]"
        />
    </button>;

    return (
        <>
            <MasterDetailView
                onSearchChange={reservationListContext.setSearchQuery}
                searchQuery={reservationListContext.searchQuery}
                items={reservationListContext.items}
                detailContentBuilder={detailContentBuilder}
                listItemBuilder={listItemBuilder}
                getId={reservationListContext.getId}
                title={reservationListContext.title}
                headerChildren={actionButton}
            />

            {openMakeReservation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
                    <div className="relative max-h-[95vh] w-full max-w-7xl overflow-y-auto rounded-xl bg-white shadow-2xl">
                        <HotelReservation
                            onClose={() => setOpenMakeReservation(false)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default function ReservationPageRenderer() {
    return (
        <ReservationListProvider>
            <ReservationMasterDetailView />
        </ReservationListProvider>
    );
}

