
import type { RoomTypes } from "../model/RoomModel";

type RoomTypeItemProps = {
    data: RoomTypes;
};

export default function RoomTypeItem({
    data,
}: RoomTypeItemProps) {
    return (
        <div>
            {/* Top row */}
            <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[12px] font-medium text-[#29445f]">
                    {data.name}
                </span>

                {data.status && (
                    <span className={`shrink-0 text-[11px] ${data.status === "Available" ? "text-[#00b36f]" : "text-[#f04424]"}`}>
                        {data.status}
                    </span>
                )}
            </div>

            {/* Room details */}
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#8a98a8]">
                <span>{data.subtitle}</span>

                <span>•</span>

                <span>{data.detail}</span>
            </div>

            {/* Date if available */}
            {data.date && (
                <span className="mt-0.5 text-[10px] text-[#a0aab5]">
                    {data.date}
                </span>
            )}
        </div>
    );
}

