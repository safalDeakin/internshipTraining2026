import { useRef } from "react";

import {
    getRoomById,
    hasReservationOverlap,
    canMoveReservation,
} from "../utils/calendarUtils";

import { TOTAL_SLOTS } from "../data/reservationData";

import type {
    Reservation,
    DropPreview,
} from "../types/reservation";

interface UsePointerReservationDragProps {
    calendarReservations: Record<string, Reservation[]>;

    setCalendarReservations: React.Dispatch<
        React.SetStateAction<Record<string, Reservation[]>>
    >;

    setDraggedReservation: React.Dispatch<
        React.SetStateAction<Reservation | null>
    >;

    dropPreview: DropPreview | null;

    setDropPreview: React.Dispatch<
        React.SetStateAction<DropPreview | null>
    >;

    showDragMessage: (
        type: "error" | "success",
        message: string
    ) => void;
}

export function usePointerReservationDrag({
    calendarReservations,
    setCalendarReservations,
    setDraggedReservation,
    dropPreview,
    setDropPreview,
    showDragMessage,
}: UsePointerReservationDragProps) {

    const pointerDragRef = useRef<{
        reservation: Reservation;
        pointerId: number;
        offsetX: number;
    } | null>(null);


    // ----------------------------------------
    // Find room under pointer
    // ----------------------------------------

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


    // ----------------------------------------
    // Pointer Down
    // ----------------------------------------

    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>,
        reservation: Reservation
    ) => {

        // Only handle touch / pen.
        // Mouse continues using HTML5 drag.
        if (event.pointerType === "mouse") {
            return;
        }

        event.preventDefault();

        event.currentTarget.setPointerCapture(
            event.pointerId
        );

        const rect =
            event.currentTarget.getBoundingClientRect();

        const offsetX =
            event.clientX - rect.left;

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


    // ----------------------------------------
    // Pointer Move
    // ----------------------------------------

    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {

        const drag =
            pointerDragRef.current;

        if (!drag) {
            return;
        }

        event.preventDefault();

        // ------------------------------------
        // Find target room
        // ------------------------------------

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


        // ------------------------------------
        // Find source room
        // ------------------------------------

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


        // ------------------------------------
        // Find timeline under pointer
        // ------------------------------------

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


        // ------------------------------------
        // Calculate slot
        // ------------------------------------

        const rect =
            timeline.getBoundingClientRect();

        const mouseX =
            event.clientX - rect.left;

        const reservationLeftX =
            mouseX - drag.offsetX;

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

        const startSlot =
            Math.max(
                0,
                Math.min(
                    TOTAL_SLOTS -
                    drag.reservation.span,
                    Math.round(rawSlot)
                )
            );


        // ------------------------------------
        // Room type validation
        // ------------------------------------

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


        // ------------------------------------
        // Overlap validation
        // ------------------------------------

        const targetReservations =
            calendarReservations[roomId] || [];

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


        // ------------------------------------
        // Valid position
        // ------------------------------------

        setDropPreview({
            roomId,
            startSlot,
            valid: true,
        });
    };


    // ----------------------------------------
    // Pointer Up
    // ----------------------------------------

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


        // ------------------------------------
        // Nothing to drop on
        // ------------------------------------

        if (!preview) {

            pointerDragRef.current =
                null;

            setDraggedReservation(
                null
            );

            return;
        }


        // ------------------------------------
        // Invalid drop
        // ------------------------------------

        if (!preview.valid) {

            showDragMessage(
                "error",
                preview.reason === "room-type"
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


        // ------------------------------------
        // Valid drop
        // ------------------------------------

        const targetRoomId =
            preview.roomId;

        const startSlot =
            preview.startSlot;


        // Remove reservation
        // from old room
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


        // Add reservation
        // to new room
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


        // ------------------------------------
        // Cleanup
        // ------------------------------------

        pointerDragRef.current =
            null;

        setDraggedReservation(
            null
        );

        setDropPreview(null);
    };


    return {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    };
}