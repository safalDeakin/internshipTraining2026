
import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    handleChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({
    value,
    handleChange,
    placeholder = "Search...",
    className = "",
}: SearchInputProps) {
    return (
        <div
            className={`
        flex
        h-9
        items-center
        rounded-[5px]
        border
        border-[#e1e7ed]
        px-2
        ${className}
        `}
        >
            <Search
                size={18}
                className=" shrink-0 text-[#9ba7b5]"
            />

            <input
                type="text"
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={placeholder}
                className="
                    h-full
                    w-full
                    border-0
                    bg-transparent
                    text-[14px]
                    text-[#34495e]
                    outline-none
                    placeholder:text-[#9da8b5]
                "
            />
        </div>
    );
}
