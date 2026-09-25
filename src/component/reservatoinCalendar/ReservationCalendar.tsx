import { useMemo, useRef, useState } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarControls from "./components/CalendarControls";
import CalendarGrid from "./components/CalendarGrid";
import { ROOMS, RESERVATIONS, SLOTS_PER_DAY, TOTAL_SLOTS, } from "./data/reservationData";


import {
    getSundayOfWeek,
    getWeekDates,
    isSameDay,
    getRoomById,
    canMoveReservation,
    calculateDropSlot,
    hasReservationOverlap,
} from "./utils/calendarUtils";

import type { ViewMode, Reservation, DropPreview } from "./types/reservation";

//Commented because don't need the cards component
// import MobileCalendar from "./components/Mobile/MobileCalendar";
// import { rooms } from "../../data/rooms";
// import MobileMoveSheet from "./components/Mobile/MobileMoveSheet";

import ResponsiveCalendarView from "./components/ResponsiveCalendarView";
import LandscapeGuard from "./components/LandScapeGuard";
import "./css/reservationCalendar.css"

export default function ReservationCalendar() {
    const [viewMode, setViewMode] = useState<ViewMode>("Weekly");
    const [selectedDate, setSelectedDate] = useState(() => new Date());
    const [weekStart, setWeekStart] = useState(() => getSundayOfWeek(new Date()));

    const [floorFilter, setFloorFilter] = useState("All");
    const [roomFilter, setRoomFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [showBottomRuler, setShowBottomRuler] = useState(false);


    //MobilePart
    // const [movingReservation, setMovingReservation] =
    //     useState<Reservation | null>(null);
    // const [moveRoomId, setMoveRoomId] =
    //     useState<number | null>(null);

    // const [moveStartSlot, setMoveStartSlot] =
    //     useState(0);

    // const [moveValidation, setMoveValidation] = useState<{
    //     valid: boolean;
    //     message: string;
    // }>({
    //     valid: false,
    //     message: "Select a room and time.",
    // });


    //Temporary drag state
    const [draggedReservation, setDraggedReservation] = useState<Reservation | null>(null)

    const [dragOffsetX, setDragOffsetX] = useState(0);

    const [calendarReservations, setCalendarReservations] = useState<Record<string, Reservation[]>>(RESERVATIONS);

    const [dropPreview, setDropPreview] = useState<DropPreview | null>(null);

    const [dragMessage, setDragMessage] = useState<{
        type: "error" | "success";
        message: string;
    } | null>(null);


    //For Reseponsive of Drag and Drop On Mobile and Tablet
    const pointerDragRef = useRef<{
        reservation: Reservation;
        pointerId: number;
        offsetX: number;
    } | null>(null);


    const showDragMessage = (
        type: "error" | "success",
        message: string
    ) => {
        setDragMessage({ type, message });

        window.setTimeout(() => {
            setDragMessage(null);
        }, 2200);
    };

    const [today] = useState(() => new Date());

    const weekDates = useMemo(
        () => getWeekDates(weekStart),
        [weekStart]
    );

    /*Calculate current time position */
    const todaySlotPos = useMemo(() => {
        const dayIndex = weekDates.findIndex(
            (date) => isSameDay(date, today)
        );

        if (dayIndex < 0) {
            return -1;
        }

        const hourFraction = (today.getHours() + today.getMinutes() / 60) / 24;

        return (
            (
                dayIndex * SLOTS_PER_DAY +
                hourFraction * SLOTS_PER_DAY
            ) / TOTAL_SLOTS
        );
    }, [weekDates, today]);

    /*Week navigation*/
    const previousWeek = () => {
        const date = new Date(weekStart);

        date.setDate(
            date.getDate() - 7
        );

        setWeekStart(date);
    };

    const nextWeek = () => {
        const date = new Date(weekStart);

        date.setDate(
            date.getDate() + 7
        );

        setWeekStart(date);
    };

    /*Filter rooms*/
    const filteredRooms = useMemo(() => {
        return ROOMS.filter((room) => {
            if (
                floorFilter !== "All" &&
                !room.floor.startsWith(
                    floorFilter
                )
            ) {
                return false;
            }

            if (
                roomFilter !== "All" &&
                room.id !== roomFilter
            ) {
                return false;
            }

            if (
                search &&
                !room.id.includes(search)
            ) {
                return false;
            }

            return true;
        });
    }, [floorFilter, roomFilter, search]);



    const handleDateChange = (date: Date) => {
        setSelectedDate(date);

        // Move calendar to the week and containing the selected date.
        setWeekStart(getSundayOfWeek(date));
    };


    //Drag and Drop
    const handleReservationDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        reservation: Reservation
    ) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData(
            "reservationId",
            reservation.id
        );

        const rect = event.currentTarget.getBoundingClientRect();

        const offsetX = event.clientX - rect.left;

        setDragOffsetX(offsetX);
        setDraggedReservation(reservation);
    };

    const handleReservationDragEnd = () => {
        setDraggedReservation(null);
        setDropPreview(null)

    }


    const handleReservationDragOver = (
        event: React.DragEvent<HTMLDivElement>,
        roomId: string
    ) => {
        event.preventDefault();

        if (!draggedReservation) {
            return;
        }

        const targetRoom =
            getRoomById(roomId);

        if (!targetRoom) {
            return;
        }

        const sourceRoomId =
            Object.keys(calendarReservations).find(
                (currentRoomId) =>
                    calendarReservations[
                        currentRoomId
                    ]?.some(
                        (reservation) =>
                            reservation.id ===
                            draggedReservation.id
                    )
            );

        if (!sourceRoomId) {
            return;
        }

        const sourceRoom =
            getRoomById(sourceRoomId);

        if (!sourceRoom) {
            return;
        }

        const startSlot =
            calculateDropSlot(
                event,
                draggedReservation,
                TOTAL_SLOTS,
                dragOffsetX
            );

        // Room type check
        if (!canMoveReservation(sourceRoom, targetRoom)) {
            setDropPreview({
                roomId,
                startSlot,
                valid: false,
                reason: "room-type",
            });

            event.dataTransfer.dropEffect = "none";

            return;
        }

        // Overlap check
        const targetReservations = calendarReservations[roomId] || [];

        const hasOverlap =
            hasReservationOverlap(
                targetReservations,
                startSlot,
                draggedReservation.span,
                draggedReservation.id
            );

        if (hasOverlap) {
            setDropPreview({
                roomId,
                startSlot,
                valid: false,
                reason: "overlap",
            });

            event.dataTransfer.dropEffect = "none";

            return;
        }

        // Valid
        setDropPreview({
            roomId,
            startSlot,
            valid: true,
        });

        event.dataTransfer.dropEffect = "move";
    };


    const handleReservationDrop = (
        event: React.DragEvent<HTMLDivElement>,
        targetRoomId: string
    ) => {
        event.preventDefault();

        if (!draggedReservation) return;

        const targetRoom = getRoomById(targetRoomId);

        if (!targetRoom) return;

        // Find the room where the reservation currently belongs
        const sourceRoomEntry = Object.entries(calendarReservations).find(
            ([, reservations]) =>
                reservations.some(
                    (reservation) =>
                        reservation.id === draggedReservation.id
                )
        );

        if (!sourceRoomEntry) return;

        const [sourceRoomId] = sourceRoomEntry;

        const sourceRoom = getRoomById(sourceRoomId);

        if (!sourceRoom) return;

        // Calculate where the reservation should be dropped
        const startSlot = calculateDropSlot(
            event,
            draggedReservation,
            TOTAL_SLOTS,
            dragOffsetX
        );

        // Check room type
        if (!canMoveReservation(sourceRoom, targetRoom)) {
            showDragMessage(
                "error",
                `This reservation can only be moved to a ${sourceRoom.type} room.`
            );

            setDropPreview({
                roomId: targetRoomId,
                startSlot,
                valid: false,
                reason: "room-type",
            });

            return;
        }

        // Check overlap
        const targetReservations =
            calendarReservations[targetRoomId] || [];

        const hasOverlap = hasReservationOverlap(
            targetReservations,
            startSlot,
            draggedReservation.span,
            draggedReservation.id
        );

        if (hasOverlap) {
            showDragMessage(
                "error",
                "This time slot is already occupied."
            );

            setDropPreview({
                roomId: targetRoomId,
                startSlot,
                valid: false,
                reason: "overlap",
            });

            return;
        }

        // Remove reservation from its old room
        const updatedReservations = Object.fromEntries(
            Object.entries(calendarReservations).map(
                ([roomId, reservations]) => [
                    roomId,
                    reservations.filter(
                        (reservation) =>
                            reservation.id !== draggedReservation.id
                    ),
                ]
            )
        );

        // Add reservation to the new room
        updatedReservations[targetRoomId] = [
            ...(updatedReservations[targetRoomId] || []),
            {
                ...draggedReservation,
                startSlot,
            },
        ];

        setCalendarReservations(updatedReservations);

        showDragMessage(
            "success",
            `Reservation moved to room ${targetRoomId}.`
        );

        setDraggedReservation(null);
        setDropPreview(null);
    };



    //Mobile Rendering Part
    // const handleMoveReservation = (reservation: Reservation) => {
    //     setMovingReservation(reservation);
    //     setMoveRoomId(null);
    //     setMoveStartSlot(reservation.startSlot);

    //     setMoveValidation({
    //         valid: false,
    //         message: "Select a room and time.",
    //     });
    // };

    // const validateMobileMove = (
    //     roomId: number | null,
    //     startSlot: number
    // ) => {
    //     if (!movingReservation || roomId === null) {
    //         return {
    //             valid: false,
    //             message: "Select a room and time.",
    //         };
    //     }

    //     const targetRoom = rooms.find(
    //         (room) => room.id === roomId
    //     );

    //     if (!targetRoom) {
    //         return {
    //             valid: false,
    //             message: "Selected room could not be found.",
    //         };
    //     }

    //     return {
    //         valid: true,
    //         message: `Reservation can be moved to Room ${targetRoom.roomNumber}.`,
    //     };
    // };


    // const handleMoveRoomChange = (roomId: number) => {
    //     setMoveRoomId(roomId);

    //     setMoveValidation(
    //         validateMobileMove(
    //             roomId,
    //             moveStartSlot
    //         )
    //     );
    // };

    // const handleMoveSlotChange = (slot: number) => {
    //     setMoveStartSlot(slot);

    //     setMoveValidation(
    //         validateMobileMove(
    //             moveRoomId,
    //             slot
    //         )
    //     );
    // };


    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>,
        reservation: Reservation
    ) => {
        if (
            event.pointerType === "mouse"
        ) {
            return;
        }

        event.preventDefault();

        event.currentTarget.setPointerCapture(
            event.pointerId
        );

        const rect = event.currentTarget.getBoundingClientRect();

        const offsetX = event.clientX - rect.left;

        pointerDragRef.current = {
            reservation,
            pointerId: event.pointerId,
            offsetX,
        };

        setDraggedReservation(
            reservation
        );

        setDropPreview(null);
    };


    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        const drag =
            pointerDragRef.current;

        if (!drag) {
            return;
        }

        event.preventDefault();

        const roomId =
            findRoomFromPointer(
                event.clientX,
                event.clientY
            );

        if (!roomId) {
            setDropPreview(null);
            return;
        }

        const targetRoom =
            getRoomById(roomId);

        if (!targetRoom) {
            return;
        }

        // Find source room
        const sourceRoomEntry =
            Object.entries(
                calendarReservations
            ).find(
                ([, reservations]) =>
                    reservations.some(
                        (reservation) =>
                            reservation.id ===
                            drag.reservation.id
                    )
            );

        if (!sourceRoomEntry) {
            return;
        }

        const sourceRoom =
            getRoomById(
                sourceRoomEntry[0]
            );

        if (!sourceRoom) {
            return;
        }

        // Find the actual timeline element
        const elements =
            document.elementsFromPoint(
                event.clientX,
                event.clientY
            );

        const timeline =
            elements.find(
                (element) =>
                    element instanceof HTMLElement &&
                    element.hasAttribute(
                        "data-room-id"
                    )
            ) as HTMLElement | undefined;

        if (!timeline) {
            return;
        }

        const rect = timeline.getBoundingClientRect();

        const mouseX =
            event.clientX -
            rect.left;

        const reservationLeftX = mouseX - drag.offsetX;

        const clampedX =
            Math.max(
                0,
                Math.min(
                    rect.width,
                    reservationLeftX
                )
            );

        const rawSlot =
            (clampedX / rect.width) *
            TOTAL_SLOTS;

        const startSlot = Math.max(
            0,
            Math.min(
                TOTAL_SLOTS -
                drag.reservation.span,
                Math.round(rawSlot)
            )
        );

        // Room type validation
        if (
            !canMoveReservation(
                sourceRoom,
                targetRoom
            )
        ) {
            setDropPreview({
                roomId,
                startSlot,
                valid: false,
                reason: "room-type",
            });

            return;
        }

        // Overlap validation
        const targetReservations =
            calendarReservations[
            roomId
            ] || [];

        const hasOverlap =
            hasReservationOverlap(
                targetReservations,
                startSlot,
                drag.reservation.span,
                drag.reservation.id
            );

        if (hasOverlap) {
            setDropPreview({
                roomId,
                startSlot,
                valid: false,
                reason: "overlap",
            });

            return;
        }

        // Valid position
        setDropPreview({
            roomId,
            startSlot,
            valid: true,
        });
    };


    const findRoomFromPointer = (
        clientX: number,
        clientY: number
    ): string | null => {
        const elements =
            document.elementsFromPoint(
                clientX,
                clientY
            );

        for (const element of elements) {
            const roomElement =
                element.closest(
                    "[data-room-id]"
                );

            if (roomElement) {
                return roomElement.getAttribute(
                    "data-room-id"
                );
            }
        }

        return null;
    };


    const handlePointerUp = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        const drag =
            pointerDragRef.current;

        if (!drag) {
            return;
        }

        event.preventDefault();

        const preview =
            dropPreview;

        if (!preview) {
            pointerDragRef.current =
                null;

            setDraggedReservation(
                null
            );

            return;
        }

        if (!preview.valid) {
            showDragMessage(
                "error",
                preview.reason ===
                    "room-type"
                    ? "This reservation cannot be moved to this room."
                    : "This time slot is already occupied."
            );

            pointerDragRef.current =
                null;

            setDraggedReservation(
                null
            );

            setDropPreview(null);

            return;
        }

        const targetRoomId =
            preview.roomId;

        const startSlot =
            preview.startSlot;

        const updatedReservations =
            Object.fromEntries(
                Object.entries(
                    calendarReservations
                ).map(
                    ([
                        roomId,
                        reservations,
                    ]) => [
                            roomId,
                            reservations.filter(
                                (reservation) =>
                                    reservation.id !==
                                    drag.reservation.id
                            ),
                        ]
                )
            );

        updatedReservations[
            targetRoomId
        ] = [
                ...(
                    updatedReservations[
                    targetRoomId
                    ] || []
                ),
                {
                    ...drag.reservation,
                    startSlot,
                },
            ];

        setCalendarReservations(
            updatedReservations
        );

        showDragMessage(
            "success",
            `Reservation moved to room ${targetRoomId}.`
        );

        pointerDragRef.current =
            null;

        setDraggedReservation(
            null
        );

        setDropPreview(null);
    };


    return (

        <div className="min-h-screen bg-[#f5f7f8] font-sans text-[#1a2332]">

            <CalendarHeader />

            <LandscapeGuard>

                <div className="px-6 py-5 space-y-4">
                    <ResponsiveCalendarView
                        timeline={
                            <>

                                <CalendarControls
                                    weekStart={weekStart}
                                    weekDates={weekDates}
                                    selectedDate={selectedDate}
                                    onDateChange={handleDateChange}
                                    floorFilter={floorFilter}
                                    roomFilter={roomFilter}
                                    search={search}
                                    viewMode={viewMode}
                                    showBottomRuler={showBottomRuler}
                                    onPreviousWeek={previousWeek}
                                    onNextWeek={nextWeek}
                                    onFloorChange={setFloorFilter}
                                    onRoomChange={setRoomFilter}
                                    onSearchChange={setSearch}
                                    onViewModeChange={setViewMode}
                                    onToggleBottomRuler={() =>
                                        setShowBottomRuler(
                                            (current) => !current
                                        )
                                    }
                                />

                                <CalendarGrid
                                    rooms={filteredRooms}
                                    weekDates={weekDates}
                                    today={today}
                                    todaySlotPos={todaySlotPos}
                                    showBottomRuler={showBottomRuler}
                                    reservationsByRoom={calendarReservations}

                                    onReservationDragStart={
                                        handleReservationDragStart
                                    }

                                    onReservationDragEnd={
                                        handleReservationDragEnd
                                    }

                                    onReservationDragOver={
                                        handleReservationDragOver
                                    }

                                    onReservationDrop={
                                        handleReservationDrop
                                    }

                                    draggedReservation={
                                        draggedReservation
                                    }

                                    dropPreview={
                                        dropPreview
                                    }

                                    onPointerDown={
                                        handlePointerDown
                                    }
                                    onPointerMove={
                                        handlePointerMove
                                    }
                                    onPointerUp={
                                        handlePointerUp
                                    }
                                />

                                {dragMessage && (
                                    <div
                                        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${dragMessage.type === "error"
                                            ? "bg-red-600 text-white"
                                            : "bg-green-600 text-white"
                                            }`}
                                    >
                                        {dragMessage.message}
                                    </div>
                                )}
                            </>
                        }
                    // compact={
                    //     <MobileCalendar
                    //         rooms={rooms}
                    //         reservationsByRoom={calendarReservations}
                    //         selectedDate={selectedDate}
                    //         onDateChange={setSelectedDate}
                    //         onMoveReservation={handleMoveReservation}
                    //     />
                    // }
                    />

                    {/* <MobileMoveSheet
                        open={movingReservation !== null}
                        reservation={movingReservation}
                        rooms={rooms}
                        selectedRoomId={moveRoomId}
                        selectedSlot={moveStartSlot}
                        validationMessage={moveValidation.message}
                        isValid={moveValidation.valid}
                        onRoomChange={handleMoveRoomChange}
                        onSlotChange={handleMoveSlotChange}
                        onConfirm={() => {
                            console.log("Move:", {
                                reservation: movingReservation,
                                roomId: moveRoomId,
                                startSlot: moveStartSlot,
                            });
                        }}
                        onClose={() => {
                            setMovingReservation(null);
                        }}
                    /> */}

                </div>
            </LandscapeGuard>
        </div>

    );
}

