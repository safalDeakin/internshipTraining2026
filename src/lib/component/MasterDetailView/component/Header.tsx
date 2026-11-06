import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";


export function ListHeader({
    title, children
}: {
    title: string;
    children: ReactNode
}) {
    return (
        <div className="flex h-6 items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center gap-3 text-[#0066b3]">
                <ArrowRight
                    size={24}
                    strokeWidth={2}
                />

                <span className="text-[16px] font-medium text-[#0066B3]">
                    {title}
                </span>

            </div>

            {/* Right Side */}
            {children}
        </div>
    );
}

