import { Pencil } from "lucide-react";
import type { CalendarEvent } from "../../types/calendar";
import { MONTHS } from "../../constants/calendar";

interface EventItemProps {
    event: CalendarEvent;
    onEdit: (event: CalendarEvent) => void;
}

const EventItem = ({
    event,
    onEdit,
}: EventItemProps) => {

    const dotStyles: Record<string, string> = {
        marketing: "bg-emerald-400",
        internal: "bg-sky-400",
        special: "bg-blue-400",
        birthday: "bg-orange-400",
        holiday: "bg-gray-400",
    };

    const textStyles: Record<string, string> = {
        marketing: "text-emerald-500",
        internal: "text-sky-500",
        special: "text-blue-500",
        birthday: "text-orange-500",
        holiday: "text-gray-500",
    };

    return (
        <div>
            {/* Date */}
            <div className="mb-1 text-xs font-medium text-gray-600">
                {MONTHS[event.month]}-{event.date}
            </div>

            {/* Event title + pencil */}
            <div className="flex items-center justify-between gap-2">

                <div className="flex min-w-0 items-center gap-1.5">

                    {/* Dot */}
                    <span
                        className={`
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            ${dotStyles[event.type] ?? "bg-blue-400"}
                        `}
                    />

                    {/* Title */}
                    <span
                        className={`
                            truncate
                            text-xs
                            font-medium
                            ${textStyles[event.type] ?? "text-blue-500"}
                        `}
                    >
                        {event.title}
                    </span>

                </div>

                {/* Edit */}
                <button
                    onClick={() => onEdit(event)}
                    className="
                        shrink-0
                        text-indigo-500
                        hover:text-indigo-700
                        transition-colors
                    "
                    aria-label={`Edit ${event.title}`}
                >
                    <Pencil
                        size={11}
                        strokeWidth={2.5}
                    />
                </button>

            </div>

            {/* Subtitle + time */}
            <div className="mt-1 flex items-center justify-between pl-3">

                <span className="truncate text-xs text-gray-500">
                    {event.subtitle}
                </span>

                <span className="ml-2 whitespace-nowrap text-xs text-gray-500">
                    {event.time}
                </span>

            </div>
        </div>
    );
};

export default EventItem;