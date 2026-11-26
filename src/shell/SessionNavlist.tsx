import { Book, CornerDownRight } from "lucide-react";

import { usePOSNavList } from "./context/PosNavListProvider";

interface SessionNavListProps {
  organizationId: string | number;
  selectedMonth: string | undefined;
  selectedDate: string | undefined;
  selectedStaffName: string | undefined;
  onDateSelect: (date: string) => void;
  onMonthSelect: (month: string) => void;
  onSessionSelect: (session: any) => void;
}

export function SessionNavList({
  organizationId,
  selectedMonth,
  selectedDate,
  onDateSelect,
  onMonthSelect,
}: SessionNavListProps) {
  const { getMonthlyGroupedSessions } = usePOSNavList();

  const monthlyGroups = getMonthlyGroupedSessions(organizationId);

  return (
    <div className="space-y-4">
      {monthlyGroups.map((month) => (
        <div key={month.key} className="space-y-2">
          {/* MONTH HEADER */}
          <button
            type="button"
            onClick={() => onMonthSelect(month.key)}
            className={`flex w-full items-center gap-2 rounded-lg border px-3 py-3 text-left text-sm transition ${
              selectedMonth === month.key
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Book className="h-4 w-4 shrink-0" />

            <span className="flex-1 font-medium">{month.label}</span>
          </button>

          {/* ALWAYS VISIBLE DATES */}
          <div className="ml-4 space-y-2 border-l border-gray-200 pl-3">
            {month.dates.map((group) => (
              <button
                key={group.date}
                type="button"
                onClick={() => onDateSelect(group.date)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                  selectedDate === group.date
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <CornerDownRight className="h-4 w-4 shrink-0" />

                <span className="flex-1">{group.formattedDate}</span>

                <span className="text-xs text-gray-500">
                  ({group.sessions.length})
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
