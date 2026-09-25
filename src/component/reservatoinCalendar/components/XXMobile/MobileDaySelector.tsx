import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface MobileDaySelectorProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }).format(date);
}

export default function MobileDaySelector({
    selectedDate,
    onDateChange,
}: MobileDaySelectorProps) {
    const changeDay = (amount: number) => {
        const nextDate = new Date(selectedDate);

        nextDate.setDate(
            nextDate.getDate() + amount
        );

        onDateChange(nextDate);
    };

    const goToToday = () => {
        onDateChange(new Date());
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-3 py-3">
                <button
                    type="button"
                    onClick={() => changeDay(-1)}
                    className="
                        flex h-9 w-9 items-center justify-center
                        rounded-lg
                        text-gray-500
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                        active:scale-95
                    "
                    aria-label="Previous day"
                >
                    <ChevronLeft size={19} />
                </button>

                <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
                    <CalendarDays
                        size={17}
                        className="shrink-0 text-gray-500"
                    />

                    <span className="truncate text-sm font-semibold text-gray-900">
                        {formatDate(selectedDate)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => changeDay(1)}
                    className="
                        flex h-9 w-9 items-center justify-center
                        rounded-lg
                        text-gray-500
                        transition
                        hover:bg-gray-100
                        hover:text-gray-900
                        active:scale-95
                    "
                    aria-label="Next day"
                >
                    <ChevronRight size={19} />
                </button>
            </div>

            <div className="border-t border-gray-100 px-3 py-2">
                <button
                    type="button"
                    onClick={goToToday}
                    className="
                        w-full rounded-lg
                        py-1.5
                        text-xs font-medium
                        text-blue-600
                        transition
                        hover:bg-blue-50
                    "
                >
                    Today
                </button>
            </div>
        </div>
    );
}