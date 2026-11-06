
import './style.css';
type ListViewItemProps = {
    title: string;
    subtitle?: string;
    status?: string;
    dateRange?: string;
    isActive?: boolean;
};

export default function ListViewItem({
    title,
    subtitle,
    status,
    dateRange,
    isActive,
}: ListViewItemProps) {

    return (
        <>
            <div className="flex w-full flex-col justify-center gap-1 py-2">

                {/* Title */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#29445f]">
                        {title}
                    </span>

                    {status && (
                        <span className="text-xs text-gray-500">
                            {status}
                        </span>
                    )}
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <span className="text-xs text-gray-500">
                        {subtitle}
                    </span>
                )}

                {/* Date */}
                {dateRange && (
                    <span className="text-xs text-gray-400">
                        {dateRange}
                    </span>
                )}

            </div>
        </>
    );
}