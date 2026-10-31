import { useState } from "react";

export interface PaymentCardsProps {
  id?: number;
  image?: string;
  name?: string;
  number?: string;
  payment?: string;
  invoice?: string[];
  isSelected?: boolean;
  onClick?: () => void;
}

const PaymentCards = ({
  image,
  name = "",
  number,
  payment,
  invoice = [],
  isSelected,
  onClick,
}: PaymentCardsProps) => {
  const [showAllInvoices, setShowAllInvoices] = useState(false);

  // Get initials: Ram Sharma -> RS
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
      : (nameParts[0]?.[0] ?? "?").toUpperCase();

  const visibleInvoices = showAllInvoices ? invoice : invoice.slice(0, 2);

  return (
    <div
      onClick={onClick}
      className={`w-full min-w-0 cursor-pointer overflow-hidden rounded-lg border bg-white px-4 py-1 transition ${
        isSelected
          ? "border-2 border-blue-700 shadow-md"
          : "border-gray-100 shadow-md hover:border-gray-300"
      }`}
    >
      {/* Person details */}
      <div className="flex items-center gap-3 ">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-lg text-white">
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1 mt-2">
          <h3 className="truncate ">{name}</h3>
          <p className="truncate text-sm text-gray-500">{number}</p>
          <p className="mt-1 text-sm font-medium text-orange-700">
            Rs. {payment}
          </p>
        </div>
      </div>

      {/* Invoice section */}
      <div className="mt-4 pt-3">
        <div className="flex flex-col gap-2">
          <div>
            {visibleInvoices.map((invoiceNumber) => (
              <span
                key={invoiceNumber}
                className="px-1 py-1 text-xs text-gray-900"
              >
                {invoiceNumber}
              </span>
            ))}
          </div>

          <div>
            {invoice.length > 2 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllInvoices((prev) => !prev);
                }}
                className="whitespace-nowrap text-xs text-white bg-cyan-600 px-2 py-1 rounded-2xl"
              >
                {showAllInvoices ? "Show less" : `+${invoice.length - 2} more`}
              </button>
            )}
          </div>

          {invoice.length === 0 && (
            <span className="text-sm text-gray-400">No invoices</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;
