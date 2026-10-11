import { useSyncExternalStore } from "react";
import { calendarStateHolder } from "../states/CalendarStateHolder";

const subscribe = (listener: () => void) => {
    return calendarStateHolder.subscribe(listener);
};

const getSnapshot = () => {
    return calendarStateHolder.getSnapshot();
};

export const useCalendar = () => {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot);

    return {
        ...snapshot,

        setMonth: calendarStateHolder.setMonth.bind(calendarStateHolder),
        setYear: calendarStateHolder.setYear.bind(calendarStateHolder),
        openAddEvent: calendarStateHolder.openAddEvent.bind(calendarStateHolder),
        openAddHoliday: calendarStateHolder.openAddHoliday.bind(calendarStateHolder),
        openEditEvent: calendarStateHolder.openEditEvent.bind(calendarStateHolder),
        updateForm: calendarStateHolder.updateForm.bind(calendarStateHolder),
        saveModal: calendarStateHolder.saveModal.bind(calendarStateHolder),
        deleteEvent: calendarStateHolder.deleteEvent.bind(calendarStateHolder),
        closeModal: calendarStateHolder.closeModal.bind(calendarStateHolder),
    };
};