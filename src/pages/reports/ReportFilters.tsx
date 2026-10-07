interface ReportFiltersProps {
    period: string;
    startDate: string;
    terminal: string;

    onPeriodChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onTerminalChange: (value: string) => void;

    onExportCSV: () => void;
    onPrint: () => void;
}

const ReportFilters = ({
    period,
    startDate,
    terminal,
    onPeriodChange,
    onStartDateChange,
    onTerminalChange,
    onExportCSV,
    onPrint,
}: ReportFiltersProps) => {
    return (
        <div className="flex w-full flex-wrap items-center justify-between gap-3">

            {/* Filter Settings */}
            <div className="flex flex-wrap items-center gap-2">

                <span className="text-xs font-medium text-gray-600 sm:text-sm">
                    Filter Settings:
                </span>

                {/* Period */}
                <select
                    value={period}
                    onChange={(e) => onPeriodChange(e.target.value)}
                    className=" h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-600 outline-none sm:h-9 sm:px-3 sm:text-sm "
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>

                {/* Start Date */}
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className=" h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-600 outline-none sm:h-9 sm:px-3 sm:text-sm "
                />

                {/* Terminal */}
                <select
                    value={terminal}
                    onChange={(e) => onTerminalChange(e.target.value)}
                    className=" h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-600 outline-none sm:h-9 sm:px-3 sm:text-sm "
                >
                    <option value="">Terminal/Counter</option>
                    <option value="Terminal 1">Terminal 1</option>
                    <option value="Terminal 2">Terminal 2</option>
                    <option value="Terminal 3">Terminal 3</option>
                </select>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">

                <button
                    type="button"
                    onClick={onExportCSV}
                    className=" flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-600 hover:bg-gray-50 sm:h-9 sm:px-3 sm:text-sm"
                >
                    ↓ Export CSV
                </button>

                <button
                    type="button"
                    onClick={onPrint}
                    className=" flex h-8 items-center gap-1 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-600 hover:bg-gray-50 sm:h-9 sm:px-3 sm:text-sm "
                >
                    🖨 Print as PDF
                </button>

            </div>
        </div>
    );
};

export default ReportFilters;