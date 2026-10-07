
import type { Product } from "../../types/roomDetail.types";

type RoomListItemProps = {
    room: Product;
    isActive: boolean;
    onSelect: (id: string) => void;
};

export default function RoomListItem({
    room,
    isActive,
    onSelect,
}: RoomListItemProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(room.id)}
            className={`
                flex
                min-h-12
                w-full
                flex-col
                justify-center
                px-3
                py-2
                text-left
                transition-colors
                cursor-pointer
                ${isActive
                    ? "rounded-[5px] border border-[#2779e6] bg-[#f5f9ff]"
                    : "border-0 border-b border-[#e5e9ed] bg-white hover:bg-[#f7faff]"
                }
            `}
        >
            {/* Top row */}
            <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[12px] font-medium text-[#29445f]">
                    {room.name}
                </span>

                {room.status && (
                    <span className={`shrink-0 text-[11px] ${room.status === "Available" ? "text-[#00b36f]" : "text-[#f04424]"}`}>
                        {room.status}
                    </span>
                )}
            </div>

            {/* Room details */}
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#8a98a8]">
                <span>{room.subtitle}</span>

                <span>•</span>

                <span>{room.detail}</span>
            </div>

            {/* Date if available */}
            {room.date && (
                <span className="mt-0.5 text-[10px] text-[#a0aab5]">
                    {room.date}
                </span>
            )}
        </button>
    );
}

