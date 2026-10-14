import { ArrowRight, Plus } from "lucide-react";

type ListViewHeaderProps = {
    title: string;
    onAdd?: () => void;
};

export default function ListViewHeader({
    title,
    onAdd,
}: ListViewHeaderProps) {
    return (
        <div className="flex items-center h-6 justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-3 text-[#0066b3] text-xl font-medium">
                <ArrowRight
                    size={24}
                    strokeWidth={2}
                />

                <span>{title}</span>
            </div>

            {/* Add */}
            {onAdd && (
                <button
                    type="button"
                    onClick={onAdd}
                    className="flex h-8 w-8 items-center justify-center rounded border border-[#e1e7ed] bg-white cursor-pointer"
                >
                    <Plus
                        size={18}
                        className="text-[#0066b3]"
                    />
                </button>
            )}
        </div>
    );
}