
import type { ReactNode } from "react";

interface SectionHeadingProps {
    children: ReactNode;
}

export default function SectionHeading({
    children,
}: SectionHeadingProps) {
    return (
        <h3 className="mb-3 text-[14px] font-bold tracking-[0.04em] uppercase">
            {children}
        </h3>
    );
}
