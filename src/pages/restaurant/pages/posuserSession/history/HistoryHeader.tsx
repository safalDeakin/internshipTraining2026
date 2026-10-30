import { ArrowLeft, Blocks, Table } from "lucide-react";

interface HistoryHeaderProps {
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  onBack: () => void;
}

const HistoryHeader = ({
  viewMode,
  onViewModeChange,
  onBack,
}: HistoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <button
        type="button"
        onClick={onBack}
        className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          className={`rounded-md p-2 ${
            viewMode === "grid"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
        >
          <Blocks size={20} />
        </button>

        <button
          type="button"
          onClick={() => onViewModeChange("table")}
          className={`rounded-md p-2 ${
            viewMode === "table"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Table view"
          aria-pressed={viewMode === "table"}
        >
          <Table size={20} />
        </button>
      </div>
    </div>
  );
};

export default HistoryHeader;
