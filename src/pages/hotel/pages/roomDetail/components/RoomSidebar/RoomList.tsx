
import { Search } from "lucide-react";

import type { Product } from "../../types/roomDetail.types";
import RoomListItem from "./RoomListItem";

type RoomListProps = {
    rooms: Product[];
    searchQuery: string;
    selectedRoomId: string;
    onSearchChange: (value: string) => void;
    onSelectRoom: (id: string) => void;
};

export default function RoomList({
    rooms,
    searchQuery,
    selectedRoomId,
    onSearchChange,
    onSelectRoom,
}: RoomListProps) {
    return (
        <div className="min-h-svh shrink-0 rounded border border-[#e1e7ed] bg-white p-2">
            <div className="p-2">
                {/* Search */}
                <div className="mb-3 flex h-9 items-center rounded-[5px] border border-[#e1e7ed] px-2">
                    <Search
                        size={18}
                        className="mr-2 shrink-0 text-[#9ba7b5]"
                    />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        placeholder="Search room types..."
                        className="h-full w-full border-0 bg-transparent text-[14px] text-[#34495e] outline-none placeholder:text-[#9da8b5]"
                    />
                </div>

                {/* Room List */}
                <nav className="flex flex-col" aria-label="Room types">
                    {rooms.map((room) => (
                        <RoomListItem
                            key={room.id}
                            room={room}
                            isActive={room.id === selectedRoomId}
                            onSelect={onSelectRoom}
                        />
                    ))}

                    {rooms.length === 0 && (
                        <p className="px-3 py-5 text-center text-[12px] text-[#9ba7b5]">
                            No room types found.
                        </p>
                    )}
                </nav>
            </div>
        </div>
    );
}

