
import RoomSidebarHeader from "./RoomSidebarHeader";
import RoomList from "./RoomList";

import type { Product } from "../../types/roomDetail.types";

type RoomSidebarProps = {
    rooms: Product[];
    searchQuery: string;
    selectedRoomId: string;
    onSearchChange: (value: string) => void;
    onSelectRoom: (id: string) => void;
    onAddRoom?: () => void;
};

export default function RoomSidebar({
    rooms,
    searchQuery,
    selectedRoomId,
    onSearchChange,
    onSelectRoom,
    onAddRoom,
}: RoomSidebarProps) {
    return (
        <aside className="m-2 w-80 min-h-screen bg-white px-3.75 pb-3.75 pt-5">
            <RoomSidebarHeader
                onAdd={onAddRoom}
            />

            <div className="h-6" />

            <RoomList
                rooms={rooms}
                searchQuery={searchQuery}
                selectedRoomId={selectedRoomId}
                onSearchChange={onSearchChange}
                onSelectRoom={onSelectRoom}
            />
        </aside>
    );
}
