
import type {
    Reservation,
    Room,
    DropPreview
} from "../types/reservation";

import {
    DAYS,
    SLOTS_PER_DAY,
    TOTAL_SLOTS,
} from "../data/reservationData";

import {
    getStatusColors,
    isSameDay,
    MIN_TIMELINE_CONTENT_WIDTH,
} from "../utils/calendarUtils";
import ReservationBar from "./ReservationBar";

interface RoomRowProps {
    room: Room;
    reservations: Reservation[];
    rowIndex: number;

    today: Date;
    weekDates: Date[];
    todaySlotPos: number;
    onReservationDragStart?: (
        event: React.DragEvent<HTMLDivElement>,
        reservation: Reservation
    ) => void;

    onReservationDragEnd?: (
        event: React.DragEvent<HTMLDivElement>
    ) => void;

    onReservationDrop?: (
        event: React.DragEvent<HTMLDivElement>,
        roomId: string
    ) => void;

    draggedReservation?: Reservation | null;


    onReservationDragOver?: (
        event: React.DragEvent<HTMLDivElement>,
        roomId: string
    ) => void;

    dropPreview?: DropPreview | null;


    onPointerDown?: (
        event: React.PointerEvent<HTMLDivElement>,
        reservation: Reservation
    ) => void;

    onPointerMove?: (
        event: React.PointerEvent<HTMLDivElement>
    ) => void;

    onPointerUp?: (
        event: React.PointerEvent<HTMLDivElement>
    ) => void;



}

export default function RoomRow({
    room,
    reservations,
    rowIndex,
    today,
    weekDates,
    todaySlotPos,
    onReservationDragStart,
    onReservationDragEnd,
    onReservationDragOver,
    onReservationDrop,
    draggedReservation,
    dropPreview,
    onPointerDown,
    onPointerMove,
    onPointerUp
}: RoomRowProps) {
    const covered = new Set<number>();

    reservations.forEach((reservation) => {
        for (
            let slot = reservation.startSlot;
            slot <
            reservation.startSlot + reservation.span;
            slot++
        ) {
            covered.add(slot);
        }
    });

    const todayIndex = weekDates.findIndex(
        (date) => isSameDay(date, today)
    );
    return (
        <div
            className={`flex border-t border-[#e0e7ef] h-16 ${rowIndex % 2 === 1
                ? "bg-[#fafcfc]"
                : "bg-white"
                }`}
            style={{
                minWidth: 176 + MIN_TIMELINE_CONTENT_WIDTH
            }}
        >
            {/* Room Information */}
            <div
                className="px-4 flex flex-col justify-center border-r border-[#e0e7ef] shrink-0 w-44"
            >
                <div className="text-sm font-semibold">
                    {room.id}
                </div>

                <div className="text-[10px] text-[#8a9ab0]">
                    {room.floor}
                </div>

                <div className="text-[10px] text-[#b0bec5]">
                    {room.type}
                </div>
            </div>

            {/* Timeline */}
            <div
                data-room-id={room.id}
                className="relative z-0 shrink-0"
                style={{
                    width: MIN_TIMELINE_CONTENT_WIDTH
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    onReservationDragOver?.(event, room.id)
                }}

                onDrop={(event) => {
                    event.preventDefault();
                    onReservationDrop?.(
                        event,
                        room.id
                    )
                }}
            >

                {/* Today Highlight */}
                {todayIndex >= 0 && todaySlotPos >= 0 && (
                    <div
                        className="absolute inset-y-0 pointer-events-none bg-[#00897b]/4"
                        style={{
                            left: `${(todayIndex / 7) * 100}%`,
                            width: `${(1 / 7) * 100}%`,
                        }}
                    />
                )}

                {/* Grid */}
                {DAYS.map((_, dayIndex) =>
                    Array.from({
                        length: SLOTS_PER_DAY,
                    }).map((_, timeIndex) => {
                        const slotIndex =
                            dayIndex *
                            SLOTS_PER_DAY +
                            timeIndex;

                        // const isDayBoundary =
                        //     timeIndex === 0;

                        // const isMidday =
                        //     timeIndex === 4;

                        return (
                            <div
                                key={slotIndex}
                                className="absolute inset-y-0 pointer-events-none w-1"
                                style={{
                                    left: `${(slotIndex / TOTAL_SLOTS) * 100}%`,
                                }}
                            //     background:
                            //         isDayBoundary
                            //             ? "#94a3b8"
                            //             : isMidday
                            //                 ? "#cbd5e1"
                            //                 : "#f0f4f8",
                            // }
                            />
                        );
                    })
                )}


                {draggedReservation &&
                    dropPreview?.roomId === room.id && (
                        <div
                            className={`
                                 absolute z-20
                                 pointer-events-none
                                 rounded-md
                                 border-2 border-dashed
                                 transition-[left,width,background-color,border-color]
                                 duration-100
                                 ease-out
                                 top-2.25
                                 bottom-2.25
                                 ${dropPreview.valid ? "border-emerald-500 bg-emerald-400/20" : "border-red-500 bg-red-400/20"}
                            `}

                            style={{
                                left: `calc(${(dropPreview.startSlot / TOTAL_SLOTS) * 100}% + 2px)`,
                                width: `calc(${(draggedReservation.span / TOTAL_SLOTS) * 100}% - 4px)`,
                            }}
                        >
                            <div className="flex h-full items-center justify-center px-2">
                                <span
                                    className={`
                                         whitespace-nowrap
                                         rounded-md
                                         px-2 py-1
                                         text-[10px]
                                         font-semibold
                                         shadow-sm
                                         ${dropPreview.valid ? "bg-white/80 text-emerald-700" : "bg-white/80 text-red-700"}
                                    `}
                                >
                                    {dropPreview.valid
                                        ? "Drop reservation here"
                                        : dropPreview.reason === "room-type"
                                            ? "Room type not allowed"
                                            : "Time slot unavailable"}
                                </span>
                            </div>
                        </div>
                    )}

                {/* Reservations */}
                {reservations.map((reservation) => (
                    <ReservationBar
                        key={reservation.id}
                        reservation={reservation}
                        totalSlots={TOTAL_SLOTS}
                        statusColors={getStatusColors}
                        onDragStart={onReservationDragStart}
                        onDragEnd={onReservationDragEnd}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        isDragging={
                            draggedReservation?.id === reservation.id
                        }
                    />
                ))}

                {/* Available Slots */}
                {Array.from({
                    length: TOTAL_SLOTS,
                }).map((_, slotIndex) => {
                    if (covered.has(slotIndex)) {
                        return null;
                    }

                    return (
                        <div
                            key={`available-${slotIndex}`}
                            className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
                            style={{
                                left: `${(slotIndex / TOTAL_SLOTS) * 100}%`,
                                width: `${(1 / TOTAL_SLOTS) * 100}%`,
                            }}
                        >
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

