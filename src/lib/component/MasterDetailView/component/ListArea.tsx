
import type { ReactNode } from "react";
import './style.css';

export default function ListArea<T extends object, ID>({
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



