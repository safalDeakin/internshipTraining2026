
import {
    DAYS,
    IS_MAJOR,
    SLOTS_PER_DAY,
    TIME_LABELS,
    TOTAL_SLOTS,
} from "../data/reservationData";

import { isSameDay } from "../utils/calendarUtils";

interface ScaleRulerProps {
    weekDates: Date[];
    today: Date;
    todaySlotPos: number;
    position: "top" | "bottom";
}

export default function ScaleRuler({
    weekDates,
    today,
    todaySlotPos,
    position,
}: ScaleRulerProps) {
    const isTop = position === "top";

    return (
        <div
            className="flex flex-col select-none"
        >
            {/* Day Names */}
            <div
                className="flex border-b border-[#e2e8f0] relative bg-$f1f5f9 h-6.5"
            >
                {weekDates.map((date, dayIndex) => {
                    const todayDate = isSameDay(date, today);

                    return (
                        <div
                            key={dayIndex}
                            className="relative flex items-center justify-start pl-2 border-r border-[#e2e8f0]"
                            style={{
                                flex: "0 0 calc(100% / 7)",
                            }}
                        >
                            <span
                                className="text-[11px] font-bold uppercase tracking-widest"
                                style={{
                                    color: todayDate
                                        ? "#00897b"
                                        : "#475569",
                                }}
                            >
                                {DAYS[dayIndex]}
                            </span>

                            {todayDate &&
                                todaySlotPos >= 0 && (
                                    <div
                                        className="absolute flex flex-col items-center pointer-events-none z-30 translate-x-[-40%] "
                                        style={{
                                            left: `${(todaySlotPos - dayIndex / 7) * 7 * 100}%`,
                                            [isTop ? "bottom" : "top"]: -1,
                                        }}
                                    >
                                        <div
                                            className={
                                                isTop ?
                                                    "w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#f9a825]" :
                                                    "w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#f9a825]"
                                            }
                                        />
                                    </div>
                                )}
                        </div>
                    );
                })}

                {/* Today Line */}
                {todaySlotPos >= 0 && (
                    <div
                        className="absolute inset-y-0 pointer-events-none z-20 w-0.5 bg-[#f9a825] opacity-90 "
                        style={{
                            left: `${todaySlotPos * 100}%`,
                        }}
                    />
                )}
            </div>

            {/* Time Labels */}
            <div
                className="flex relative bg-[#f8fafc] h-7"
            >
                {DAYS.map((_, dayIndex) =>
                    TIME_LABELS.map((item, timeIndex) => {
                        const slotIndex =
                            dayIndex * SLOTS_PER_DAY +
                            timeIndex;

                        const major = IS_MAJOR[timeIndex];
                        const midnight = timeIndex === 0;

                        const Icon = item?.icon;

                        return (
                            <div
                                key={slotIndex}
                                className="relative flex flex-col justify-start"
                                style={{
                                    flex: `0 0 calc(100% / ${TOTAL_SLOTS})`,
                                }}
                            >
                                <div
                                className="absolute left-0 w-1px"
                                    style={{
                                        [isTop ? "top" : "bottom"]: 0,
                                        height: major ? 10 : 6,
                                        background: midnight
                                            ? "#94a3b8"
                                            : major
                                                ? "#94a3b8"
                                                : "#cbd5e1",
                                    }}
                                />

                                <span
                                    className="absolute left-0 pl-0.5 truncate flex items-center gap-0.5 leading-none whitespace-nowrap"
                                    style={{
                                        fontSize: major ? 10 : 9,
                                        fontWeight: major ? 600 : 400,
                                        color: major
                                            ? "#475569"
                                            : "#94a3b8",
                                        [isTop ? "top" : "bottom"]:
                                            major ? 10 : 6,
                                    }}
                                >
                                    {item?.label}

                                    {Icon && (
                                        <Icon
                                            size={10}
                                            strokeWidth={2}
                                        />
                                    )}
                                </span>
                            </div>
                        );
                    })
                )}

                {todaySlotPos >= 0 && (
                    <div
                        className="absolute inset-y-0 pointer-events-none z-20 w-0.5 opacity-90 bg-[#f9a825]"
                        style={{
                            left: `${todaySlotPos * 100}%`,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
