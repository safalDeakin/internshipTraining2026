import { SearchIcon } from "../Icons";
import type { RoomFilters as Filters } from "../model/roomStatusTypes";

interface RoomFiltersProps {
  filters: Filters;
  onChange: (name: keyof Filters, value: string) => void;
}

export function RoomFilters({ filters, onChange }: RoomFiltersProps) {
  return (
    <section className="filter-panel" aria-label="Room filters">
      <label className="field">
        <span>Floor</span>
        <select value={filters.floor} onChange={(event) => onChange("floor", event.target.value)}>
          <option>All</option>
          <option value="1">Floor 1</option>
          <option value="2">Floor 2</option>
        </select>
      </label>
      <label className="field">
        <span>Room type</span>
        <select value={filters.roomType} onChange={(event) => onChange("roomType", event.target.value)}>
          <option>All</option>
          <option>Deluxe</option>
          <option>Standard</option>
          <option>Suite</option>
        </select>
      </label>
      <label className="field">
        <span>Status</span>
        <select value={filters.status} onChange={(event) => onChange("status", event.target.value)}>
          <option>All</option>
          <option>Reserved</option>
          <option>Vacant</option>
          <option>Dirty</option>
          <option>Out of Service</option>
        </select>
      </label>
      <label className="field search-field">
        <span>Search</span>
        <span className="search-control">
          <SearchIcon />
          <input
            onChange={(event) => onChange("search", event.target.value)}
            placeholder="Search by room or reservation"
            type="search"
            value={filters.search}
          />
        </span>
      </label>
    </section>
  );
}
