import { Search } from "lucide-react";
import { useState, type ReactNode } from "react";

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

    const [search,setSearch] = useState("")
    return (
        <div className="min-h-svh shrink-0 rounded border border-[#e1e7ed] bg-white p-2">
            <div className="p-2">
                {/* Search */}
                <div className="mb-3 flex h-9 items-center rounded-[5px] border border-[#e1e7ed] px-2">
                    <Search
                        size={18}
                        className="mr-2 shrink-0 text-[#9ba7b5]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search room types..."
                        className="h-full w-full border-0 bg-transparent text-[14px] text-[#34495e] outline-none placeholder:text-[#9da8b5]"
                    />
                </div>
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

                            ${isActive
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
            </div>
        </div>
    );
}