
import { ArrowRight, Plus } from "lucide-react";

type RoomSidebarHeaderProps = {
    onAdd?: () => void;
};

export default function RoomSidebarHeader({
    onAdd,
}: RoomSidebarHeaderProps) {
    return (
        <div className="flex h-6 items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-3 text-[#0066b3]">
                <ArrowRight
                    size={24}
                    strokeWidth={2}
                />

                <span className="text-[16px] font-medium text-[#0066B3]">
                    All Room Types
                </span>

            </div>

            {/* Right Side */}
            <button
                type="button"
                onClick={onAdd}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-[#f3f7fb]"
                aria-label="Add room type"
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

