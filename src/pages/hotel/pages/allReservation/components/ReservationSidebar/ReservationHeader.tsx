import { ArrowRight, Plus } from "lucide-react";

interface ReservationSidebarHeaderProps {
    onAdd: () => void;
}

export default function ReservationSidebarHeader({
    onAdd,
}: ReservationSidebarHeaderProps) {
    return (
        <div className="flex h-6 items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-3 text-xl font-medium text-[#0066b3]">
                <ArrowRight
                    size={24}
                    strokeWidth={2}
                />

                <span className="text-[12px] font-medium text-[#0066B3]">
                    All Reservations
                </span>
            </div>

            {/* Right Side Add Button */}
            <button
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-[#f3f7fb]"
                onClick={onAdd}
                aria-label="Add reservation"
            >
                <Plus
                    size={20}
                    strokeWidth={2}
                    className="text-[#0066B3]"
                />
            </button>
        </div>
    );
}