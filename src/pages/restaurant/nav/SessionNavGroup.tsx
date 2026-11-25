import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { POSSession } from "../../../shell/types/posSessionTypes";
import { SessionNavList } from "../../../shell/SessionNavlist";
import { usePOSNavList } from "../../../shell/context/PosNavListProvider";

interface SessionNavGroupProps {
  organizationId: number | string;
  reRouteTo: (path: string) => void
}

export default function SessionNavGroup({
  organizationId,
  reRouteTo
}: SessionNavGroupProps) {
  const [posSessionsOpen, setPosSessionsOpen] = useState(true);

  const {
    selectedDate,
    selectedStaffName,
    setSelectedDate,
    setSelectedStaffName,
  } = usePOSNavList();

  // Select date
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedStaffName(null);
    reRouteTo("pos-overview");
  };

  // Select staff session
  const handleStaffSelect = (session: POSSession) => {
    setSelectedStaffName(session.staffName);
    setSelectedDate(null);
    reRouteTo("pos-overview");
  };


  return (
    <div>
      <button
        type="button"
        onClick={() => setPosSessionsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${posSessionsOpen ? "rotate-180" : ""
            }`}
        />

        <span className="font-medium">POS Sessions</span>
      </button>

      {posSessionsOpen && (
        <SessionNavList
          organizationId={organizationId}
          selectedDate={selectedDate}
          selectedStaffName={selectedStaffName}
          onDateSelect={handleDateSelect}
          onSessionSelect={handleStaffSelect}
        />
      )}
    </div>
  );
}
