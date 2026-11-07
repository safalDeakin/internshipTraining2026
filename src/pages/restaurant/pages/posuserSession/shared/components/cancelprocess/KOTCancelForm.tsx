import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import ReusableButton from "../reuse/ReusableButton";
import ReceiptFrame from "../forms/ReceiptFrame";
import LoadingOverlay from "../LoadingOverlay";
import type {
  KOTCancelFormProps,
  KOTItem,
} from "../../../types/posSessionTypes";

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

  // Original KOT items
  const originalItems = useMemo<KOTItem[]>(
    () =>
      cards.flatMap((card) =>
        card.invoiceItems.map((item) => ({
          id: `${card.id}-${item.id}`,
          name: item.name,
          qty: item.quantity,
          amount: item.amount,
          reference: card.reference,
        })),
      ),
    [cards],
  );

  const cancelledIds = new Set(cancelledItems.map((item) => item.id));

  const totalAmount = cancelledItems.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  // Add item to cancellation list
  const addCancellation = (item: KOTItem) => {
    if (isConfirmed || cancelledIds.has(item.id)) return;

    setCancelledItems((prev) => [...prev, item]);
  };

  // Remove item from cancellation list
  const removeCancellation = (id: string) => {
    if (isConfirmed) return;

    setCancelledItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Confirm cancellation
  const handleConfirm = () => {
    if (cancelledItems.length === 0 || !cancelBy.trim() || isLoading) return;

    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);
    }, 1500);
  };

  return (
    <div className="relative grid h-full min-h-[560px] grid-cols-1 overflow-hidden rounded-lg bg-white md:grid-cols-2">
      {/* LEFT PANEL: ORIGINAL KOT */}
      <section className="flex min-h-0 flex-col justify-between border-b border-gray-300 p-4 md:border-b-0 md:border-r md:p-5">
        <div className="min-h-0">
          <p className="text-right text-xs text-gray-400">
            Date: {formatDate()}
          </p>

          <div className="mt-7">
            <h3 className="text-base font-semibold text-gray-900">KOT</h3>

            <div className="mt-4 grid grid-cols-[1.5fr_0.9fr_1fr_0.5fr] pb-2 text-xs font-semibold text-gray-800">
              <span>Items</span>
              <span>Qty</span>
              <span>Amt</span>
              <span className="text-right">Action</span>
            </div>

            <div className="max-h-[48vh] overflow-y-auto">
              {originalItems.map((item) => {
                const selected = cancelledIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={`grid grid-cols-[1.5fr_0.9fr_1fr_0.5fr] items-center py-3 text-xs ${
                      selected ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{item.name}</p>
                    </div>

                    <span>{item.qty} Unit</span>

                    <span>Rs {item.amount.toLocaleString()}</span>

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
                  No KOT items available.
                </p>
              )}
            </div>
          </div>
        </div>

        <ReusableButton
          type="button"
          title="Cancel KOT Cancellation"
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
                KOT Cancel Form
              </h2>

              {/* Selected Items */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Cancel Item
                </h3>

                <div className="mt-4 grid grid-cols-[0.7fr_0.8fr_1.3fr_0.3fr] pb-2 text-xs font-semibold text-gray-800">
                  <span>S.No.</span>
                  <span>Qty</span>
                  <span>Item</span>
                </div>

                {cancelledItems.length === 0 ? (
                  <p className="py-5 text-center text-xs text-gray-500">
                    No Item added
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
          <>
            <ReceiptFrame
              hotelName="VIP Restaurant"
              address="Banepa-07, Kavre"
              phone="+977 9800000000"
              onPrint={() => window.print()}
            >
              {/* Customer and Order Information */}
              <div className="mt-6 text-sm">
                {/* Right: Order Details */}
                <div className="space-y-3 text-right">
                  <div>
                    <p className="text-gray-500">
                      Order Number:{" "}
                      <span className="mt-1 font-medium text-gray-800">
                        {"0"}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Date:{" "}
                      <span className="mt-1 font-medium text-gray-800">
                        {formatDate()}
                      </span>
                    </p>
                  </div>
                </div>
                {/* Left: Customer Details */}
                <div className="space-y-3 mt-4">
                  <div>
                    <p className="text-gray-500">
                      Customer Name:{" "}
                      <span className="mt-1 font-medium text-gray-800">
                        Ram
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Phone Number:{" "}
                      <span className="mt-1 font-medium text-gray-800">
                        98000000000
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500">
                      Location:{" "}
                      <span className="mt-1 font-medium text-gray-800">
                        location
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Cancelled Items */}
              <h3 className="mt-5 text-xs font-semibold text-gray-800">
                KOt-124
              </h3>

              <div className="mt-3 space-y-2">
                <div className="grid grid-cols-2 pb-2 text-[11px] font-semibold text-gray-700">
                  <span>Qty</span>
                  <span className="">Items</span>
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
              <h3 className="mt-3 text-center font-bold">Thankyou!</h3>
            </ReceiptFrame>
          </>
        )}
        {/* LOADING OVERLAY */}
        {isLoading && <LoadingOverlay />}
      </section>
    </div>
  );
};

export default KOTCancelForm;
