import MasterDetailView from "../../../../lib/component/MasterDetailView/MasterDetailView"
import { DetailSection } from "./DetailSection";
import RoomTypeItem from "./components/RoomTypeItem";
import { Plus } from "lucide-react";
import { useRoomsMasterDetail } from "./provider/useRoomContext";
import { RoomListProvider } from "./provider/RoomsProvider";
import type { RoomTypes } from "./model/RoomModel";


function RoomMasterDetailView() {
    const roomsData = useRoomsMasterDetail();

    const detailContentBuilder = (selectId: string) => {
        const data = roomsData.getRoomDetails(selectId);
        return (<DetailSection data={data}></DetailSection>);
    };

    const listItemBuilder = (item: RoomTypes) => {
        return (
            <RoomTypeItem data={item} />
        );
    };

    const actionButton = <button
        type="button"
        onClick={() => { }}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-[#f3f7fb]"
        aria-label="Add room type"
    >
        <Plus
            size={20}
            strokeWidth={2}
            className="text-[#0066B3]"
        />
    </button>;

    return <MasterDetailView
        onSearchChange={roomsData.setSearchQuery}
        searchQuery={roomsData.searchQuery}
        items={roomsData.items}
        detailContentBuilder={detailContentBuilder}
        listItemBuilder={listItemBuilder}
        getId={roomsData.getId}
        title={roomsData.title}
        headerChildren={actionButton}
    />;
}

export default function RoomPageRenderer() {
    return (
        <RoomListProvider>
            <RoomMasterDetailView />
        </RoomListProvider>
    );
}