import type { ReactNode } from "react";
import { Search } from "lucide-react";
import ListViewHeader from "./ListViewHeader";
import ListViewItem from "./ListViewItem";

type ListViewProps<T> = {
    title: string;
    items: T[];

    getKey: (item: T) => string;
    renderItem: (item: T) => ReactNode;

    onAdd?: () => void;

    searchable?: boolean;
    search?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;

    selectedId?: string | null;
    onSelect?: (item: T) => void;

    emptyMessage?: string;
};

export default function ListView<T>({
    title,
    items,
    getKey,
    renderItem,
    onAdd,

    searchable = false,
    search = "",
    onSearchChange,
    searchPlaceholder = "Search...",

    selectedId = null,
    onSelect,

    emptyMessage = "No items found.",
}: ListViewProps<T>) {
    return (
        <div className="w-80 min-h-screen bg-[#ffffff] pt-5 px-3.75 pb-3.75 m-2">

            <ListViewHeader
                title={title}
                onAdd={onAdd}
            />

            <div className="h-6" />

            <div className="min-h-svh shrink-0 rounded border border-[#e1e7ed] bg-white p-2">

                <div className="p-2">

                    {/* Search */}
                    {searchable && (
                        <div className="mb-3 flex h-9 items-center rounded-[5px] border border-[#e1e7ed] px-2">
                            <Search
                                size={18}
                                className="mr-2 shrink-0 text-[#9ba7b5]"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    onSearchChange?.(event.target.value)
                                }
                                placeholder={searchPlaceholder}
                                className="h-full w-full border-0 bg-transparent text-[14px] text-[#34495e] outline-none placeholder:text-[#9da8b5]"
                            />
                        </div>
                    )}

                    {/* List */}
                    <nav className="flex flex-col">
                        {items.length > 0 ? (
                            items.map((item) => {
                                const key = getKey(item);
                                const isActive = key === selectedId;

                                return (
                                    <ListViewItem
                                        key={key}
                                        active={isActive}
                                        onClick={() => onSelect?.(item)}
                                    >
                                        {renderItem(item)}
                                    </ListViewItem>
                                );
                            })
                        ) : (
                            <div className="py-6 text-center text-[13px] text-[#9ba7b5]">
                                {emptyMessage}
                            </div>
                        )}
                    </nav>

                </div>

            </div>
        </div>
    );
}




//Usage of the listvew like this
// const [search, setSearch] = useState("");
// const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

//     const filteredOffers = offers.filter((offer) =>
//         offer.name
//             .toLowerCase()
//             .includes(search.toLowerCase())
//     );

//     const handleUserSelect = (user: any) => {
//         setSelectedUserId(user.id);
//     };
//     return (
//         <ListView
//             title="Offers"
//             items={filteredOffers}
//             getKey={(offer) => offer.id}
//             selectedId={selectedUserId}
//             onSelect={handleUserSelect}
//             onAdd={() => {
//                 console.log("Add offer");
//             }}
//             renderItem={(offer) => (
//                 <div className="flex flex-col">
//                     <span className="text-[12px] font-medium text-[#29445f]">
//                         {offer.name}
//                     </span>
//                 </div>
//             )}
//             searchable
//             search={search}
//             onSearchChange={setSearch}
//             searchPlaceholder="Search offers..."
//         />