import { useState } from "react";
import TableView from "../../shared/history/TableView";
import HistoryHeader from "../../shared/history/HistoryHeader";
import OrderCardGrid from "./components/OrderCardGrid";
import type {
  OrderCardData,
  OrderHistoryProps,
  ReusableDropdownProps,
} from "./types/OrderingTypes";
import { historyItems } from "./constant/OrderData";

// Reusable dropdown
export const ReusableDropdown = ({
  placeholder,
  options,
  value,
  onChange,
}: ReusableDropdownProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [orderId, setOrderId] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    invoiceNumber: "",
    customerName: "",
    receiptNumber: "",
    orderId: "",
  });

  // Filter history when Go is clicked
  const filteredItems = historyItems.filter((item) => {
    return (
      (!appliedFilters.invoiceNumber ||
        item.reference === appliedFilters.invoiceNumber) &&
      (!appliedFilters.customerName ||
        item.name === appliedFilters.customerName) &&
      (!appliedFilters.receiptNumber ||
        item.number === appliedFilters.receiptNumber) &&
      (!appliedFilters.orderId || item.table === appliedFilters.orderId)
    );
  });

  // Map history items to the shape OrderCardGrid expects
  const orderCards: OrderCardData[] = filteredItems.map((item, index) => ({
    id: index + 1,
    type: item.type,
    reference: item.reference,
    phone: item.number,
    waiter: `Waiter No ${item.waiter}`,
    customerName: item.name,
    table: `Table No:${item.table}`,
    time: item.time,
    invoiceItems: item.invoiceItems,
  }));

  const summary = [
    { label: "Total Invoices", value: "8" },
    { label: "Total Amount", value: "Rs 120000" },
    { label: "Received Amount", value: "Rs 25000" },
    { label: "Due Amount", value: "Rs 25000" },
    { label: "Total Paid", value: "Rs 25000" },
  ];

  const columns = [
    { key: "receiptNo", label: "Receipt No" },
    { key: "invoiceNumber", label: "Invoice Number" },
    { key: "customer", label: "Customer" },
    { key: "contact", label: "Contact" },
    { key: "date", label: "Date" },
    { key: "references", label: "Reference Number" },
    { key: "type", label: "Type" },
    { key: "subTotal", label: "Sub total" },
    { key: "totalAmount", label: "Total Amount" },
  ];

  const rows = Array.from({ length: 5 }, () => ({
    receiptNo: "#R_555",
    invoiceNumber: "INV_555",
    customer: "Ram",
    contact: "9876543210",
    date: "2024-12-23",
    references: (
      <>
        <div>KOT#125</div>
        <div>BOT#125</div>
      </>
    ),
    type: "Cheque",
    subTotal: "Rs 800",
    totalAmount: "Rs 832.35",
  }));

  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      {/* Top bar: Back arrow and view toggle */}
      <HistoryHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onBack={onBack}
      />

      {/* Filters */}
      <div className="flex w-full min-w-0 flex-wrap items-end justify-end gap-2 px-5">
        <ReusableDropdown
          placeholder="Invoice number"
          options={historyItems.map((item) => item.reference)}
          value={invoiceNumber}
          onChange={setInvoiceNumber}
        />

        <ReusableDropdown
          placeholder="Customer name"
          options={[...new Set(historyItems.map((item) => item.name))]}
          value={customerName}
          onChange={setCustomerName}
        />

        <ReusableDropdown
          placeholder="Order ID"
          options={[...new Set(historyItems.map((item) => item.table))]}
          value={orderId}
          onChange={setOrderId}
        />

        <ReusableDropdown
          placeholder="Receipt number"
          options={[...new Set(historyItems.map((item) => item.number))]}
          value={receiptNumber}
          onChange={setReceiptNumber}
        />

        <button
          type="button"
          onClick={() =>
            setAppliedFilters({
              invoiceNumber,
              customerName,
              receiptNumber,
              orderId,
            })
          }
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Go
        </button>
      </div>

      {/* History content changes according to selected view */}
      <main className="w-full min-w-0 px-5 pb-5">
        {filteredItems.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-500">
            No history found.
          </p>
        ) : viewMode === "grid" ? (
          // Clicking Cancel on a card opens KOTCancelForm inside OrderCardGrid
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
