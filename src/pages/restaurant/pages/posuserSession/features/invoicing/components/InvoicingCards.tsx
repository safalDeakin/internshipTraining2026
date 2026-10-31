import { Clock } from "lucide-react";
import type { InvoiceType } from "../InvoicingLayout";

export interface InvoicingCardsProps {
  type: InvoiceType;
  reference: string;
  name: string;
  number: string;
  waiter: string;
  table: string;
  time: string;
  itemCount: number;
  image?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const avatarColor: Record<InvoiceType, string> = {
  KOT: "bg-cyan-600",
  BOT: "bg-cyan-600",
  Reservation: "bg-teal-600",
};

const InvoicingCards = ({
  type,
  reference,
  name,
  number,
  waiter,
  table,
  time,
  itemCount,
  image,
  isSelected = false,
  onClick,
}: InvoicingCardsProps) => {
  const badge = type === "Reservation" ? "Res" : type;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`w-full min-w-0 cursor-pointer overflow-hidden rounded-lg border bg-white px-4 py-3 transition ${
        isSelected
          ? "border-2 border-blue-600 shadow-md"
          : "border-gray-100 shadow-md hover:border-gray-300"
      }`}
    >
      {/* Reference + contact */}
      <div className="flex items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[10px] font-medium text-white ${avatarColor[type]}`}
          >
            {badge}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {reference}
          </h3>
          <p className="truncate text-xs text-gray-500">{number}</p>
          <p className="text-xs text-gray-500">Waiter No {waiter}</p>
        </div>
      </div>

      {/* Customer + table */}
      <div className="mt-3">
        <p className="truncate text-xs font-medium text-gray-800">{name}</p>
        <p className="text-xs font-semibold text-gray-800">Table No:{table}</p>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>{itemCount} items</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {time}
        </span>
      </div>
    </div>
  );
};

export default InvoicingCards;
