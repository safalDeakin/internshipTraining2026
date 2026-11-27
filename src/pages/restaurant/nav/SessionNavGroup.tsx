import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { POSSession } from "../../../shell/types/posSessionTypes";
import { SessionNavList } from "../../../shell/SessionNavlist";
import { usePOSNavList } from "../../../shell/context/PosNavListProvider";

interface SessionNavGroupProps {
  organizationId: number | string;
  reRouteTo: (path: string) => void;
}

export default function SessionNavGroup({
  organizationId,
  reRouteTo,
}: SessionNavGroupProps) {
  const [posSessionsOpen, setPosSessionsOpen] = useState(true);

  const {
    selectedMonth,
    selectedDate,
    selectedStaffName,
    setSelectedMonth,
    setSelectedDate,
    setSelectedStaffName,
  } = usePOSNavList();

  // Select month
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setSelectedDate(undefined);
    setSelectedStaffName(undefined);

    reRouteTo(`pos-overview?month=${month}`);
  };

  // Select date
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedMonth(undefined);
    setSelectedStaffName(undefined);

    reRouteTo(`pos-overview?date=${date}`);
  };

  // Select staff session
  const handleStaffSelect = (session: POSSession) => {
    setSelectedStaffName(session.staffName);
    setSelectedDate(undefined);
    setSelectedMonth(undefined);

    reRouteTo(`pos-overview?session=${session.id}`);
  };

  return (
    <div style={{ height: '100%' }} >
      <button
        type="button"
        onClick={() => setPosSessionsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${posSessionsOpen ? "rotate-180" : ""
            }`}
        />

        <span className="font-medium">Sales Sessions</span>
      </button>

      {posSessionsOpen && (
        <SessionNavList
          organizationId={organizationId}
          selectedMonth={selectedMonth}
          selectedDate={selectedDate}
          selectedStaffName={selectedStaffName}
          onMonthSelect={handleMonthSelect}
          onDateSelect={handleDateSelect}
          onSessionSelect={handleStaffSelect}
        />
      )}
    </div>
  );
}
