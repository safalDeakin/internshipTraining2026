import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import type { KOTCancelFormProps, KOTItem } from "../../types/posSessionTypes";

import ReusableButton from "./ReusableButton";
import ReceiptFrame from "./ReceiptFrame";
import LoadingOverlay from "./LoadingOverlay";

const formatDate = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const inputClass =
  "h-9 w-full rounded-md border border-gray-300 px-3 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

const KOTCancelForm = ({ cards, onClose }: KOTCancelFormProps) => {
  const [cancelledItems, setCancelledItems] = useState<KOTItem[]>([]);
  const [additionalNote, setAdditionalNote] = useState("");
  const [cancelBy, setCancelBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // This form currently receives one selected order.
  const selectedOrder = cards[0];

  // Convert order items into cancellation items.
  const originalItems = useMemo<KOTItem[]>(
    () =>
      cards.flatMap((card) =>
        card.invoiceItems.map((item) => ({
          id: `${card.id}-${item.id}`,
          name: item.name,
          qty: item.quantity,
          reference: card.reference,
        })),
      ),
    [cards],
  );

  const cancelledIds = new Set(cancelledItems.map((item) => item.id));

  // Add item to cancellation list.
  const addCancellation = (item: KOTItem) => {
    if (isConfirmed || cancelledIds.has(item.id)) return;

    setCancelledItems((prev) => [...prev, item]);
  };

  // Remove item from cancellation list.
  const removeCancellation = (id: string) => {
    if (isConfirmed) return;

    setCancelledItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Confirm cancellation.
  const handleConfirm = () => {
    if (cancelledItems.length === 0 || !cancelBy.trim() || isLoading) {
      return;
    }

    setIsLoading(true);

    // Temporary UI simulation.
    window.setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
    }, 1500);
  };

  return (
    <div className="relative grid h-full min-h-[560px] grid-cols-1 overflow-hidden rounded-lg bg-white md:grid-cols-2">
      {/* LEFT PANEL: ORIGINAL ORDER ITEMS */}
      <section className="flex min-h-0 flex-col justify-between border-b border-gray-300 p-4 md:border-b-0 md:border-r md:p-5">
        <div className="min-h-0">
          <p className="text-right text-xs text-gray-400">
            Date: {formatDate()}
          </p>

          <div className="mt-7">
            <h3 className="text-base font-semibold text-gray-900">
              Order Items
            </h3>

            <div className="mt-4 grid grid-cols-[1.5fr_0.9fr_0.5fr] pb-2 text-xs font-semibold text-gray-800">
              <span>Items</span>
              <span>Qty</span>
              <span className="text-right">Action</span>
            </div>

            <div className="max-h-[48vh] overflow-y-auto">
              {originalItems.map((item) => {
                const selected = cancelledIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={`grid grid-cols-[1.5fr_0.9fr_0.5fr] items-center py-3 text-xs ${
                      selected ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.name}</p>
                    </div>

                    <span>{item.qty} Unit</span>

                    <div className="flex justify-end">
                      <ReusableButton
                        type="button"
                        title=""
                        icon={<Trash2 size={15} />}
                        variant="outline"
                        size="sm"
                        disabled={selected || isConfirmed}
                        onClick={() => addCancellation(item)}
                        className="!p-1"
                      />
                    </div>
                  </div>
                );
              })}

              {originalItems.length === 0 && (
                <p className="py-8 text-center text-xs text-gray-400">
                  No order items available.
                </p>
              )}
            </div>
          </div>
        </div>

        <ReusableButton
          type="button"
          title="Cancel"
          variant="outline"
          className="mt-6 w-full"
          disabled={isLoading}
          onClick={onClose}
        />
      </section>

      {/* RIGHT PANEL: CANCEL FORM / RECEIPT */}
      <section className="relative flex min-h-0 flex-col justify-between overflow-hidden p-4 md:p-5">
        {!isConfirmed ? (
          <>
            <div className="min-h-0">
              <h2 className="border-b border-gray-200 pb-4 text-center text-base font-semibold text-gray-800">
                Order Cancel Form
              </h2>

              {/* Selected Items */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Cancel Items
                </h3>

                <div className="mt-4 grid grid-cols-[0.7fr_0.8fr_1.3fr_0.3fr] pb-2 text-xs font-semibold text-gray-800">
                  <span>S.No.</span>
                  <span>Qty</span>
                  <span>Item</span>
                  <span />
                </div>

                {cancelledItems.length === 0 ? (
                  <p className="py-5 text-center text-xs text-gray-500">
                    No items added
                  </p>
                ) : (
                  <div className="max-h-[30vh] overflow-y-auto">
                    {cancelledItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[0.7fr_0.8fr_1.3fr_0.3fr] items-center py-2.5 text-xs text-gray-700"
                      >
                        <span>{index + 1}</span>
                        <span>{item.qty}</span>
                        <span className="truncate">{item.name}</span>

                        <button
                          type="button"
                          onClick={() => removeCancellation(item.id)}
                          disabled={isLoading}
                          className="flex justify-end text-gray-400 hover:text-red-500 disabled:opacity-50"
                          aria-label={`Remove ${item.name} from cancellation`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cancellation Details */}
              <div className="mt-5 space-y-3">
                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                  <label
                    htmlFor="additional-note"
                    className="text-xs font-medium text-gray-700"
                  >
                    Additional Note:
                  </label>

                  <input
                    id="additional-note"
                    value={additionalNote}
                    onChange={(e) => setAdditionalNote(e.target.value)}
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                  <label
                    htmlFor="cancel-by"
                    className="text-xs font-medium text-gray-700"
                  >
                    Cancel By:
                  </label>

                  <input
                    id="cancel-by"
                    value={cancelBy}
                    onChange={(e) => setCancelBy(e.target.value)}
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <ReusableButton
                type="button"
                title="Cancel"
                variant="outline"
                className="w-full"
                disabled={isLoading}
                onClick={onClose}
              />

              <ReusableButton
                type="button"
                title="Confirm"
                variant="primary"
                className="w-full"
                disabled={
                  cancelledItems.length === 0 || !cancelBy.trim() || isLoading
                }
                onClick={handleConfirm}
              />
            </div>
          </>
        ) : (
          /* CANCELLATION RECEIPT */
          <ReceiptFrame
            hotelName="VIP Restaurant"
            address="Banepa-07, Kavre"
            phone="+977 9800000000"
            onPrint={() => window.print()}
          >
            {/* Order and Customer Information */}
            <div className="mt-6 text-sm">
              <div className="space-y-3 text-right">
                <p className="text-gray-500">
                  Order Number:{" "}
                  <span className="font-medium text-gray-800">
                    {selectedOrder?.reference ?? "-"}
                  </span>
                </p>

                <p className="text-gray-500">
                  Date:{" "}
                  <span className="font-medium text-gray-800">
                    {formatDate()}
                  </span>
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-gray-500">
                  Customer Name:{" "}
                  <span className="font-medium text-gray-800">
                    {selectedOrder?.customerName ?? "-"}
                  </span>
                </p>

                <p className="text-gray-500">
                  Phone Number:{" "}
                  <span className="font-medium text-gray-800">
                    {selectedOrder?.phone ?? "-"}
                  </span>
                </p>

                <p className="text-right text-gray-500">
                  Table:{" "}
                  <span className="font-medium text-gray-800">
                    {selectedOrder?.table ?? "-"}
                  </span>
                </p>
              </div>
            </div>

            {/* Cancelled Items */}
            <h3 className="mt-5 text-xs font-semibold text-gray-800">
              Cancelled Items
            </h3>

            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-2 pb-2 text-[11px] font-semibold text-gray-700">
                <span>Qty</span>
                <span>Items</span>
              </div>

              {cancelledItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-2 items-center py-1.5 text-[11px] text-gray-700"
                >
                  <span>{item.qty}</span>
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>

            {additionalNote.trim() && (
              <p className="mt-4 text-xs text-gray-600">
                Note: {additionalNote}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-600">
              Cancelled By: {cancelBy}
            </p>

            <h3 className="mt-5 text-center font-bold">Thank you!</h3>
          </ReceiptFrame>
        )}

        {/* LOADING OVERLAY */}
        {isLoading && <LoadingOverlay />}
      </section>
    </div>
  );
};

export default KOTCancelForm;
