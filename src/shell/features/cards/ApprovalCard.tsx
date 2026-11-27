import type { ApprovalCard as ApprovalCardType } from "../types/ApprovalTypes";

interface ApprovalCardsProps {
  approval: ApprovalCardType;
  isSelected?: boolean;
  onClick?: () => void;
}

const ApprovalCards = ({
  approval,
  isSelected,
  onClick,
}: ApprovalCardsProps) => {
  const { requestType, requestNo, amount, requestedAgo, status, requestedBy } =
    approval;

  const nameParts = requestedBy.trim().split(/\s+/);

  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : (nameParts[0]?.[0] ?? "?");

  return (
    <div
      onClick={onClick}
      className={`w-full min-w-0 cursor-pointer rounded-xl border bg-white p-3 shadow-sm transition-all hover:shadow-md ${
        isSelected
          ? "border-blue-700 ring-1 ring-blue-700 shadow-md"
          : "border-gray-200"
      }`}
    >
      {/* Request information */}
      <div className="flex items-start gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-medium text-white">
          {initials.toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-gray-800">
            {requestType}
          </h3>

          <p className="truncate text-xs text-gray-400">{requestNo}</p>
        </div>
      </div>

      {/* Amount */}
      <p className="mt-2 text-sm font-medium text-orange-600">Rs {amount}</p>

      {/* Time and status */}
      <div className="mt-3 flex items-center justify-between gap-1">
        <span className="truncate text-xs text-gray-600">{requestedAgo}</span>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium text-white ${
            status === "Pending" ? "bg-cyan-600" : "bg-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Requested by */}
      <p className="mt-2 truncate text-xs text-gray-700">By {requestedBy}</p>
    </div>
  );
};

export default ApprovalCards;
