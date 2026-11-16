import { Search } from "lucide-react";
import './style.css';

export function SearchBox({ searchQuery, onSearchChange }: {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}) {

    return (<div className="search-box">
        <Search
            className="search-icon"
        />

        <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
                onSearchChange(e.target.value)
            }
            placeholder="Search room types..."
            className="search-input"
        />
    </div>

    );
}
