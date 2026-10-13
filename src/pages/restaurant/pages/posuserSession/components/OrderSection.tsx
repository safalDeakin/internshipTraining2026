import { useState } from "react";
import { Minus, Plus, Trash2, ChevronDown } from "lucide-react";
import type { MenuItem } from "../steps/Ordering";

export type OrderLine = MenuItem & {
  qty: number;
};

interface OrderSectionProps {
  title: "KOT" | "BOT";
  items: OrderLine[];
  onChangeQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const OrderSection = ({
  title,
  items,
  onChangeQty,
  onRemove,
}: OrderSectionProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* One heading for the entire KOT or BOT section */}
      <h3 className="text-sm font-semibold">{title}</h3>

      <div className="flex flex-col gap-3 rounded-xl bg-gray-100 p-3">
        {items.map((item) => {
          const expanded = expandedItems.includes(item.id);

          return (
            <div key={item.id} className=" p-3">
              {/* Item row */}
              <div className="flex items-center gap-3">
                {/* Quantity controls */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onChangeQty(item.id, -1)}
                    className="rounded-full bg-gray-200 p-1 text-gray-500 hover:bg-gray-300"
                    aria-label={`Decrease ${item.label} quantity`}
                  >
                    <Minus size={12} />
                  </button>

                  <span className="w-5 text-center text-sm text-red-700">
                    {item.qty}
                  </span>

                  <button
                    type="button"
                    onClick={() => onChangeQty(item.id, 1)}
                    className="rounded-full bg-gray-200 p-1 text-gray-500 hover:bg-gray-300"
                    aria-label={`Increase ${item.label} quantity`}
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Item name */}
                <p className="min-w-0 flex-1 truncate text-sm font-bold">
                  {item.label.trim()}
                </p>

                {/* Notes dropdown for BOTH KOT and BOT */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="shrink-0 rounded p-1 text-gray-600 hover:bg-gray-100"
                  aria-label={`${expanded ? "Hide" : "Show"} notes for ${item.label}`}
                  aria-expanded={expanded}
                >
                  {expanded ? (
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="shrink-0 text-gray-900 hover:text-red-500 "
                      aria-label={`Remove ${item.label}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>

              {/* Expandable notes */}
              {expanded && (
                <div className="mt-3 border-t border-gray-200 pt-5">
                  {/* Remove item */}

                  <label
                    htmlFor={`notes-${title}-${item.id}`}
                    className="mb-1 block text-xs font-medium text-gray-800"
                  >
                    Notes
                  </label>

                  <textarea
                    id={`notes-${title}-${item.id}`}
                    value={notes[item.id] ?? ""}
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    placeholder="Add item notes..."
                    rows={2}
                    className="w-full resize-none rounded-md border border-gray-300 bg-white p-2 text-xs outline-none focus:border-blue-500"
                  />

                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="rounded border border-gray-300 bg-white px-3 py-1 text-xs hover:bg-gray-50"
                    >
                      Add Notes
                    </button>
                  </div>
                </div>
              )}

              {/* Show saved notes when collapsed */}
              {!expanded && notes[item.id]?.trim() && (
                <p className="mt-2 truncate text-xs text-gray-500">
                  Notes: {notes[item.id]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderSection;
