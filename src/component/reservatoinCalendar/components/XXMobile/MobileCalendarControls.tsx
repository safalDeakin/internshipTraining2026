import { Search } from "lucide-react";

interface MobileCalendarControlsProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export default function MobileCalendarControls({
    search,
    onSearchChange,
}: MobileCalendarControlsProps) {
    return (
        <div className="relative">
            <Search
                size={17}
                className="
                    pointer-events-none
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-gray-400
                "
            />

            <input
                type="text"
                value={search}
                onChange={(event) =>
                    onSearchChange(event.target.value)
                }
                placeholder="Search room..."
                className="
                    h-10 w-full
                    rounded-lg
                    border border-gray-200
                    bg-white
                    pl-9 pr-3
                    text-sm
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                "
            />
        </div>
    );
}