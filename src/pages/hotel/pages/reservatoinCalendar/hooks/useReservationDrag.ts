import { useState } from "react";

import {
    getRoomById,
    calculateDropSlot,
    canMoveReservation,
    hasReservationOverlap,
} from "../utils/calendarUtils";

import type {
    Reservation,
    DropPreview,
} from "../types/reservation";

import { TOTAL_SLOTS } from "../data/reservationData";

interface Props {
    calendarReservations: Record<string, Reservation[]>;
    setCalendarReservations: React.Dispatch<
        React.SetStateAction<Record<string, Reservation[]>>
    >;

    draggedReservation: Reservation | null;
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

export function useReservationDrag({
    calendarReservations,
    setCalendarReservations,
    draggedReservation,
    setDraggedReservation,
    setDropPreview,
    showDragMessage,
}: Props) {

    const [dragOffsetX, setDragOffsetX] =
        useState(0);

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        reservation: Reservation
    ) => {
        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData(
            "reservationId",
            reservation.id
        );

        const rect =
            event.currentTarget.getBoundingClientRect();

        const offsetX =
            event.clientX - rect.left;

        setDragOffsetX(offsetX);
        setDraggedReservation(reservation);
    };

    const handleDragEnd = () => {
        setDraggedReservation(null);
        setDropPreview(null);
    };

    const handleDragOver = (
        event: React.DragEvent<HTMLDivElement>,
        roomId: string
    ) => {
        event.preventDefault();

        if (!draggedReservation) return;

        const targetRoom = getRoomById(roomId);

        if (!targetRoom) return;

        const sourceRoomEntry =
            Object.entries(calendarReservations).find(
                ([, reservations]) =>
                    reservations.some(
                        (reservation) =>
                            reservation.id ===
                            draggedReservation.id
                    )
            );

        if (!sourceRoomEntry) return;

        const sourceRoom =
            getRoomById(sourceRoomEntry[0]);

        if (!sourceRoom) return;

        const startSlot =
            calculateDropSlot(
                event,
                draggedReservation,
                TOTAL_SLOTS,
                dragOffsetX
            );

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

            event.dataTransfer.dropEffect = "none";

            return;
        }

        const targetReservations =
            calendarReservations[roomId] || [];

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

        setDropPreview({
            roomId,
            startSlot,
            valid: true,
        });

        event.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>,
        targetRoomId: string
    ) => {
        event.preventDefault();

        if (!draggedReservation) return;

        const targetRoom =
            getRoomById(targetRoomId);

        if (!targetRoom) return;

        const sourceRoomEntry =
            Object.entries(calendarReservations).find(
                ([, reservations]) =>
                    reservations.some(
                        (reservation) =>
                            reservation.id ===
                            draggedReservation.id
                    )
            );

        if (!sourceRoomEntry) return;

        const sourceRoom =
            getRoomById(sourceRoomEntry[0]);

        if (!sourceRoom) return;

        const startSlot =
            calculateDropSlot(
                event,
                draggedReservation,
                TOTAL_SLOTS,
                dragOffsetX
            );

        if (
            !canMoveReservation(
                sourceRoom,
                targetRoom
            )
        ) {
            showDragMessage(
                "error",
                `This reservation can only be moved to a ${sourceRoom.type} room.`
            );

            return;
        }

        const targetReservations =
            calendarReservations[targetRoomId] || [];

        if (
            hasReservationOverlap(
                targetReservations,
                startSlot,
                draggedReservation.span,
                draggedReservation.id
            )
        ) {
            showDragMessage(
                "error",
                "This time slot is already occupied."
            );

            return;
        }

        const updatedReservations =
            Object.fromEntries(
                Object.entries(calendarReservations).map(
                    ([roomId, reservations]) => [
                        roomId,
                        reservations.filter(
                            (reservation) =>
                                reservation.id !==
                                draggedReservation.id
                        ),
                    ]
                )
            );

        updatedReservations[targetRoomId] = [
            ...(updatedReservations[targetRoomId] || []),
            {
                ...draggedReservation,
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

        setDraggedReservation(null);
        setDropPreview(null);
    };

    return {
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    };
}