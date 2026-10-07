import type { ReactNode } from "react";

interface SidebarListProps<T> {
    items: T[];
    selectedId?: string;

    getId: (item: T) => string;
    onSelect: (item: T) => void;

    renderItem: (item: T, isActive: boolean) => ReactNode;
}

export default function SidebarList<T>({
    items,
    selectedId,
    getId,
    onSelect,
    renderItem,
}: SidebarListProps<T>) {
    return (
        <nav className="flex flex-col">
            {items.map((item) => {
                const id = getId(item);
                const isActive = id === selectedId;

                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => onSelect(item)}
                        className={`
                            flex
                            min-h-12
                            w-full
                            items-center
                            px-3
                            text-left
                            text-[15px]
                            text-[#29445f]
                            transition-colors
                            cursor-pointer

                            ${
                                isActive
                                    ? `
                                        rounded-[5px]
                                        border
                                        border-[#2779e6]
                                        bg-[#f5f9ff]
                                    `
                                    : `
                                        border-0
                                        border-b
                                        border-[#e5e9ed]
                                        bg-white
                                        hover:bg-[#f7faff]
                                    `
                            }
                        `}
                    >
                        {renderItem(item, isActive)}
                    </button>
                );
            })}
        </nav>
    );
}