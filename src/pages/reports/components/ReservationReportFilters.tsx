import ReportFilterField from "./ReportFilterField";

interface ReservationReportFiltersProps {
    search: string;
    status: string;
    roomType: string;
    paymentStatus: string;
    fromDate: string;
    toDate: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onRoomTypeChange: (value: string) => void;
    onPaymentStatusChange: (value: string) => void;
    onFromDateChange: (value: string) => void;
    onToDateChange: (value: string) => void;

    onReset: () => void;
}

const ReservationReportFilters = ({
    search,
    status,
    roomType,
    paymentStatus,
    fromDate,
    toDate,
    onSearchChange,
    onStatusChange,
    onRoomTypeChange,
    onPaymentStatusChange,
    onFromDateChange,
    onToDateChange,
    onReset,
}: ReservationReportFiltersProps) => {
    return (
        <div className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">

                <ReportFilterField label="Search">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Guest or reservation"
                        className="w-full border rounded px-3 py-2"
                    />
                </ReportFilterField>

                <ReportFilterField label="Status">
                    <select
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Checked In">Checked In</option>
                        <option value="Checked Out">Checked Out</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </ReportFilterField>

                <ReportFilterField label="Room Type">
                    <select
                        value={roomType}
                        onChange={(e) => onRoomTypeChange(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">All</option>
                        <option value="Standard">Standard</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Suite">Suite</option>
                    </select>
                </ReportFilterField>

                <ReportFilterField label="Payment Status">
                    <select
                        value={paymentStatus}
                        onChange={(e) =>
                            onPaymentStatusChange(e.target.value)
                        }
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">All</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Partial">Partial</option>
                        <option value="Paid">Paid</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                </ReportFilterField>

                <ReportFilterField label="From Date">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => onFromDateChange(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </ReportFilterField>

                <ReportFilterField label="To Date">
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => onToDateChange(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </ReportFilterField>

            </div>

            <button
                onClick={onReset}
                className="mt-4 border rounded px-4 py-2"
            >
                Reset
            </button>
        </div>
    );
};

export default ReservationReportFilters;