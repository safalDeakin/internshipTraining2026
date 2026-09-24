import { ChevronDown } from "lucide-react";
import { MONTHS } from "../data/reservationData";

interface CalendarDateFilterProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const YEARS = Array.from(
    { length: 11 },
    (_, index) => 2020 + index
);

export default function CalendarDateFilter({
    selectedDate,
    onDateChange,
}: CalendarDateFilterProps) {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    /* Number of days in selected month.*/
    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const DAYS = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
    );

    const handleDayChange = (
        value: number
    ) => {
        const date = new Date(
            year,
            month,
            value
        );

        onDateChange(date);
    };

    const handleMonthChange = (value: number) => {
        const maxDays = new Date(
            year,
            value + 1,
            0
        ).getDate();

        const safeDay = Math.min(
            day,
            maxDays
        );

        const date = new Date(
            year,
            value,
            safeDay
        );

        onDateChange(date);
    };

    const handleYearChange = (value: number) => {
        const maxDays = new Date(
            value,
            month + 1,
            0
        ).getDate();

        const safeDay = Math.min(
            day,
            maxDays
        );

        const date = new Date(
            value,
            month,
            safeDay
        );

        onDateChange(date);
    };

    return (
        <div className="flex items-center gap-2">

            {/* Day */}
            <DateSelect
                value={day}
                options={DAYS}
                onChange={handleDayChange}
            />

            {/* Month */}
            <DateSelect
                value={month}
                options={MONTHS.map(
                    (_, index) => index
                )}
                labels={MONTHS}
                onChange={handleMonthChange}
            />

            {/* Year */}
            <DateSelect
                value={year}
                options={YEARS}
                onChange={handleYearChange}
            />

        </div>
    );
}

interface DateSelectProps {
    value: number;
    options: number[];
    labels?: string[];
    onChange: (value: number) => void;
}

function DateSelect({
    value,
    options,
    labels,
    onChange,
}: DateSelectProps) {
    return (
        <div className="relative">

            <select
                value={value}
                onChange={(event) =>
                    onChange(
                        Number(event.target.value)
                    )
                }
                className=" appearance-none bg-[#f8fafc] border border-[#e2e8f0] rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-[#334155] outline-none cursor-pointer transition hover:border-[#cbd5e1] focus:border-[#4db6ac] focus:ring-2 focus:ring-[#4db6ac]/20"
            >
                {options.map((option, index) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {labels
                            ? labels[index]
                            : option}
                    </option>
                ))}
            </select>

            <ChevronDown
                size={15}
                className=" absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748b] "
            />

        </div>
    );
}