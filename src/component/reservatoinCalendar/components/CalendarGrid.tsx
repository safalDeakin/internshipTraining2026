import ScaleRuler from "./ScaleRuler";
import RoomRow from "./RoomRow";

import type {
    Reservation,
    Room,
    DropPreview,
} from "../types/reservation";

import {
    MIN_TIMELINE_CONTENT_WIDTH,
} from "../utils/calendarUtils";

interface ReservationCalendarGridProps {
    rooms: Room[];
    weekDates: Date[];
    today: Date;
    todaySlotPos: number;
    showBottomRuler: boolean;

    reservationsByRoom: Record<
        string,
        Reservation[]
    >;

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

    onReservationDragOver?: (
        event: React.DragEvent<HTMLDivElement>,
        roomId: string
    ) => void;

    draggedReservation?: Reservation | null;

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

const SIDEBAR_WIDTH = 176;

export default function CalendarGrid({
    rooms,
    weekDates,
    today,
    todaySlotPos,
    showBottomRuler,
    reservationsByRoom,
    onReservationDragStart,
    onReservationDragEnd,
    onReservationDragOver,
    onReservationDrop,
    draggedReservation,
    dropPreview,
    onPointerDown,
    onPointerMove,
    onPointerUp,
}: ReservationCalendarGridProps) {
    return (
        <div className="bg-white rounded-xl border border-[#e0e7ef] overflow-hidden">

            {/* Horizontal scroll area */}
            <div className="calendar-scroll-container overflow-x-auto">

                {/* Header */}
                <div
                    className="flex"
                    style={{
                        minWidth:
                            SIDEBAR_WIDTH +
                            MIN_TIMELINE_CONTENT_WIDTH,
                    }}
                >
                    {/* Room header */}
                    <div
                        className="border-r border-[#e0e7ef] shrink-0"
                        style={{
                            width: SIDEBAR_WIDTH,
                        }}
                    >
                        <div
                            className="flex items-end px-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8] h-13.5"
                        >
                            Rooms
                        </div>
                    </div>

                    {/* Timeline ruler */}
                    <div
                        className="shrink-0"
                        style={{
                            width: MIN_TIMELINE_CONTENT_WIDTH,
                        }}
                    >
                        <ScaleRuler
                            weekDates={weekDates}
                            today={today}
                            todaySlotPos={todaySlotPos}
                            position="top"
                        />
                    </div>
                </div>

                {/* Room rows */}
                {rooms.map((room, index) => (
                    <RoomRow
                        key={room.id}
                        room={room}
                        reservations={
                            reservationsByRoom[
                            room.id
                            ] || []
                        }
                        rowIndex={index}
                        today={today}
                        weekDates={weekDates}
                        todaySlotPos={todaySlotPos}
                        onReservationDragStart={
                            onReservationDragStart
                        }
                        onReservationDragEnd={
                            onReservationDragEnd
                        }
                        onReservationDragOver={
                            onReservationDragOver
                        }
                        onReservationDrop={
                            onReservationDrop
                        }
                        draggedReservation={
                            draggedReservation
                        }
                        dropPreview={dropPreview}

                        onPointerDown={
                            onPointerDown
                        }
                        onPointerMove={
                            onPointerMove
                        }
                        onPointerUp={
                            onPointerUp
                        }
                    />
                ))}

                {/* Bottom ruler */}
                {showBottomRuler && (
                    <div
                        className="flex border-t border-[#e0e7ef]"
                        style={{
                            minWidth:
                                SIDEBAR_WIDTH +
                                MIN_TIMELINE_CONTENT_WIDTH,
                        }}
                    >
                        <div
                            className="border-r border-[#e0e7ef] shrink-0"
                            style={{
                                width: SIDEBAR_WIDTH,
                            }}
                        />

                        <div
                            className="shrink-0"
                            style={{
                                width:
                                    MIN_TIMELINE_CONTENT_WIDTH,
                            }}
                        >
                            <ScaleRuler
                                weekDates={weekDates}
                                today={today}
                                todaySlotPos={todaySlotPos}
                                position="bottom"
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}