
import { ArrowUp, BedDouble, User } from "lucide-react";
import { days } from "../data/data";
import type { DayKey, RoomRate } from "../types/types";

interface Props {
    room: RoomRate;
    rates: Record<DayKey, number>;
    showDetails: (room: RoomRate) => void;
}

export default function TimelineRow({
    room,
    rates,
    showDetails,
}: Props) {
    return (
        <>
            <button
                className="flex min-w-0 items-center gap-3 border-b border-slate-200 bg-white px-3 py-3 text-left transition hover:bg-slate-50"
                onClick={() => showDetails(room)}
                type="button"
            >
                <span className="flex h-5 w-5 items-center justify-center bg-slate-200 text-slate-500">
                    <BedDouble size={12} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                    <span className="block truncate text-xs font-bold text-slate-800">
                        {room.name}
                    </span>
                    <span className="block truncate text-[0.62rem] text-slate-400">
                        {room.roomNumbers.length} Rooms
                    </span>
                </span>
            </button>

            {days.map((day, index) => (
                <div
                    className={`group relative flex min-h-14 items-center justify-center overflow-hidden border-b border-l border-slate-200 px-2 ${index > 4 ? "bg-slate-100/70" : "bg-white"
                        }`}
                    key={`${room.id}-${day}`}
                >
                    <span className="absolute top-0 left-0 h-0.5 w-full bg-[#6f8eaa]" />
                    <div className="flex flex-col">

                        <span className="text-[0.72rem] font-bold text-slate-700">
                            Base rate: {new Intl.NumberFormat("en-NP").format(rates[day])}
                        </span>
                        <span className="text-[0.72rem] font-bold text-slate-700 flex items-center gap-1">
                            1 x <User size={14} /> = {room.additionalRate}
                            {room.additionalRateType === "percentage" && "%"}
                            <ArrowUp size={10} />
                        </span>
                    </div>
                </div>
            ))}
        </>
    );
}
