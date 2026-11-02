
import type { RoomTypes } from "../model/RoomModel";

type RoomTypeItemProps = {
    room: RoomTypes;
};

export default function RoomTypeItem({
    room,

}: RoomTypeItemProps) {
    return (
        <div>
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
        </div>
    );
}

