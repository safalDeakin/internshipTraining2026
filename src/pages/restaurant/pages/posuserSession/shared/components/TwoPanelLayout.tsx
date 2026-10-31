import { History } from "lucide-react";
import FilterBar from "./FilterBar";
import type { TwoPanelLayoutProps } from "../../types/posSessionTypes";

const TwoPanelLayout = ({
  children,
  panel,
  panelWidth = "400px",

  filters,
  activeFilter,
  onFilterChange,

  search = "",
  onSearchChange,
  onSearch,
  searchPlaceholder = "Search...",

  onHistoryClick,
}: TwoPanelLayoutProps) => {
  const showHeader = filters || onHistoryClick;

  return (
    <div className="flex w-full flex-col items-start gap-5 px-6 lg:flex-row">
      <div className="min-w-0 w-full flex-1">
        {showHeader && (
          <div className="flex items-center justify-between gap-3 p-3">
            {filters && (
              <FilterBar
                filters={filters}
                activeFilter={activeFilter ?? ""}
                onFilterChange={onFilterChange ?? (() => {})}
                search={search}
                onSearchChange={onSearchChange ?? (() => {})}
                onSearch={onSearch ?? (() => {})}
                searchPlaceholder={searchPlaceholder}
              />
            )}

            {onHistoryClick && (
              <button
                type="button"
                onClick={onHistoryClick}
                className="shrink-0 rounded-md p-2 hover:bg-gray-100"
                aria-label="View history"
              >
                <History size={20} />
              </button>
            )}
          </div>
        )}

        {children}
      </div>

      {panel && (
        <div
          className="w-full shrink-0 self-start lg:sticky lg:top-4"
          style={{ maxWidth: panelWidth ?? "400px" }}
        >
          {panel}
        </div>
      )}
    </div>
  );
};

export default TwoPanelLayout;
