import type { CalendarEvent } from "../../types/calendar";
import { DAYS } from "../../constants/calendar";
import { buildCalendarGrid } from "../../utils/calendarUtils";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
    month: number;
    year: number;
    events: CalendarEvent[];
    onAddEvent: (date: number) => void;
    onEditEvent: (event: CalendarEvent) => void;
}

const CalendarGrid = ({ month, year, events, onAddEvent, onEditEvent }: CalendarGridProps) => {
    const cells = buildCalendarGrid(month, year);

    return (
        <>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-semibold text-gray-400 tracking-wider py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 border-t border-l border-gray-100">
                {cells.map((day, index) => {
                    const dayEvents = day
                        ? events.filter(
                            (event) => event.date === day
                        )
                        : [];

                    return (
                        <CalendarDay
                            key={index}
                            day={day}
                            events={dayEvents}
                            onAddEvent={onAddEvent}
                            onEditEvent={onEditEvent}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default CalendarGrid;