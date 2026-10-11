import { useMemo, useState } from "react";
import type { ViewMode, Reservation, DropPreview } from "../types/reservation";
import {
    getSundayOfWeek,
    getWeekDates,
    isSameDay,
} from "../utils/calendarUtils";
import {
    RESERVATIONS,
    SLOTS_PER_DAY,
    TOTAL_SLOTS,
} from "../data/reservationData";

export function useCalendarState() {
    const [viewMode, setViewMode] =
        useState<ViewMode>("Weekly");

    const [selectedDate, setSelectedDate] =
        useState(() => new Date());

    const [weekStart, setWeekStart] =
        useState(() => getSundayOfWeek(new Date()));

    const [showBottomRuler, setShowBottomRuler] =
        useState(false);

    const [calendarReservations, setCalendarReservations] =
        useState<Record<string, Reservation[]>>(RESERVATIONS);

    const [draggedReservation, setDraggedReservation] =
        useState<Reservation | null>(null);

    const [dropPreview, setDropPreview] =
        useState<DropPreview | null>(null);

    const weekDates = useMemo(
        () => getWeekDates(weekStart),
        [weekStart]
    );

    const [today] = useState(() => new Date());

    const todaySlotPos = useMemo(() => {
        const dayIndex = weekDates.findIndex(
            (date) => isSameDay(date, today)
        );

        if (dayIndex < 0) {
            return -1;
        }

        const hourFraction =
            (today.getHours() + today.getMinutes() / 60) / 24;

        return (
            (
                dayIndex * SLOTS_PER_DAY +
                hourFraction * SLOTS_PER_DAY
            ) / TOTAL_SLOTS
        );
    }, [weekDates, today]);

    return {
        viewMode,
        setViewMode,

        selectedDate,
        setSelectedDate,

        weekStart,
        setWeekStart,

        showBottomRuler,
        setShowBottomRuler,

        calendarReservations,
        setCalendarReservations,

        draggedReservation,
        setDraggedReservation,

        dropPreview,
        setDropPreview,

        weekDates,
        today,
        todaySlotPos,
    };
}