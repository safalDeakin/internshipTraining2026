import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { POSSession } from "../../../shell/types/posSessionTypes";
import { SessionNavList } from "../../../shell/SessionNavlist";

interface SessionNavGroupProps {
  organizationId: number | string;
  selectedDate: string | null;
  selectedStaffName: string | null;
  handleDateSelect: (date: string) => void;
  handleStaffSelect: (session: POSSession) => void;
}

export default function SessionNavGroup({
  organizationId,
  selectedDate,
  selectedStaffName,
  handleDateSelect,
  handleStaffSelect,
}: SessionNavGroupProps) {
  const [posSessionsOpen, setPosSessionsOpen] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setPosSessionsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            posSessionsOpen ? "rotate-180" : ""
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
