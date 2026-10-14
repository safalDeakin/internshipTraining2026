
import type { ReactNode } from "react";

interface SectionHeadingProps {
    title: string;
    action: ReactNode;
}

export default function SectionHeading({
    title,
    action,
}: SectionHeadingProps) {
    return (
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
                <h2 className="text-[clamp(0.92rem,1.7vw,1.08rem)] font-semibold text-slate-800">
                    {title}
                </h2>
            </div>
            {action}
        </div>
    );
}
