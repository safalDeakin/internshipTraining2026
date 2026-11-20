
import type { ReactNode } from "react";
import './style.css';
import { SearchBox } from "./SearchBox";
import { ArrowRight } from "lucide-react";



export function ListSection<T extends object, ID>({ title, items, searchQuery,
    selectedId, onSearchChange, onSelect, listItemBuilder, children,
    getId
}: {
    title: string,
    items: T[];
    searchQuery: string;
    selectedId: ID;
    onSearchChange: (value: string) => void;
    onSelect: (id: ID) => void;
    listItemBuilder: (item: T) => ReactNode;
    children: ReactNode;
    getId: (item: T) => ID;

}) {

    return (

        <div className="list-section">
            {/* Header Section */}
            <div className="list-header">
                {/* Header Left Side */}
                <div className="list-title-group">
                    <ArrowRight
                        size={24}
                        strokeWidth={2}
                    />

                    <div className="list-title">
                        {title}
                    </div>
                </div>

                {/* Header Right Side */}
                {children}
            </div>
            {/* List Body. MySpace */}
            <div className="list-item-box">
                {/* Search MySpace*/}
                <SearchBox searchQuery={searchQuery} onSearchChange={onSearchChange} />

                {/* */}
                <nav className="list">
                    {items.map((item) => (
                        <button
                            type="button"
                            onClick={() => onSelect(getId(item))}
                            className={`
               list-tile
                
                ${getId(item) === selectedId ? "list-tile-selected"
                                    : "list-tile-default bg-white hover:bg-[#f7faff]"
                                }`}
                        >
                            {listItemBuilder(item)}
                        </button>
                    ))}

                    {items.length === 0 && (
                        <p className="px-3 py-5 text-center text-[12px] text-[#9ba7b5]">
                            No room types found.
                        </p>
                    )}

                </nav>


            </div>
        </div >
    );
}

export function ListArea<T extends object, ID>({
    items,
    selectedId,
    onSelect,
    itemBuilder,
    getId
}: {
    items: T[]
    selectedId: ID;
    onSelect: (id: ID) => void;
    getId: (item: T) => ID;
    itemBuilder: (item: T) => ReactNode;
}) {

    return (
        <nav className="list">
            {items.map((item) => (
                <button
                    type="button"
                    onClick={() => onSelect(getId(item))}
                    className={`
               list-tile
                
                ${getId(item) === selectedId ? "list-tile-selected"
                            : "list-tile-default bg-white hover:bg-[#f7faff]"
                        }`}
                >
                    {itemBuilder(item)}
                </button>
            ))}

            {items.length === 0 && (
                <p className="px-3 py-5 text-center text-[12px] text-[#9ba7b5]">
                    No room types found.
                </p>
            )}

        </nav>
    );
}


