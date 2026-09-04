import { Plus, ChevronDown } from "lucide-react";
import { MONTHS } from "../../constants/calendar";

interface CalendarToolbarProps {
    month: number;
    year: number;
    years: number[];
    onMonthChange: (month: number) => void;
    onYearChange: (year: number) => void;
    onAddHoliday: () => void;
}

const CalendarToolbar = ({
    month,
    year,
    years,
    onMonthChange,
    onYearChange,
    onAddHoliday,
}: CalendarToolbarProps) => {
    return (
        <div className="grid grid-cols-3 items-center mb-6">
            <div className="flex justify-start">
                <button
                    onClick={onAddHoliday}
                    className=" flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm font-medium px-3 py-1.5 rounded-md transition-colors">
                    <Plus size={14} />
                    Add Holiday
                </button>
            </div>

            <div className="flex items-center justify-center gap-2">
                {/* Month */}
                <div className="relative">
                    <select
                        value={month}
                        onChange={(e) =>
                            onMonthChange(Number(e.target.value))
                        }
                        className=" appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 pr-7 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300">
                        {MONTHS.map((monthName, index) => (
                            <option
                                key={monthName}
                                value={index}
                            >
                                {monthName}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={12}
                        className=" absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                </div>


                {/* Year */}
                <div className="relative">
                    <select
                        value={year}
                        onChange={(e) =>
                            onYearChange(Number(e.target.value))
                        }
                        className=" appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 pr-7 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        {years.map((yearValue) => (
                            <option
                                key={yearValue}
                                value={yearValue}
                            >
                                {yearValue}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={12}
                        className=" absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                </div>
            </div>


            <div className="flex justify-end">
                <div className="relative">
                    <select
                        className=" appearance-none w-26.25 rounded-md border border-gray-200 bg-white px-2 py-1.5 pr-7 text-sm text-gray-500 outline-none cursor-pointer focus:ring-2 focus:ring-indigo-300">
                        <option>Events</option>
                        <option>All</option>
                        <option>Special Events</option>
                        <option>Birthdays</option>
                        <option>Holidays</option>
                    </select>

                    <ChevronDown
                        size={11}
                        className=" absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />

                </div>

            </div>

        </div>
    );
};

export default CalendarToolbar;