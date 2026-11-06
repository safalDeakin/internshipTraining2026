import type { ReactNode } from "react";

type ToolbarProps = {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
};

export default function Toolbar({
    left,
    center,
    right,
}: ToolbarProps) {
    return (
        < div className="flex items-center justify-between rounded-md border-b border-gray-200 bg-gray-50 px-4 py-3" >
            <div className="flex items-center h-12 px-4 border-b border-gray-200 bg-white shrink-0">
                <div className="flex items-center gap-2 flex-1">
                    {left}
                </div>

                <div className="flex items-center gap-2">
                    {center}
                </div>

                <div className="flex items-center gap-2 flex-1 justify-end">
                    {right}
                </div>
            </div>
        </div>
    );
}