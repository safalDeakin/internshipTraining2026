import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDayActivity } from "../provider/useDayActivity";

export function Sidebar() {
    const { data, selectedBuilding, selectBuilding } = useDayActivity();
    const buildings = data[0]?.buildings ?? [];
    const [search, setSearch] = useState("");

    const filteredBuildings = useMemo(
        () =>
            buildings.filter((building) =>
                building.name.toLowerCase().includes(search.trim().toLowerCase()),
            ),
        [buildings, search],
    );

    return (
        <aside className="w-full shrink-0 border-b border-[#e8eaec] bg-white p-3 md:w-41.5 md:border-r md:border-b-0">
            <label className="flex h-7 items-center gap-1.5 border border-[#dfe3e6] px-2 text-[#96a0a7]">
                <Search size={12} />
                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search building..."
                    className="min-w-0 flex-1 bg-transparent text-[10px] text-[#46545c] outline-none placeholder:text-[#a7afb4]"
                />
            </label>

            <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-3 md:block">
                {filteredBuildings.map((building) => {
                    const isSelected = building.id === selectedBuilding?.id;
                    return (
                        <button
                            type="button"
                            key={building.id}
                            onClick={() => selectBuilding(building.id)}
                            className={`w-full border px-2 py-1.5 text-left transition-colors md:mb-0.5 ${isSelected
                                ? "border-[#6b9bc5] bg-[#f6fbff]"
                                : "border-transparent hover:bg-[#f7f8f9]"
                                }`}
                        >
                            <span className="block truncate text-[10px] text-[#35434b]">{building.name}</span>
                            <span className="mt-0.5 block text-[9px] text-[#a1a8ac]">{building.rooms} Rooms</span>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}
