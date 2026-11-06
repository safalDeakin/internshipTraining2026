
import RoomSidebarHeader from "./RoomSidebarHeader";

import { useState } from "react";
import type { RoomTypeFormData } from "../forms/AddRoomForm";
import AddRoomForm from "../forms/AddRoomForm";
import type { Product } from "../../../../../../core/domain/product";
import RoomList from "../../../roomMasterPage/components/RoomList";

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
}: RoomSidebarProps) {

    const [showAddPopup, setShowAddPopup] = useState(false);

    const handleSave = (data: RoomTypeFormData) => {
        console.log("New Room Type:", data);

        // Later connect this to your Room Type Command Service.

        setShowAddPopup(false);
    };

    return (
        <aside className="m-2 w-80 min-h-screen bg-white px-3.75 pb-3.75 pt-5">
            <RoomSidebarHeader
                onClick={() => setShowAddPopup(true)}
            />

            <div className="h-6" />

            <RoomList
                rooms={rooms}
                searchQuery={searchQuery}
                selectedRoomId={selectedRoomId}
                onSearchChange={onSearchChange}
                onSelectRoom={onSelectRoom}
            />

            {showAddPopup && (
                <AddRoomForm
                    onClose={() => setShowAddPopup(false)}
                    onSave={handleSave}
                />
            )}
        </aside>
    );
}
