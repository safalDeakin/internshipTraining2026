import type { CalendarEvent } from "../../types/calendar";
import { EVENT_STYLES } from "../../constants/calendar";

interface CalendarDayProps {
    day: number | null;
    events: CalendarEvent[];
    onAddEvent: (date: number) => void;
    onEditEvent: (event: CalendarEvent) => void;
}

const CalendarDay = ({ day, events, onAddEvent, onEditEvent }: CalendarDayProps) => {
    return (
        <div
            onClick={() => {
                if (day) {
                    onAddEvent(day);
                }
            }}
            className="border-r border-b border-gray-100 min-h-20 p-1.5 relative group cursor-pointer"
        >
            {day && (
                <>
                    <span className="text-sm text-gray-500 leading-none">
                        {day}
                    </span>

                    <div className="mt-1 space-y-0.5">
                        {events.slice(0, 2).map((event) => {
                            const style =
                                EVENT_STYLES[event.type];

                            return (
                                <div
                                    key={event.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEditEvent(event);
                                    }}
                                    className={`${style.bg} ${style.text} text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center justify-between`}
                                >
                                    <span className="truncate">
                                        {event.title}
                                    </span>
                                </div>
                            );
                        })}

                        {events.length > 2 && (
                            <div className="text-[10px] text-gray-400">
                                +{events.length - 2} more
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default CalendarDay;