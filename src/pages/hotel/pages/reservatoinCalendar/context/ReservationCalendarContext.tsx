
import { createContext, useContext } from "react";

import type { useCalendarState } from "../../../hooks/reservationCalendar/useCalendarState";
import type { useCalendarFilters } from "../../../hooks/reservationCalendar/useCalendarFilters";
import type { useCalendarNavigation } from "../../../hooks/reservationCalendar/useCalendarNavigation";
import type { useDragMessage } from "../../../hooks/reservationCalendar//useDragMessage";
import type { useReservationDrag } from "../../../hooks/reservationCalendar/useReservationDrag";
import type { usePointerReservationDrag } from "../../../hooks/reservationCalendar/usePointerReservationDrag";

export type ReservationCalendarContextValue = {
    weekStart: Date;
    calendar: ReturnType<typeof useCalendarState>;
    filters: ReturnType<typeof useCalendarFilters>;
    navigation: ReturnType<typeof useCalendarNavigation>;
    dragMessage: ReturnType<typeof useDragMessage>;
    desktopDrag: ReturnType<typeof useReservationDrag>;
    pointerDrag: ReturnType<typeof usePointerReservationDrag>;
};

export const ReservationCalendarContext =
    createContext<ReservationCalendarContextValue | null>(null);

export function useReservationCalendarContext() {
    const context = useContext(ReservationCalendarContext);

    if (!context) {
        throw new Error(
            "useReservationCalendarContext must be used inside ReservationCalendarProvider"
        );
    }

    return context;
}
