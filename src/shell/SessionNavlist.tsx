import { Book, CornerDownRight } from "lucide-react";

import type { POSSession } from "./types/posSessionTypes";
import { usePOSNavList } from "./context/PosNavListProvider";
import Scrollable from "../lib/component/scrollable/Scrollable";

interface SessionNavListProps {
  organizationId: string | number;
  selectedDate: string | undefined;
  selectedStaffName: string | undefined;
  onDateSelect: (date: string) => void;
  onSessionSelect: (session: POSSession) => void;
}

export function SessionNavList({
  organizationId,
  selectedDate,
  selectedStaffName,
  onDateSelect,
  onSessionSelect,
}: SessionNavListProps) {
  const { getMonthlyGroupedSessions } = usePOSNavList();

  const monthlyGroups = getMonthlyGroupedSessions(organizationId);

  if (monthlyGroups.length === 0) {
    return (
      <p className="px-2 py-2 text-xs text-gray-400">No POS sessions found.</p>
    );
  }

  return (
    <Scrollable direction="y">
      <div className="mt-1 flex flex-col gap-3 p-2">
        {monthlyGroups.map((month) => (
          <div key={month.key} className="">
            {/* MONTH HEADER */}
            <div className="flex items-center gap-2 rounded-lg border border-blue-500 bg-blue-50 px-3 py-3 text-sm text-gray-700">
              <Book className="h-4 w-4 shrink-0" />

              <span className="font-medium">{month.label}</span>
            </div>

            {/* DATES UNDER MONTH */}
            <div className="mt-2 flex flex-col gap-1">
              {month.dates.map((group) => (
                <div key={group.date}>
                  {/* DATE */}
                  <button
                    type="button"
                    onClick={() => onDateSelect(group.date)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      selectedDate === group.date && !selectedStaffName
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <CornerDownRight className="h-4 w-4 shrink-0" />

                    <span className="min-w-0 flex-1 truncate">
                      {group.formattedDate}
                    </span>

                    <span className="text-xs text-gray-500">
                      ({group.sessions.length})
                    </span>
                  </button>

                  {/* STAFF SESSIONS UNDER DATE */}
                  <div className="ml-5 flex flex-col border-l border-gray-200 pl-3">
                    {group.sessions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSessionSelect(item.session)}
                        className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition-colors ${
                          selectedStaffName === item.staffName && !selectedDate
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600 hover:bg-blue-50"
                        }`}
                      >
                        <span className="min-w-0 flex-1 truncate">
                          {item.staffName}
                        </span>

                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.statusColor}`}
                          title={item.statusLabel}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Scrollable>
  );
}

export default SessionNavList;
