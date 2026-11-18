import { useMemo } from "react";
import { Book, ListCheck } from "lucide-react";
import type { POSSession } from "./types/posSessionTypes";
import { useSession } from "./context/SessionProvider";

//Displays session list in navbar	Gets filtered sessions using useSession()
interface SessionNavListProps {
  organizationId?: string | number;
  selectedDate: string | null;
  selectedStaffName: string | null;
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
  const { sessions, checkIfSessionIsActive } = useSession();

  // Only show sessions belonging to the current organization.
  // Keep the latest session for each staff member.
  const organizationSessions = useMemo(() => {
    if (organizationId == null) return [];

    const filtered = sessions.filter(
      (session) => String(session.organizationId) === String(organizationId),
    );

    const latestByStaff = new Map<string, POSSession>();

    filtered.forEach((session) => {
      const staffKey = String(session.staffId);
      const existing = latestByStaff.get(staffKey);

      if (
        !existing ||
        new Date(session.startTime).getTime() >
          new Date(existing.startTime).getTime()
      ) {
        latestByStaff.set(staffKey, session);
      }
    });

    return Array.from(latestByStaff.values());
  }, [sessions, organizationId]);

  // Group sessions by date and sort newest dates first.
  const groupedSessions = useMemo(() => {
    const groups = organizationSessions.reduce<Record<string, POSSession[]>>(
      (result, session) => {
        const date = session.date.slice(0, 10);

        if (!result[date]) result[date] = [];

        result[date].push(session);
        return result;
      },
      {},
    );

    Object.values(groups).forEach((dateSessions) => {
      dateSessions.sort(
        (a, b) =>
          new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
      );
    });

    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [organizationSessions]);

  const formatDate = (date: string) => {
    const parsedDate = new Date(`${date}T12:00:00+05:45`);

    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  const statusConfig = {
    active: { label: "Active", color: "bg-green-500" },
    paused: { label: "Paused", color: "bg-orange-500" },
    ended: { label: "Ended", color: "bg-gray-400" },
    stale: { label: "Not closed", color: "bg-red-500" }, // NEW
  };

  if (groupedSessions.length === 0) {
    return (
      <p className="px-2 py-2 text-xs text-gray-400">No POS sessions found.</p>
    );
  }

  return (
    <div className="mt-1 flex flex-col gap-3 bg-white p-2">
      {groupedSessions.map(([date, dateSessions]) => (
        <div key={date} className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => onDateSelect(date)}
            className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-left text-sm ${
              selectedDate === date && !selectedStaffName
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 hover:bg-blue-50"
            }`}
          >
            <Book className="h-4 w-4" />

            <span className="font-medium">{formatDate(date)}</span>

            <span className="ml-auto text-xs text-gray-400">
              {dateSessions.length}
            </span>
          </button>

          <div className="ml-3 flex flex-col gap-1 border-l border-gray-200 pl-3">
            {dateSessions.map((session) => {
              const isActive = checkIfSessionIsActive(session.id);

              const status = isActive
                ? statusConfig.active
                : session.status === "paused"
                  ? statusConfig.paused
                  : session.status === "active"
                    ? statusConfig.stale // marked active, but not today
                    : statusConfig.ended;
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => onSessionSelect(session)}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs ${
                    selectedStaffName === session.staffName && !selectedDate
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  <ListCheck className="h-4 w-4 shrink-0" />

                  <span className="min-w-0 flex-1 truncate">
                    {session.staffName}
                  </span>

                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${status.color}`}
                    title={status.label}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
