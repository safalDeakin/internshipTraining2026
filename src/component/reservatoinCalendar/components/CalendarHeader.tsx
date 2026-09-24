
import type { Status } from "../types/reservation";
import { getDotColor } from "../utils/calendarUtils";

const STATUSES: Status[] = [
  // "Available",
  "Reserved",
  "Occupied",
  "Out of Service",
];

export default function CalendarHeader() {
  return (
    <header className="bg-white border-b border-[#e0e7ef] px-6 py-4 flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Reservation Calendar
        </h1>

        <p className="text-xs text-[#8a9ab0] mt-0.5">
          Room availability and booking overview
        </p>
      </div>

      <div className="flex items-center gap-5 text-xs text-[#5a6a7e]">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="flex items-center gap-1.5"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: getDotColor(status),
              }}
            />

            {status}
          </div>
        ))}
      </div>
    </header>
  );
}

