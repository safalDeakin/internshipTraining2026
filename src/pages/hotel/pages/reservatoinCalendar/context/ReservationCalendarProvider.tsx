import type { ReactNode } from "react";

import { ReservationCalendarContext } from "./ReservationCalendarContext";

import { useCalendarState } from "../../../hooks/reservationCalendar/useCalendarState";
import { useCalendarNavigation } from "../../../hooks/reservationCalendar/useCalendarNavigation";
import { useCalendarFilters } from "../../../hooks/reservationCalendar/useCalendarFilters";
import { useDragMessage } from "../../../hooks/reservationCalendar/useDragMessage";
import { useReservationDrag } from "../../../hooks/reservationCalendar/useReservationDrag";
import { usePointerReservationDrag } from "../../../hooks/reservationCalendar/usePointerReservationDrag";

type ReservationCalendarProviderProps = {
    children: ReactNode;
};

export function ReservationCalendarProvider({
    children,
}: ReservationCalendarProviderProps) {

    // Calendar state
    const calendar = useCalendarState();

    // Calendar filters
    const filters = useCalendarFilters();

    // Calendar navigation
    const navigation = useCalendarNavigation({
        weekStart: calendar.weekStart,
        setWeekStart: calendar.setWeekStart,
        setSelectedDate: calendar.setSelectedDate,
    });

    // Drag message
    const dragMessage = useDragMessage();

    // Desktop drag
    const desktopDrag = useReservationDrag({
        calendarReservations: calendar.calendarReservations,
        setCalendarReservations: calendar.setCalendarReservations,
        draggedReservation: calendar.draggedReservation,
        setDraggedReservation: calendar.setDraggedReservation,
        dropPreview: calendar.dropPreview,
        setDropPreview: calendar.setDropPreview,
        showDragMessage: dragMessage.showDragMessage,
    });

    // Mobile / tablet drag
    const pointerDrag = usePointerReservationDrag({
        calendarReservations: calendar.calendarReservations,
        setCalendarReservations: calendar.setCalendarReservations,
        setDraggedReservation: calendar.setDraggedReservation,
        dropPreview: calendar.dropPreview,
        setDropPreview: calendar.setDropPreview,
        showDragMessage: dragMessage.showDragMessage,
    });

    return (
        <ReservationCalendarContext.Provider
            value={{
                weekStart: calendar.weekStart,
                calendar,
                filters,
                navigation,
                dragMessage,
                desktopDrag,
                pointerDrag,
            }}
        >
            {children}
        </ReservationCalendarContext.Provider>
    );
}