import { useMemo, useState } from "react";
import { ChevronDown, Printer, Trash2 } from "lucide-react";

import SplitBillReceipt from "./SplitBillReceipt";
import ReusableButton from "../../../shared/components/reuse/ReusableButton";
import PhoneInput from "../../../shared/components/reuse/PhoneInput";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import type {
  BillItem,
  ReceiptBill,
  SplitBillFormProps,
} from "../types/InvoiceTypes";

const formatDate = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");

  return `${dd}-${mm}-${date.getFullYear()}`;
};

const SplitBillForm = ({
  cards,
  onClose,
  onReceiptChange,
}: SplitBillFormProps) => {
  const [billCount, setBillCount] = useState(2);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptBills, setReceiptBills] = useState<ReceiptBill[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Initially, all items are assigned to Bill 1.
  const [items, setItems] = useState<BillItem[]>(() =>
    cards.flatMap((card) =>
      card.invoiceItems.map((item) => ({
        id: `${card.id}-${item.id}`,
        name: item.name,
        qty: item.quantity,
        amt: item.amount,
        billIndex: 0,
      })),
    ),
  );

  const billRef = useMemo(
    () => cards.map((card) => card.reference).join(", "),
    [cards],
  );

  const bills = Array.from({ length: billCount }, (_, index) => index);

  const originalSubtotal = items.reduce((sum, item) => sum + item.amt, 0);

  // Generate split invoices.
  const handleGenerateInvoice = async () => {
    if (isGenerating) return;

    setIsGenerating(true);

    try {
      // Temporary loading delay.
      // Replace with your backend request when available.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const generatedBills: ReceiptBill[] = bills.map((billIndex) => {
        const assignedItems = items
          .filter((item) => item.billIndex === billIndex)
          .map((item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            amount: item.amt,
          }));

        const subtotal = assignedItems.reduce(
          (sum, item) => sum + item.amount,
          0,
        );

        return {
          billNo: billIndex + 1,
          invoiceDate: formatDate(new Date()),
          customerName: "",
          tableNo: "",
          paymentMethod: "",
          items: assignedItems,
          subtotal,
          vat: 0,
          serviceCharge: 0,
          total: subtotal,
        };
      });

      setReceiptBills(generatedBills);
      setShowReceipt(true);
      onReceiptChange?.(true);
    } catch (error) {
      console.error("Failed to generate split bill:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    onReceiptChange?.(false);
  };

  // Assign an item to another bill.
  const assignItem = (id: string, billIndex: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, billIndex } : item)),
    );
  };

  // Add another bill.
  const addBill = () => {
    setBillCount((count) => count + 1);
  };

  // Remove a bill and move its items to Bill 1.
  const removeBill = (index: number) => {
    if (billCount <= 2) return;

    setBillCount((count) => count - 1);

    setItems((prev) =>
      prev.map((item) => {
        if (item.billIndex === index) {
          return { ...item, billIndex: 0 };
        }

        if (item.billIndex > index) {
          return { ...item, billIndex: item.billIndex - 1 };
        }

        return item;
      }),
    );
  };

  const handlePrintSample = () => {
    window.print();
  };

  // Show generated receipt.
  if (showReceipt) {
    return (
      <SplitBillReceipt bills={receiptBills} onClose={handleCloseReceipt} />
    );
  }

  return (
    <>
      {/* Custom form - maximum width 6xl */}
      <div className="relative flex max-h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-xl bg-white p-4 shadow-xl sm:p-6">
        {/* Form Body */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid min-h-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="flex flex-col justify-between border-gray-200 md:border-r md:pr-6">
              <div>
                <p className="text-right text-xs text-gray-400">
                  Date: {formatDate(new Date())}
                </p>

                <p className="mt-4 text-xs text-gray-400">
                  Bill Ref:{" "}
                  <span className="font-medium text-gray-900">{billRef}</span>
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Split Bills into:
                  </h3>

                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                    {billCount}
                  </span>
                </div>

                {/* Items Table */}
                <div className="mt-4 text-xs">
                  <div className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr] py-2 font-medium text-gray-800">
                    <span>Items</span>
                    <span>Qty</span>
                    <span>Amt</span>
                    <span className="text-right">Charge to</span>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr] items-center py-2 text-gray-700"
                    >
                      <span>{item.name}</span>
                      <span>{item.qty} Unit</span>
                      <span>Rs {item.amt}</span>

                      <div className="flex justify-end">
                        <div className="relative">
                          <select
                            value={item.billIndex}
                            disabled={isGenerating}
                            onChange={(event) =>
                              assignItem(item.id, Number(event.target.value))
                            }
                            className="appearance-none rounded-full border border-gray-300 bg-white py-1 pl-2 pr-6 text-[10px] text-gray-700 outline-none hover:bg-gray-50"
                          >
                            {bills.map((bill) => (
                              <option key={bill} value={bill}>
                                Bill {bill + 1}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={10}
                            className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Summary */}
                <div className="mt-5 border-t border-gray-200 pt-3 text-xs text-gray-700">
                  <div className="flex justify-between py-1 font-medium text-gray-900">
                    <span>Subtotal</span>
                    <span>Rs {originalSubtotal}</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span>Tax (13% VAT)</span>
                    <span>Rs -</span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span>10% Service Charge</span>
                    <span>Rs -</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between border-y border-gray-200 py-3">
                    <span className="text-sm font-semibold text-gray-900">
                      Total Amount
                    </span>

                    <span className="text-sm font-semibold text-orange-500">
                      Rs {originalSubtotal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <ReusableButton
                  type="button"
                  title="Cancel Split Bill"
                  variant="outline"
                  className="w-full"
                  disabled={isGenerating}
                  onClick={onClose}
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col justify-between">
              <div>
                {bills.map((billIndex) => {
                  const billItems = items.filter(
                    (item) => item.billIndex === billIndex,
                  );

                  const subtotal = billItems.reduce(
                    (sum, item) => sum + item.amt,
                    0,
                  );

                  return (
                    <div
                      key={billIndex}
                      className={`pb-5 ${
                        billIndex !== 0
                          ? "mt-5 border-t border-dashed border-gray-300 pt-5"
                          : ""
                      }`}
                    >
                      {/* Bill Header */}
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Bill #{billIndex + 1}
                        </h4>

                        <ReusableButton
                          type="button"
                          title=" "
                          icon={<Trash2 size={13} />}
                          variant="outline"
                          size="sm"
                          className="border-0 px-2 text-gray-700 hover:text-red-500"
                          disabled={billCount <= 2 || isGenerating}
                          onClick={() => removeBill(billIndex)}
                        />
                      </div>

                      {/* Guest and Mobile */}
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">
                            Guest Name
                          </label>

                          <input
                            type="text"
                            placeholder="Full Name"
                            disabled={isGenerating}
                            className="w-44 rounded-md border border-gray-300 px-3 py-2 text-xs outline-none placeholder:text-gray-400 focus:border-gray-500"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">
                            Mobile Number
                          </label>

                          <PhoneInput />
                        </div>
                      </div>

                      {/* Bill Items */}
                      <div className="mt-4 text-xs">
                        <div className="grid grid-cols-[0.6fr_1.4fr_1fr_0.8fr] pb-2 font-medium text-gray-800">
                          <span>S.no.</span>
                          <span>Items</span>
                          <span className="text-center">Qty</span>
                          <span className="text-right">Amt</span>
                        </div>

                        {billItems.length === 0 ? (
                          <p className="py-4 text-center text-gray-500">
                            No Item added
                          </p>
                        ) : (
                          <>
                            {billItems.map((item, index) => (
                              <div
                                key={item.id}
                                className="grid grid-cols-[0.6fr_1.4fr_1fr_0.8fr] py-2 text-gray-700"
                              >
                                <span>{index + 1}</span>
                                <span>{item.name}</span>
                                <span className="text-center">{item.qty}</span>
                                <span className="text-right">
                                  Rs {item.amt}
                                </span>
                              </div>
                            ))}

                            {/* Bill Summary */}
                            <div className="mt-2 border-t border-gray-200 pt-2 text-gray-700">
                              <div className="flex justify-between py-1 font-medium text-gray-900">
                                <span>Subtotal</span>
                                <span>Rs {subtotal}</span>
                              </div>

                              <div className="flex justify-between py-1">
                                <span>Tax (13% VAT)</span>
                                <span>Rs -</span>
                              </div>

                              <div className="flex justify-between py-1">
                                <span>10% Service Charge</span>
                                <span>Rs -</span>
                              </div>

                              <div className="mt-1 flex items-center justify-between border-t border-gray-200 pt-2">
                                <span className="text-sm font-semibold text-gray-900">
                                  Total Amount
                                </span>

                                <span className="text-sm font-semibold text-orange-500">
                                  Rs {subtotal}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Add Bill */}
                <ReusableButton
                  type="button"
                  title="+ Add Bills"
                  variant="outline"
                  size="sm"
                  disabled={isGenerating}
                  onClick={addBill}
                />
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-2">
                <ReusableButton
                  type="button"
                  title="Generate Invoice"
                  className="w-full"
                  disabled={isGenerating || items.length === 0}
                  onClick={handleGenerateInvoice}
                />

                <ReusableButton
                  type="button"
                  title="Print Sample"
                  icon={<Printer size={16} />}
                  variant="outline"
                  className="w-full"
                  disabled={isGenerating}
                  onClick={handlePrintSample}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Full Loading Overlay */}
        {isGenerating && <LoadingOverlay />}
      </div>
    </>
  );
};

export default SplitBillForm;
