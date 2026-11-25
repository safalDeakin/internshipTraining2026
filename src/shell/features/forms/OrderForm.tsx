import { useState } from "react";
import { Minus, Plus, Trash2, ChevronDown } from "lucide-react";

import LoadingOverlay from "../../shared/components/LoadingOverlay";
import ReusableButton from "../../shared/components/ReusableButton";
import FormFrame from "../../shared/components/FormFrame";

import OrderReceipt from "../receipts/OrderReceipt";

import type {
  Order,
  OrderFormProps,
  OrderSectionProps,
} from "../../types/OrderingTypes";

import { useOrdering } from "../../context/OrderingProvider";

// Order section component
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
      <h3 className="text-sm font-semibold">{title}</h3>

      <div className="flex flex-col gap-3 rounded-xl bg-gray-100 p-3">
        {items.map((item) => {
          const expanded = expandedItems.includes(item.id);

          return (
            <div key={item.id} className="p-3">
              <div className="flex items-center gap-3">
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

                <p className="min-w-0 flex-1 truncate text-sm font-bold">
                  {item.label.trim()}
                </p>

                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="shrink-0 rounded p-1 text-gray-600 hover:bg-gray-100"
                  aria-label={`${expanded ? "Hide" : "Show"} notes for ${item.label}`}
                  aria-expanded={expanded}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="shrink-0 text-gray-900 hover:text-red-500"
                  aria-label={`Remove ${item.label}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {expanded && (
                <div className="mt-3 border-t border-gray-200 pt-5">
                  <label
                    htmlFor={`notes-${title}-${item.id}`}
                    className="mb-1 block text-xs font-medium text-gray-800"
                  >
                    Notes
                  </label>

                  <textarea
                    id={`notes-${title}-${item.id}`}
                    value={notes[item.id] ?? ""}
                    onChange={(event) =>
                      setNotes((prev) => ({
                        ...prev,
                        [item.id]: event.target.value,
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

// Main order form
const OrderForm = ({
  orderedItems,
  kotItems,
  botItems,
  onChangeQty,
  onRemove,
  onClose,
  onOrderSuccess,
}: OrderFormProps) => {
  const { createOrder } = useOrdering();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [receiptData, setReceiptData] = useState<{
    orderNo: string;
    createdAt: string;
    customerName: string;
    phone: string;
    location: string;
    kotItems: typeof kotItems;
    botItems: typeof botItems;
  } | null>(null);

  const handleSubmit = async () => {
    if (orderedItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    const orderNo = `ORD-${Date.now()}`;
    const createdAt = new Date().toISOString();

    // Create the object matching the current Order interface
    const newOrder: Order = {
      id: orderNo,
      orderNo,
      customerName: customerName.trim() || "Walk-in Customer",
      phone,
      referenceNumber,
      location,
      waiter: "Current Staff",
      table: location || "N/A",
      items: orderedItems.map((item) => ({ ...item })),
      status: "Pending",
      createdAt,
    };

    try {
      await createOrder(newOrder);

      // Save a snapshot for the receipt before clearing the cart
      setReceiptData({
        orderNo,
        createdAt,
        customerName: newOrder.customerName,
        phone,
        location,
        kotItems: [...kotItems],
        botItems: [...botItems],
      });

      onOrderSuccess();
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && receiptData) {
    return (
      <OrderReceipt
        restaurantName="VIP Restaurant"
        address="Banepa-07, Kavre"
        restaurantPhone="01-661234"
        orderNo={receiptData.orderNo}
        date={new Date(receiptData.createdAt).toLocaleString()}
        customerName={receiptData.customerName}
        phone={receiptData.phone}
        location={receiptData.location || "Banepa"}
        kotItems={receiptData.kotItems}
        botItems={receiptData.botItems}
        onDownloadPDF={() => {
          // Connect PDF generation here.
        }}
      />
    );
  }

  return (
    <FormFrame
      title="Place Order"
      onClose={onClose}
      footer={
        <ReusableButton
          title="Submit"
          type="submit"
          form="order-form"
          disabled={orderedItems.length === 0}
          loading={isSubmitting}
          className="w-full"
        />
      }
    >
      <form
        id="order-form"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Particular</label>
          <input
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Full Name"
            className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-[1fr_1.6fr] gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <label className="text-sm font-medium">Reference Number</label>
            <input
              value={referenceNumber}
              onChange={(event) => setReferenceNumber(event.target.value)}
              placeholder="000-123-999"
              className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Mobile number"
              className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Location</label>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter location"
            className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-3">
          {orderedItems.length === 0 ? (
            <>
              <h3 className="text-sm font-medium">KOT/BOT</h3>
              <p className="rounded-lg py-6 text-center text-sm text-gray-500">
                No items added till now
              </p>
            </>
          ) : (
            <>
              <OrderSection
                title="KOT"
                items={kotItems}
                onChangeQty={onChangeQty}
                onRemove={onRemove}
              />

              <OrderSection
                title="BOT"
                items={botItems}
                onChangeQty={onChangeQty}
                onRemove={onRemove}
              />
            </>
          )}
        </div>
      </form>

      {isSubmitting && <LoadingOverlay />}
    </FormFrame>
  );
};

export default OrderForm;
