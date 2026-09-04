import { Plus } from "lucide-react";
import type { CalendarEvent } from "../../types/calendar";
import EventItem from "./EventItem";

interface EventsSidebarProps {
    events: CalendarEvent[];
    onAddEvent: () => void;
    onEditEvent: (event: CalendarEvent) => void;
}

const EventsSidebar = ({
    events,
    onAddEvent,
    onEditEvent,
}: EventsSidebarProps) => {
    const timedEvents = events.filter(
        (event) => event.time
    );

    return (
        <aside
            className="
                w-60
                shrink-0
                border-l
                border-gray-100
                bg-white
                flex
                flex-col
            "
        >
            {/* Header */}
            <div className="px-4 pt-4 pb-3">
                <div className="flex items-center justify-between">

                    <h2 className="text-sm font-semibold text-gray-800">
                        Events
                    </h2>

                    <button
                        onClick={onAddEvent}
                        className=" flex items-center gap-1 rounded bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-100 transition-colors">
                        <Plus size={11} strokeWidth={2.5} />
                        Add Event
                    </button>

                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Total */}
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">

                    <span className="text-xs text-gray-500">
                        Total this month:
                    </span>

                    <span className="text-xs font-semibold text-gray-800">
                        {events.length}
                    </span>

                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Event list */}
            <div className="flex-1 overflow-y-auto px-4 py-3">

                {timedEvents.length === 0 ? (
                    <p className="py-4 text-center text-xs text-gray-400">
                        No timed events this month
                    </p>
                ) : (
                    <div className="space-y-4">
                        {timedEvents.map((event) => (
                            <EventItem
                                key={event.id}
                                event={event}
                                onEdit={onEditEvent}
                            />
                        ))}
                    </div>
                )}

            </div>
        </aside>
    );
};

export default EventsSidebar;