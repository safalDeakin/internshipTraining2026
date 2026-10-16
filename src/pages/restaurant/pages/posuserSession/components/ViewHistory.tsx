//have to managed
import { ArrowLeft, Blocks, Table } from "lucide-react";
import { useState } from "react";
import InvoicingCards from "../components/invoicing/InvoicingCards";
import type { InvoiceType } from "../steps/InvoicingLayout";
import TableView from "./TableView";
import HistoryModal from "./HistoryModal";

interface ReusableDropdownProps {
  label?: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

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

interface HistoryTopbarProps {
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
}

export const HistoryTopbar = ({
  viewMode,
  setViewMode,
}: HistoryTopbarProps) => {
  return (
    <div className="flex items-center justify-between text-gray-700">
      {/* Back button */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="rounded-md p-2 hover:bg-gray-100"
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </button>

      {/* View toggle buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setViewMode("grid")}
          className={`rounded-md p-2 ${
            viewMode === "grid"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
        >
          <Blocks size={20} />
        </button>

        <button
          type="button"
          onClick={() => setViewMode("table")}
          className={`rounded-md p-2 ${
            viewMode === "table"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          aria-label="Table view"
          aria-pressed={viewMode === "table"}
        >
          <Table size={20} />
        </button>
      </div>
    </div>
  );
};

const historyItems: {
  type: InvoiceType;
  reference: string;
  name: string;
  number: string;
  waiter: string;
  table: string;
  time: string;
  itemCount: number;
}[] = [
  {
    type: "KOT",
    reference: "INV-001",
    name: "Ram Sharma",
    number: "9800000001",
    waiter: "01",
    table: "1",
    time: "10:30 AM",
    itemCount: 3,
  },
  {
    type: "BOT",
    reference: "INV-002",
    name: "Shyam Thapa",
    number: "9800000002",
    waiter: "02",
    table: "2",
    time: "11:15 AM",
    itemCount: 2,
  },
  {
    type: "Reservation",
    reference: "INV-003",
    name: "Hari Karki",
    number: "9800000003",
    waiter: "01",
    table: "3",
    time: "12:00 PM",
    itemCount: 5,
  },
  {
    type: "KOT",
    reference: "INV-004",
    name: "Sita Rai",
    number: "9800000004",
    waiter: "03",
    table: "4",
    time: "01:30 PM",
    itemCount: 4,
  },
];

const ViewHistory = () => {
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
  const [selectedHistory, setSelectedHistory] = useState<
    (typeof historyItems)[number] | null
  >(null);

  const filteredItems = historyItems.filter((item) => {
    const filters = appliedFilters;

    return (
      (!filters.invoiceNumber || item.reference === filters.invoiceNumber) &&
      (!filters.customerName || item.name === filters.customerName) &&
      (!filters.receiptNumber || item.number === filters.receiptNumber) &&
      (!filters.orderId || item.table === filters.orderId)
    );
  });

  return (
    <div className="flex flex-col gap-5 px-5">
      {/* Header */}
      <HistoryTopbar viewMode={viewMode} setViewMode={setViewMode} />

      {/* Filters */}
      <div className="flex w-full justify-end items-end gap-1">
        <ReusableDropdown
          placeholder="Invoice number"
          options={["INV-001", "INV-002", "INV-003", "INV-004"]}
          value={invoiceNumber}
          onChange={setInvoiceNumber}
        />

        <ReusableDropdown
          placeholder="Customer name"
          options={["Ram Sharma", "Shyam Thapa", "Hari Karki", "Sita Rai"]}
          value={customerName}
          onChange={setCustomerName}
        />

        <ReusableDropdown
          placeholder="Order ID"
          options={["1", "2", "3", "4"]}
          value={orderId}
          onChange={setOrderId}
        />

        <ReusableDropdown
          placeholder="Receipt number"
          options={["9800000001", "9800000002", "9800000003", "9800000004"]}
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

      {/* History Cards */}
      <main>
        {filteredItems.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-500">
            No history found.
          </p>
        ) : viewMode === "grid" ? (
          // Grid / Cards view
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <InvoicingCards
                key={item.reference}
                {...item}
                onClick={() => setSelectedHistory(item)}
              />
            ))}
          </div>
        ) : (
          // Table view
          <TableView />
        )}
      </main>
      {selectedHistory && (
        <HistoryModal
          item={selectedHistory}
          onClose={() => setSelectedHistory(null)}
        />
      )}
    </div>
  );
};

export default ViewHistory;
