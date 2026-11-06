
import type { ReactNode } from "react";


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
        <nav className="flex flex-col" aria-label="Room types">

            {items.map((item) => (
                <button
                    type="button"
                    onClick={() => onSelect(getId(item))}
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
                ${getId(item) === selectedId}? "rounded-[5px] border border-[#2779e6] bg-[#f5f9ff]"
                                                : "border-0 border-b border-[#e5e9ed] bg-white hover:bg-[#f7faff]"
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



