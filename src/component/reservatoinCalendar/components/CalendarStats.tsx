
import { STATS } from "../data/reservationData";
import { getDotColor } from "../utils/calendarUtils";

export default function CalendarStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-[#e0e7ef] px-4 py-3 flex items-center gap-3"
        >
          <div
            className="w-1 h-9 rounded-full"
            style={{
              background: getDotColor(stat.status),
            }}
          />

          <div>
            <div className="text-2xl font-bold">
              {stat.value}
            </div>

            <div className="text-[11px] text-[#8a9ab0] leading-tight">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

