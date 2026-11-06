// author: shrajja
import { useEffect, useState } from "react";
import { ChevronDown, Download, FileText, RotateCcw } from "lucide-react";
import ReusableButton from "../../restaurant/pages/posuserSession/shared/components/reuse/ReusableButton";
import MsTable from "../../../lib/component/table/components/MsTable";
import RefundReceiptModal from "./RefundReceiptModal";
import type { RefundItem, RefundReceiptData } from "./types/RefundTypes";
import { initialItems } from "./constant/RefundData";

// Refund summary content (same UI, used in the tab and inside the modal)
const RefundSummaryContent = ({
  items,
  refundItems,
  refundTotal,
}: {
  items: RefundItem[];
  refundItems: RefundItem[];
  refundTotal: number;
}) => (
  <>
    <div className="gap-6 ">
      {/* LEFT SIDE */}
      <div className="">
        <div>
          <p className="text-sm text-gray-500">
            Refund Type:{" "}
            <span className="mt-1 text-sm font-medium text-gray-800">
              {refundItems.length === items.length
                ? "Full Refund"
                : "Partial Refund"}
            </span>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Refund Amount:
            <span className="mt-1 text-sm text-gray-900">
              Rs. {refundTotal.toLocaleString()}
            </span>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Reason:
            <span className="mt-1 text-sm font-medium text-gray-800">-</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Refund Method:
            <span className="mt-1 text-sm  text-gray-800">Cash</span>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Refunded By:{" "}
            <span className="mt-1 text-sm  text-gray-800">Ram Sharma</span>
          </p>
        </div>
      </div>
    </div>

    {/* REFUNDED ITEMS */}
    <div className="mt-6 border-t border-gray-100 pt-5">
      <h4 className="mb-3 text-sm font-semibold text-gray-700">
        Refunded Items
      </h4>

      {refundItems.length > 0 ? (
        <div className="space-y-3">
          {refundItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {item.quantity} × Rs. {item.price.toLocaleString()}
                </p>
              </div>

              <p className="text-sm font-medium text-gray-800">
                Rs. {item.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-4 text-sm text-gray-500">No refund items selected.</p>
      )}
    </div>
  </>
);

const RefundDetails = () => {
  const [items] = useState<RefundItem[]>(initialItems);
  const [itemSearch, setItemSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"invoice" | "summary">("invoice");
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  // Refund form state
  const [refundType, setRefundType] = useState<"lost" | "damage">("lost");
  const [reason, setReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundFrom, setRefundFrom] = useState("");
  const [notes, setNotes] = useState("");
  // Refund receipt state
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receipt, setReceipt] = useState<RefundReceiptData | null>(null);

  // Select / deselect refund item
  const handleToggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  // Selected refund items
  const refundItems = items.filter((item) => selectedItems.includes(item.id));

  // Refund total
  const refundTotal = refundItems.reduce(
    (total, item) => total + item.amount,
    0,
  );

  // Close modal on Esc
  useEffect(() => {
    if (!isRefundModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsRefundModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isRefundModalOpen]);

  // Export CSV
  const handleExportCsv = () => {
    if (refundItems.length === 0) {
      alert("Please select at least one item to export.");
      return;
    }

    const headers = ["Item", "Quantity", "Price", "Amount"];

    const rows = refundItems.map((item) => [
      item.name,
      item.quantity,
      item.price,
      item.amount,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "refund-items.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // Print PDF
  const handlePrintPdf = () => {
    window.print();
  };

  // Apply refund button (top) -> open modal
  const handleApplyRefund = () => {
    // if (refundItems.length === 0) {
    //   alert("Please select at least one item to refund.");
    //   return;
    // }

    setIsRefundModalOpen(true);
  };
  const handleReceipt = () => {
    const receiptData: RefundReceiptData = {
      refundNumber: `REF-${Date.now()}`,
      invoiceNumber: "INV-001",
      dateTime: new Date().toLocaleString(),
      processedBy: "Ram Sharma",
      items: refundItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        amount: item.amount,
      })),
      totalAmount: refundTotal,
      refundMethod: refundFrom || "Cash",
    };

    setReceipt(receiptData);
    setIsReceiptOpen(true);
  };
  // Confirm refund inside modal
  const handleConfirmRefund = () => {
    // if (!reason || !refundAmount || Number(refundAmount) <= 0) {
    //   alert("Please complete the required refund fields.");
    //   return;
    // }

    // if (refundItems.length === 0) {
    //   alert("Please select at least one refund item.");
    //   return;
    // }

    const receiptData: RefundReceiptData = {
      refundNumber: `REF-${Date.now()}`,
      invoiceNumber: "INV-001",
      dateTime: new Date().toLocaleString(),
      processedBy: "Ram Sharma",
      items: refundItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        amount: item.amount,
      })),
      totalAmount: Number(refundAmount),
      refundMethod: refundFrom || "Cash",
    };

    setReceipt(receiptData);
    setIsRefundModalOpen(false);
    setIsReceiptOpen(true);
  };

  // Table columns
  const columns = [
    {
      key: "name",
      label: "Item Name",
      idealWidth: 200,
      minWidth: 150,
      priority: 1,
    },
    {
      key: "quantity",
      label: "Quantity",
      idealWidth: 120,
      minWidth: 100,
      priority: 2,
    },
    {
      key: "price",
      label: "Price",
      idealWidth: 120,
      minWidth: 100,
      priority: 2,
      render: (item: RefundItem) => `Rs. ${item.price.toLocaleString()}`,
    },
    {
      key: "amount",
      label: "Amount",
      idealWidth: 120,
      minWidth: 100,
      priority: 1,
      render: (item: RefundItem) => `Rs. ${item.amount.toLocaleString()}`,
    },
  ];

  return (
    <div className="w-full min-w-0 bg-gray-50 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-900">
          Invoice Number:
          <span className="ml-2 font-medium text-gray-500">INV-001</span>
        </h2>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2">
          <ReusableButton
            type="button"
            title="Export CSV"
            icon={<Download size={14} />}
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
          />

          <ReusableButton
            type="button"
            title="Print as PDF"
            icon={<FileText size={14} />}
            variant="outline"
            size="sm"
            onClick={handlePrintPdf}
          />

          <ReusableButton
            type="button"
            title="Apply Refund"
            icon={<RotateCcw size={14} />}
            variant="secondary"
            size="sm"
            onClick={handleApplyRefund}
          />
        </div>
      </div>

      {/* TABS */}
      <div className="mt-5 flex gap-6 rounded-lg bg-white px-5 pt-4">
        <button
          type="button"
          onClick={() => setActiveTab("invoice")}
          className={`border-b-2 pb-3 text-sm font-medium transition-colors ${activeTab === "invoice"
            ? "border-[#005395] text-[#005395]"
            : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
        >
          Invoice
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("summary")}
          className={`border-b-2 pb-3 text-sm font-medium transition-colors ${activeTab === "summary"
            ? "border-[#005395] text-[#005395]"
            : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
        >
          Refund Summary
        </button>
      </div>

      {/* INVOICE TAB */}
      {activeTab === "invoice" ? (
        <>
          {/* INVOICE AND CUSTOMER INFORMATION */}
          <section className="mt-5 rounded-lg bg-white p-5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* INVOICE DETAILS */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">
                  Invoice Detail:
                </h4>

                <div>
                  <p className="text-xs text-gray-500">
                    Invoice Number:{" "}
                    <span className="mt-1 text-sm font-medium text-gray-800">
                      INV-001
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Invoice Date:{" "}
                    <span className="mt-1 text-sm font-medium text-gray-800">
                      02/11/2026
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Status: <span className="mt-1 ">Paid</span>
                  </p>
                </div>
              </div>
            </div>
            {/* CUSTOMER DETAILS */}
            <div className="space-y-4 mt-5">
              <div>
                <p className="text-sm text-gray-500">
                  Customer Name:{" "}
                  <span className="mt-1 text-sm font-medium ">
                    Ram Shrestha
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* REFUND ITEMS TABLE */}
          <section className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className=" font-semibold text-gray-900">Refund Items</h3>
            </div>

            <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <MsTable
                columns={columns}
                data={items}
                selectedItems={selectedItems}
                onToggleItem={handleToggleItem}
                showSearchBar={true}
                searchType="All"
                onSearchTypeChange={() => { }}
                onChange={setItemSearch}
              />
            </div>
          </section>
        </>
      ) : (
        /* REFUND SUMMARY TAB */
        <section className="mt-5 rounded-lg bg-white p-5">
          <div className="flex justify-between">
            <h3 className="mb-5 border-b border-gray-100 pb-3 text-sm font-semibold text-gray-800">
              Refund Summary
            </h3>
            <ReusableButton
              type="button"
              title="Approve & Print"
              variant="secondary"
              size="sm"
              onClick={handleReceipt}
            />
          </div>

          <RefundSummaryContent
            items={items}
            refundItems={refundItems}
            refundTotal={refundTotal}
          />
        </section>
      )}

      {/* APPLY REFUND MODAL (REFUND FORM) */}
      {isRefundModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setIsRefundModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-gray-900">Refund Form</h3>

            <div className="mt-5 space-y-4">
              {/* REFUND TYPE */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-sm text-gray-800">
                  Refund Type<span className="ml-0.5 text-red-500">*</span>
                </label>

                <div className="flex items-center gap-5">
                  {(["lost", "damage"] as const).map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-800"
                    >
                      <input
                        type="radio"
                        name="refundType"
                        checked={refundType === type}
                        onChange={() => setRefundType(type)}
                        className="h-3.5 w-3.5 accent-[#005395]"
                      />
                      {type === "lost" ? "Lost" : "Damage"}
                    </label>
                  ))}
                </div>
              </div>

              {/* REASON */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-sm text-gray-800">
                  Reason<span className="ml-0.5 text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="h-9 w-full appearance-none rounded-xl border border-gray-300 bg-white px-3 pr-9 text-xs text-gray-800 focus:border-[#005395] focus:outline-none"
                  >
                    <option value="">Select Reason</option>
                    <option value="customer_request">
                      Customer requested refund
                    </option>
                    <option value="wrong_item">Wrong item served</option>
                    <option value="quality_issue">Quality issue</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                  />
                </div>
              </div>

              {/* REFUND AMOUNT */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-sm text-gray-800">
                  Refund Amount<span className="ml-0.5 text-red-500">*</span>
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-800">
                    NPR
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    className="h-9 w-full rounded-xl border-2 border-[#005395] bg-white pl-11 pr-3 text-xs text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* REFUND FROM */}
              <div className="grid grid-cols-[110px_1fr] items-center gap-3">
                <label className="text-sm text-gray-800">Refund From</label>

                <div className="relative">
                  <select
                    value={refundFrom}
                    onChange={(e) => setRefundFrom(e.target.value)}
                    className="h-9 w-full appearance-none rounded-xl border border-gray-300 bg-white px-3 pr-9 text-xs text-gray-800 focus:border-[#005395] focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="cash_drawer">Cash Drawer</option>
                    <option value="bank">Bank Account</option>
                    <option value="wallet">Wallet</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                  />
                </div>
              </div>

              {/* NOTES */}
              <div>
                <label className="text-sm text-gray-800">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-xs text-gray-800 focus:border-[#005395] focus:outline-none"
                />
              </div>

              {/* REFUND METHOD */}
              <p className="pt-1 text-sm text-gray-800">
                Refund Method : <span className="font-medium">Cash</span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <ReusableButton
                type="button"
                title="Cancel"
                variant="outline"
                size="sm"
                onClick={() => setIsRefundModalOpen(false)}
              />

              <ReusableButton
                type="button"
                title="Proceed"
                variant="primary"
                size="sm"
                onClick={handleConfirmRefund}
              />
            </div>
          </div>
        </div>
      )}
      {/* REFUND RECEIPT MODAL */}
      <RefundReceiptModal
        open={isReceiptOpen}
        data={receipt}
        onClose={() => {
          setIsReceiptOpen(false);
          setActiveTab("summary");
        }}
      />
    </div>
  );
};

export default RefundDetails;
