import { useMemo, useState } from "react";
import { ChevronDown, Printer, Trash2 } from "lucide-react";
import SplitBillReceipt from "./SplitBillReceipt";
import FormFrame from "../../shared/components/forms/FormFrame";

interface ReceiptBill {
  billNo: number;
  invoiceDate: string;
  customerName: string;
  tableNo: string;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    qty: number;
    amount: number;
  }[];
  subtotal: number;
  vat: number;
  serviceCharge: number;
  total: number;
}

// Minimal shape needed from the selected invoice cards.
// (Compatible with InvoiceCards from InvoicingLayout.)
interface SplitBillCard {
  id: number;
  reference: string;
  invoiceItems: {
    id: number;
    name: string;
    quantity: number;
    amount: number;
  }[];
}

interface SplitBillFormProps {
  cards: SplitBillCard[];
  onClose?: () => void;
  // Tells the parent when the receipt is shown, so it can narrow the panel.
  onReceiptChange?: (open: boolean) => void;
}

interface BillItem {
  id: string; // `${cardId}-${itemId}` so items from different cards never clash
  name: string;
  qty: number;
  amt: number;
  billIndex: number; // which bill this item is charged to (0-based)
}

const formatDate = (d: Date) => {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
};

const SplitBillForm = ({
  cards,
  onClose,
  onReceiptChange,
}: SplitBillFormProps) => {
  const [billCount, setBillCount] = useState(2);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptBills, setReceiptBills] = useState<ReceiptBill[]>([]);

  // Items come from the selected cards; everything starts in Bill 1.
  const [items, setItems] = useState<BillItem[]>(() =>
    cards.flatMap((card) =>
      card.invoiceItems.map((it) => ({
        id: `${card.id}-${it.id}`,
        name: it.name,
        qty: it.quantity,
        amt: it.amount,
        billIndex: 0,
      })),
    ),
  );

  const billRef = useMemo(
    () => cards.map((c) => c.reference).join(", "),
    [cards],
  );

  const bills = Array.from({ length: billCount }, (_, i) => i);
  const originalSubtotal = items.reduce((sum, it) => sum + it.amt, 0);

  const handleGenerateInvoice = () => {
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
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    onReceiptChange?.(false);
  };

  const assignItem = (id: string, billIndex: number) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, billIndex } : it)),
    );

  const addBill = () => setBillCount((c) => c + 1);

  const removeBill = (index: number) => {
    if (billCount <= 2) return; // keep at least 2 bills for a split
    setBillCount((c) => c - 1);
    setItems((prev) =>
      prev.map((it) => {
        if (it.billIndex === index) return { ...it, billIndex: 0 }; // fall back to Bill 1
        if (it.billIndex > index) return { ...it, billIndex: it.billIndex - 1 };
        return it;
      }),
    );
  };

  if (showReceipt) {
    return (
      <SplitBillReceipt bills={receiptBills} onClose={handleCloseReceipt} />
    );
  }

  return (
    <FormFrame title="">
      <div className="grid h-full min-h-[480px] grid-cols-1 md:grid-cols-2">
        {/* ================= LEFT ================= */}
        <div className="flex flex-col justify-between border-gray-300 md:border-r md:pr-5">
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

            {/* Items table */}
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
                        onChange={(e) =>
                          assignItem(item.id, Number(e.target.value))
                        }
                        className="appearance-none rounded-full border border-gray-300 bg-white py-0.5 pl-2 pr-5 text-[10px] text-gray-700 outline-none hover:bg-gray-50"
                      >
                        {bills.map((b) => (
                          <option key={b} value={b}>
                            Bill {b + 1}
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

            {/* Totals (VAT / service are placeholders until calculation is added) */}
            <div className="mt-4 border-t border-gray-200 pt-3 text-xs text-gray-700">
              <div className="flex justify-between py-1 font-medium text-gray-900">
                <span>Subtotal</span>
                <span>Rs {originalSubtotal}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-2 text-xs text-gray-700">
              <div className="flex justify-between py-1">
                <span>Tax (13% Vat)</span>
                <span>Rs 0</span>
              </div>
              <div className="flex justify-between py-1">
                <span>10% Service Charge</span>
                <span>Rs 0</span>
              </div>
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

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-md border border-gray-200 bg-white py-2.5 text-xs text-gray-800 hover:bg-gray-50"
          >
            Cancel Split bill
          </button>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="mt-6 flex flex-col justify-between md:mt-0 md:pl-5">
          <div>
            {bills.map((billIndex) => {
              const billItems = items.filter(
                (it) => it.billIndex === billIndex,
              );
              const subtotal = billItems.reduce((sum, it) => sum + it.amt, 0);

              return (
                <div
                  key={billIndex}
                  className={`pb-5 ${
                    billIndex !== 0
                      ? "mt-5 border-t border-dashed border-gray-300 pt-5"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-900">
                      Bill #{billIndex + 1}
                    </h4>
                    <button
                      type="button"
                      aria-label={`Delete bill ${billIndex + 1}`}
                      onClick={() => removeBill(billIndex)}
                      className="text-gray-700 hover:text-red-500"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Guest + mobile */}
                  <div className="mt-3 flex gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500">
                        Guest Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-40 rounded-md border border-gray-300 px-2.5 py-1.5 text-xs outline-none placeholder:text-gray-400 focus:border-gray-500"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] text-gray-500">
                        Mobile Number
                      </label>
                      <div className="flex overflow-hidden rounded-md border border-gray-300 focus-within:border-gray-500">
                        <button
                          type="button"
                          className="flex items-center gap-1 border-r border-gray-300 px-2 text-xs text-gray-700"
                        >
                          <span className="inline-block h-3 w-2.5 rounded-sm bg-red-700" />
                          +977
                          <ChevronDown size={10} />
                        </button>
                        <input
                          type="tel"
                          placeholder="9800000000"
                          className="w-28 px-2 py-1.5 text-xs outline-none placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Items assigned to this bill */}
                  <div className="mt-4 text-xs">
                    <div className="grid grid-cols-[0.6fr_1.4fr_1fr_0.8fr] border-b border-gray-200 pb-2 font-medium text-gray-800">
                      <span>S.no.</span>
                      <span>Items</span>
                      <span className="text-center">Qty</span>
                      <span className="text-right">Amt</span>
                    </div>

                    {billItems.length === 0 ? (
                      <p className="py-4 text-center text-gray-600">
                        No Item added
                      </p>
                    ) : (
                      <>
                        {billItems.map((it, i) => (
                          <div
                            key={it.id}
                            className="grid grid-cols-[0.6fr_1.4fr_1fr_0.8fr] py-2 text-gray-700"
                          >
                            <span>{i + 1}</span>
                            <span>{it.name}</span>
                            <span className="text-center">{it.qty}</span>
                            <span className="text-right">Rs {it.amt}</span>
                          </div>
                        ))}

                        <div className="mt-2 border-t border-gray-200 pt-2 text-gray-700">
                          <div className="flex justify-between py-1 font-medium text-gray-900">
                            <span>Subtotal</span>
                            <span>Rs {subtotal}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span>Tax (13% Vat)</span>
                            <span>Rs 0</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span>10% Service Charge</span>
                            <span>Rs 0</span>
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

            <button
              type="button"
              onClick={addBill}
              className="rounded-md border border-gray-800 bg-white px-3 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-50"
            >
              + Add bills
            </button>
          </div>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              onClick={handleGenerateInvoice}
              className="w-full rounded-md bg-orange-500 py-3 text-xs font-semibold text-white shadow-sm"
            >
              Generate Invoice
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white py-2.5 text-xs text-gray-800 hover:bg-gray-50"
            >
              <Printer size={16} className="text-gray-500" />
              Print Sample
            </button>
          </div>
        </div>
      </div>
    </FormFrame>
  );
};

export default SplitBillForm;
