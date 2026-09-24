
import {
    Search,
    AlignJustify,
} from "lucide-react";

import type { ViewMode } from "../types/reservation";
import { ROOMS } from "../data/reservationData";
import CalendarDateFilter from "./CalendarDateFilter";

interface CalendarControlsProps {
    weekStart: Date;
    weekDates: Date[];

    selectedDate: Date;
    onDateChange: (date: Date) => void;

    floorFilter: string;
    roomFilter: string;
    search: string;

    viewMode: ViewMode;
    showBottomRuler: boolean;

    onPreviousWeek: () => void;
    onNextWeek: () => void;

    onFloorChange: (value: string) => void;
    onRoomChange: (value: string) => void;
    onSearchChange: (value: string) => void;

    onViewModeChange: (value: ViewMode) => void;
    onToggleBottomRuler: () => void;
}

export default function CalendarControls({
    // weekDates,

    selectedDate,
    onDateChange,

    floorFilter,
    roomFilter,
    search,

    // viewMode,
    showBottomRuler,


    onFloorChange,
    onRoomChange,
    onSearchChange,

    // onViewModeChange,
    onToggleBottomRuler,
}: CalendarControlsProps) {
    return (
        <div className="bg-white rounded-xl border border-[#e0e7ef] px-4 py-3 flex flex-wrap items-center gap-3">

            {/* Week Navigation */}
            <div className="flex items-center gap-2">

                <CalendarDateFilter
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                />
            </div>

            <div className="w-px h-6 bg-[#e0e7ef]" />

            {/* Floor */}
            <div className="flex items-center gap-2">
                <label className="text-xs text-[#8a9ab0]">
                    Floor
                </label>

                <select
                    value={floorFilter}
                    onChange={(event) =>
                        onFloorChange(event.target.value)
                    }
                    className="text-sm border border-[#e0e7ef] rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                >
                    {["All", "1st", "2nd"].map((floor) => (
                        <option key={floor}>
                            {floor}
                        </option>
                    ))}
                </select>
            </div>

            {/* Room */}
            <div className="flex items-center gap-2">
                <label className="text-xs text-[#8a9ab0]">
                    Room
                </label>

                <select
                    value={roomFilter}
                    onChange={(event) =>
                        onRoomChange(event.target.value)
                    }
                    className="text-sm border border-[#e0e7ef] rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#4db6ac]"
                >
                    {["All", ...ROOMS.map((room) => room.id)].map(
                        (room) => (
                            <option key={room}>
                                {room}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="w-px h-6 bg-[#e0e7ef]" />

            {/* Search */}
            <div className="flex items-center gap-2 bg-[#f5f7f8] border border-[#e0e7ef] rounded-lg px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-[#8a9ab0]" />

                <input
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search room"
                    className="text-sm bg-transparent focus:outline-none placeholder-[#b0bec5] w-24"
                />
            </div>

            {/* Bottom Ruler */}
            <button
                onClick={onToggleBottomRuler}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${showBottomRuler
                    ? "border-[#4db6ac] text-[#00897b] bg-[#e0f7fa]"
                    : "border-[#e0e7ef] text-[#8a9ab0] bg-white hover:bg-[#f5f7f8]"
                    }`}
            >
                <AlignJustify className="w-3.5 h-3.5" />

                Bottom Ruler
            </button>

            {/* View Mode */}
            {/* <div className="ml-auto flex items-center bg-[#f5f7f8] rounded-lg border border-[#e0e7ef] p-0.5">
                {(["Weekly", "Daily", "Monthly"] as ViewMode[]).map(
                    (mode) => (
                        <button
                            key={mode}
                            onClick={() =>
                                onViewModeChange(mode)
                            }
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === mode
                                    ? "bg-[#e53935] text-white shadow-sm"
                                    : "text-[#5a6a7e] hover:text-[#1a2332]"
                                }`}
                        >
                            {mode}
                        </button>
                    )
                )}
            </div> */}
        </div>
    );
}

