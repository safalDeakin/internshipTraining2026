import { Book, ListCheck } from "lucide-react";

import type { POSSession } from "./types/posSessionTypes";
import { usePOSNavList } from "./context/PosNavListProvider";

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
  const { getGroupedSessions } = usePOSNavList();

  const groupedSessions = getGroupedSessions(organizationId);

  if (groupedSessions.length === 0) {
    return (
      <p className="px-2 py-2 text-xs text-gray-400">No POS sessions found.</p>
    );
  }

  return (
    <div className="mt-1 flex flex-col gap-3 p-2">
      {groupedSessions.map((group) => (
        <div key={group.date} className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => onDateSelect(group.date)}
            className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-left text-sm ${selectedDate === group.date && !selectedStaffName
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 hover:bg-blue-50"
              }`}
          >
            <Book className="h-4 w-4" />

            <span className="font-medium">{group.formattedDate}</span>

            <span className="ml-auto text-xs text-gray-400">
              {group.sessions.length}
            </span>
          </button>

          <div className="ml-3 flex flex-col gap-1 border-l border-gray-200 pl-3">
            {group.sessions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSessionSelect(item.session)}
                className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs ${selectedStaffName === item.staffName && !selectedDate
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-blue-50"
                  }`}
              >
                <ListCheck className="h-4 w-4 shrink-0" />

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
  );
}

export default SessionNavList;
