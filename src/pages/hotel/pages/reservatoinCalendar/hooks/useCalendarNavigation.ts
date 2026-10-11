import { getSundayOfWeek } from "../utils/calendarUtils";

interface UseCalendarNavigationProps {
    weekStart: Date;
    setWeekStart: React.Dispatch<React.SetStateAction<Date>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function useCalendarNavigation({
    weekStart,
    setWeekStart,
    setSelectedDate,
}: UseCalendarNavigationProps) {

    const previousWeek = () => {
        const date = new Date(weekStart);

        date.setDate(date.getDate() - 7);

        setWeekStart(date);
    };

    const nextWeek = () => {
        const date = new Date(weekStart);

        date.setDate(date.getDate() + 7);

        setWeekStart(date);
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setWeekStart(getSundayOfWeek(date));
    };

    return {
        previousWeek,
        nextWeek,
        handleDateChange,
    };
}