import MasterDetailView from "../../../../component/MasterDetailView/MasterDetailView"
import DetailSection from "./DetailSection";
import { Plus } from "lucide-react";
import { ReservationListItem } from "./component/ReservationListItem";
import { useReservationContext } from "./provider/useReservationContext";
import type { ReservationListModel } from "./model/ReservationModel";
import ReservationListProvider from "./provider/ReservationProvider";


function ReservationMasterDetailView() {
    const reservationContext = useReservationContext();

    const detailContentBuilder = (selectId: string) => {
        const data = reservationContext.getReservationDetails(selectId);
        return (<DetailSection data={data}></DetailSection>);
    };

    const listItemBuilder = (item: ReservationListModel) => {
        return (
            <ReservationListItem data={item} />
        );
    };

    const actionButton = <button
        type="button"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-[#f3f7fb]"
        onClick={() => { }}
        aria-label="Add reservation"
    >
        <Plus
            size={20}
            strokeWidth={2}
            className="text-[#0066B3]"
        />
    </button>;

    return <MasterDetailView
        onSearchChange={reservationContext.setSearchQuery}
        searchQuery={reservationContext.searchQuery}
        items={reservationContext.items}
        detailContentBuilder={detailContentBuilder}
        listItemBuilder={listItemBuilder}
        getId={reservationContext.getId}
        title={reservationContext.title}
        headerChildren={actionButton}
    />;
}

export default function ReservationPageRenderer() {
    return (
        <ReservationListProvider>
            <ReservationMasterDetailView />
        </ReservationListProvider>
    );
}

