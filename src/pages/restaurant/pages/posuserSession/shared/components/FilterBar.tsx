import { ChevronDown } from "lucide-react";

interface FilterBarProps {
  filters: readonly string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  searchPlaceholder?: string;
  staffOptions?: string[];
  staff?: string;
  onStaffChange?: (staff: string) => void;
}

const FilterBar = ({
  filters,
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
  onSearch,
  searchPlaceholder = "Search...",
  staffOptions = [],
  staff = "All",
  onStaffChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-3">
      {/* Filter buttons */}
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onFilterChange(filter)}
          className={`rounded-md border px-4 py-1.5 text-xs font-medium transition ${
            activeFilter === filter
              ? "border-orange-200 bg-orange-100 text-orange-600"
              : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          {filter}
        </button>
      ))}

      {/* Search */}
      <form
        className="flex items-center overflow-hidden rounded-md border border-gray-300 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-36 px-3 py-1.5 text-xs outline-none"
        />

        <button
          type="submit"
          className="border-l border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          APPLY
        </button>
      </form>

      {/* Optional staff dropdown */}
      {staffOptions.length > 0 && onStaffChange && (
        <div className="relative">
          <select
            aria-label="Staff"
            value={staff}
            onChange={(e) => onStaffChange(e.target.value)}
            className="appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-xs text-gray-600 outline-none"
          >
            <option value="All">Staff Name</option>

            {staffOptions.map((option) => (
              <option key={option} value={option}>
                Waiter {option}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default FilterBar;
