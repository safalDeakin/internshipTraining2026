import { Search } from "lucide-react";


export function SearchBox({ searchQuery, onSearchChange }: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}) {

    return (<div className="mb-3 flex h-9 items-center rounded-[5px] border border-[#e1e7ed] px-2">
        <Search
            size={18}
            className="mr-2 shrink-0 text-[#9ba7b5]"
        />

        <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
                onSearchChange(e.target.value)
            }
            placeholder="Search room types..."
            className="h-full w-full border-0 bg-transparent text-[14px] text-[#34495e] outline-none placeholder:text-[#9da8b5]"
        />
    </div>

    );
}
