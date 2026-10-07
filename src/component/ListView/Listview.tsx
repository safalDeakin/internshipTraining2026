import type { ReactNode } from "react";

interface SidebarProps {
    children: ReactNode;
    className?: string;
}

export default function Sidebar({
    children,
    className = "",
}: SidebarProps) {
    return (
        <aside
            className={`
                m-2
                min-h-screen
                w-full
                rounded-[5px]
                border
                border-[#e1e7ed]
                bg-white
                px-3.75
                pb-3.75
                pt-5
                ${className}
            `}
        >
            {children}
        </aside>
    );
}
