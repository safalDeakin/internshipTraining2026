import type {
  OrderHistoryProps,
  ReusableDropdownProps,
} from "../../types/OrderingTypes";

import HistoryHeader from "../../shared/history/HistoryHeader";
import OrderCardGrid from "../cards/OrderCardGrid";
import TableView from "../../shared/history/TableView";

import useOrderHistory from "../../hooks/useOrderHistory";

export const ReusableDropdown = ({
  placeholder,
  options,
  value,
  onChange,
}: ReusableDropdownProps) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const OrderHistory = ({ onBack }: OrderHistoryProps) => {
  const {
    loading,
    viewMode,
    setViewMode,
    invoiceNumber,
    setInvoiceNumber,
    customerName,
    setCustomerName,
    receiptNumber,
    setReceiptNumber,
    orderId,
    setOrderId,
    invoiceOptions,
    customerOptions,
    orderIdOptions,
    receiptOptions,
    filteredItems,
    orderCards,
    applyFilters,
  } = useOrderHistory();

  const summary = [
    { label: "Total Orders", value: String(filteredItems.length) },
    { label: "Total Amount", value: "Not available" },
    { label: "Received Amount", value: "Not available" },
    { label: "Due Amount", value: "Not available" },
    { label: "Total Paid", value: "Not available" },
  ];

  const columns = [
    { key: "reference", label: "Order Number" },
    { key: "customerName", label: "Customer" },
    { key: "phone", label: "Contact" },
    { key: "waiter", label: "Waiter" },
    { key: "table", label: "Table" },
    { key: "time", label: "Date" },
    { key: "itemCount", label: "Items" },
    { key: "status", label: "Status" },
  ];

  const rows = filteredItems.map((order) => ({
    reference: order.reference,
    customerName: order.customerName,
    phone: order.phone,
    waiter: order.waiter,
    table: order.table,
    time: order.time,
    itemCount: order.invoiceItems.reduce(
      (total, item) => total + item.quantity,
      0,
    ),
    status: "Order",
  }));

  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      <HistoryHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onBack={onBack}
      />

      <div className="flex w-full min-w-0 flex-wrap items-end justify-end gap-2 px-5">
        <ReusableDropdown
          placeholder="Reference number"
          options={invoiceOptions}
          value={invoiceNumber}
          onChange={setInvoiceNumber}
        />

        <ReusableDropdown
          placeholder="Customer name"
          options={customerOptions}
          value={customerName}
          onChange={setCustomerName}
        />

        <ReusableDropdown
          placeholder="Order ID"
          options={orderIdOptions}
          value={orderId}
          onChange={setOrderId}
        />

        <ReusableDropdown
          placeholder="Receipt number"
          options={receiptOptions}
          value={receiptNumber}
          onChange={setReceiptNumber}
        />

        <button
          type="button"
          onClick={applyFilters}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Go
        </button>
      </div>

      <main className="w-full min-w-0 px-5 pb-5">
        {loading ? (
          <p className="py-10 text-center text-sm text-gray-500">
            Loading order history...
          </p>
        ) : filteredItems.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-500">
            No history found.
          </p>
        ) : viewMode === "grid" ? (
          <OrderCardGrid
            orders={orderCards}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        ) : (
          <TableView summary={summary} columns={columns} rows={rows} />
        )}
      </main>
    </div>
  );
};

export default OrderHistory;
