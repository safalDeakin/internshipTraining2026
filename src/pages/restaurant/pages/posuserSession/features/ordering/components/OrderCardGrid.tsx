import { useState, type ReactNode } from "react";
import { Clock, X } from "lucide-react";
import ReusableButton from "../../../shared/components/reuse/ReusableButton";
import KOTCancelForm from "../../../shared/components/cancelprocess/KOTCancelForm";
import type {
  OrderCardData,
  OrderCardGridProps,
  OrderCardProps,
  OrderType,
} from "../types/OrderingTypes";

//helpers
const getOrderNumberLabel = (type: OrderType) => {
  switch (type) {
    case "KOT":
      return "KOT";
    case "BOT":
      return "BOT";
    case "Reservation":
      return "Reservation";
    default:
      return "Order";
  }
};

const getOrderBadge = (type: OrderType) => {
  return type === "Reservation" ? "Res" : type;
};

export const OrderCard = ({
  order,
  onCancel,
  cancelLabel = "Cancel",
}: OrderCardProps) => (
  <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:border-gray-300 hover:shadow-md">
    {/* Reference + Contact */}
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500 text-[9px] font-semibold text-white">
        {getOrderBadge(order.type)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-gray-900">
          {getOrderNumberLabel(order.type)}: {order.reference}
        </p>

        <p className="truncate text-[10px] text-gray-500">{order.phone}</p>

        <p className="text-[10px] text-gray-400">Waiter: {order.waiter}</p>
      </div>
    </div>

    {/* Customer + Table */}
    <div className="mt-3 text-[11px] text-gray-700">
      <p className="truncate font-medium">{order.customerName}</p>

      <p className="mt-1 font-semibold">Table No: {order.table}</p>
    </div>

    {/* Footer */}
    <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
      <span>{order.invoiceItems.length} items</span>

      <span className="flex items-center gap-1">
        <Clock size={11} />
        {order.time}
      </span>
    </div>

    {/* Cancel Button */}
    <ReusableButton
      type="button"
      title={cancelLabel}
      variant="outline"
      size="sm"
      className="mt-3 w-full"
      onClick={() => onCancel(order)}
    />
  </div>
);

const OrderCardGrid = ({
  orders,
  renderCancelProcess,
  className = "grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6",
}: OrderCardGridProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderCardData | null>(
    null,
  );

  const close = () => setSelectedOrder(null);

  return (
    <>
      {/* Order Cards */}
      <div className={className}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onCancel={setSelectedOrder} />
        ))}
      </div>

      {/* Right Side Cancellation Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={close}
          />

          {/* Sliding Panel */}
          <div className="absolute inset-y-0 right-0 flex w-full max-w-3xl flex-col bg-white shadow-2xl animate-slide-in-right">
            {/* Panel Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-gray-800">
                  Cancel {selectedOrder.type}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {getOrderNumberLabel(selectedOrder.type)}:{" "}
                  {selectedOrder.reference}
                  {" · "}
                  {selectedOrder.customerName}
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close cancellation panel"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cancellation Form */}
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {renderCancelProcess ? (
                renderCancelProcess(selectedOrder, close)
              ) : (
                <KOTCancelForm
                  cards={[
                    {
                      id: selectedOrder.id,
                      reference: selectedOrder.reference,
                      invoiceItems: selectedOrder.invoiceItems,
                    },
                  ]}
                  onClose={close}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCardGrid;
