import { Search } from 'lucide-react';
import { useReservationState } from '../../../../hooks/allReservation/useReservationState';
import { useUIState } from '../../../../hooks/allReservation/useUIState';

export default function ReservationList() {
    const {
        filteredReservations,
        selectedReservationId,
        search,
        setSearch,
        selectReservation,
    } = useReservationState();

    const { resetTab } = useUIState();

    const handleSelect = (id: string) => {
        selectReservation(id);
        resetTab();
    };

    return (
        <div className="min-h-svh shrink-0 rounded border border-[#e1e7ed] bg-white p-2">
            <div className="p-2">

                {/* Search */}
                <div className="mb-3 flex h-9 items-center rounded-[5px] border border-[#e1e7ed] px-2">
                    <Search
                        size={18}
                        className="mr-2 shrink-0 text-[#9ba7b5]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search reservations..."
                        className="h-full w-full border-0 bg-transparent text-[14px] text-[#34495e] outline-none placeholder:text-[#9da8b5]"
                    />
                </div>

                {/* Reservation List */}
                <nav className="flex flex-col">
                    {filteredReservations.map((r: any) => {
                        const isActive = r.id === selectedReservationId;

                        return (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => handleSelect(r.id)}
                                className={`
                                    flex
                                    min-h-12
                                    w-full
                                    flex-col
                                    justify-center
                                    px-3
                                    py-2
                                    text-left
                                    transition-colors
                                    cursor-pointer
                                    ${isActive
                                        ? 'rounded-[5px] border border-[#2779e6] bg-[#f5f9ff]'
                                        : 'border-0 border-b border-[#e5e9ed] bg-white hover:bg-[#f7faff]'
                                    }
                                `}
                            >
                                {/* Top row */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="truncate text-[12px] font-medium text-[#29445f]">
                                        {r.guest.name}
                                    </span>

                                    {r.checkInTime && (
                                        <span className="shrink-0 text-[11px] text-[#9ba7b5]">
                                            {r.checkInTime}
                                        </span>
                                    )}
                                </div>

                                {/* Reservation details */}
                                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#8a98a8]">
                                    <span>
                                        {r.reservationNumber.replace('RV-', 'R')}
                                    </span>

                                    <span>•</span>

                                    <span>
                                        Room {r.room.number}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </nav>

            </div>
        </div>
    );
}