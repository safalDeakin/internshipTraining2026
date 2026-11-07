import { useState } from "react";
import { History, Search } from "lucide-react";

interface PaymentToolbarProps {
  onHistoryClick: () => void;
  onApply?: (filters: { search: string; date: string; staff: string }) => void;
}

const PaymentToolbar = ({ onHistoryClick, onApply }: PaymentToolbarProps) => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [staff, setStaff] = useState("");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-3 py-3">
      <div className="flex flex-wrap items-center gap-2 flex-1">
        {/* Search */}
        <div className="flex h-9 min-w-[220px] flex-1 items-center gap-2 rounded-md border border-gray-200 px-3 lg:max-w-[280px]">
          <Search size={15} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Person name, Invoice number, Phone number"
            className="w-full text-xs outline-none"
          />
        </div>

        {/* Apply */}
        <button
          type="button"
          onClick={() => onApply?.({ search, date, staff })}
          className="h-9 rounded-md border border-gray-300 px-3 text-xs hover:bg-gray-100"
        >
          APPLY
        </button>

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-9 rounded-md border border-gray-200 px-2 text-xs text-gray-600 outline-none"
        />

        {/* Staff */}
        <select
          value={staff}
          onChange={(e) => setStaff(e.target.value)}
          className="h-9 min-w-[120px] rounded-md border border-gray-200 bg-white px-2 text-xs outline-none"
        >
          <option value="">Staff Name</option>
          <option value="Ram Sharma">Ram Sharma</option>
          <option value="Sita Thapa">Sita Thapa</option>
          <option value="Hari Gurung">Hari Gurung</option>
        </select>
      </div>

      {/* Payments History */}
      <button
        type="button"
        onClick={onHistoryClick}
        className="flex shrink-0 items-center gap-2 border-l border-gray-200 pl-4 text-xs font-medium text-gray-700 hover:text-blue-600"
      >
        <History size={15} />
        Payments History
      </button>
    </div>
  );
};

export default PaymentToolbar;
