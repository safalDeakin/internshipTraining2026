import type { ReactNode } from "react";

type ListViewItemProps = {
    children: ReactNode;
    active?: boolean;
    onClick?: () => void;
};

export default function ListViewItem({
    children,
    active = false,
    onClick,
}: ListViewItemProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                flex
                min-h-12
                w-full
                flex-col
                justify-center
                px-3
                py-2
                text-left
                transition-colors
                cursor-pointer
                ${active
                    ? "rounded-[5px] border border-[#2779e6] bg-[#f5f9ff]"
                    : "border-0 border-b border-[#e5e9ed] bg-white hover:bg-[#f7faff]"
                }
            `}
        >
            {children}
        </button>
    );
}