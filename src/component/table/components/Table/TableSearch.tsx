interface TableSearchProps {
    searchType?: string;
    onSearchTypeChange?: (type: string) => void;
    onChange?: (value: string) => void;
}

const TYPES = ["All", "Food", "Beverage"];

const TableSearch = ({
    searchType,
    onSearchTypeChange,
    onChange,
}: TableSearchProps) => {
    return (
        <div className="search-header">
            <div className="left-container">
                <h3>Select Type:</h3>

                {TYPES.map((type) => (
                    <button
                        key={type}
                        className={
                            searchType === type
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            onSearchTypeChange?.(type)
                        }
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="right-container">
                <h3>Table Search:</h3>

                <input
                    type="text"
                    onChange={(e) =>
                        onChange?.(e.target.value)
                    }
                    placeholder="Enter here"
                />
            </div>
        </div>
    );
};

export default TableSearch;