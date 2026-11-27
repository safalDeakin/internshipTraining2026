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
    <div className="space-y-4" style={{
      height: '100%', backgroundColor: 'white',
      borderRadius: 4,
      padding: '8px 8px'
    }}>
      {monthlyGroups.map((month) => (
        <div key={month.key}
          style={{
            height: '100%',
            gap: '4px'
          }}
        >
          {/* MONTH HEADER */}
          <button
            type="button"
            onClick={() => onMonthSelect(month.key)}
            style={{
              padding: '8px 12px',
            }}


            className={`flex w-full items-center gap-2 px-3 py-3 text-left text-sm transition ${selectedMonth === month.key
              ? "border border-blue-500 bg-blue-50 rounded-lg"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            <Book className="h-4 w-4 shrink-0" />

            <span className="flex-1 font-medium">{month.label}</span>
          </button>

          {/* ALWAYS VISIBLE DATES */}
          <div>
            {month.dates.map((group) => (
              <button
                key={group.date}
                style={{
                  padding: '8px 16px',
                  gap: '8px'
                }}
                type="button"
                onClick={() => onDateSelect(group.date)}
                className={`flex w-full items-center rounded-lg text-left text-sm transition ${selectedDate === group.date
                  ? "bg-blue-50 font-semibold border border-blue-500"
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
