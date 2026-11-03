// author: shrajja
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ReusableButton from "../../restaurant/pages/posuserSession/shared/components/reuse/ReusableButton";

export interface PettyCashEntry {
  id: number;
  type: "in" | "out";
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  refNo: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
}

interface PettyCashEntryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (entry: Omit<PettyCashEntry, "id">, editingId?: number) => void;
  openingBalance: number;
  currentBalance: number;
  editingEntry?: PettyCashEntry | null;
}

const inputClass =
  "h-9 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 focus:border-[#005395] focus:outline-none";

const today = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

const emptyForm = () => ({
  type: "in" as "in" | "out",
  date: today(),
  time: nowTime(),
  refNo: "",
  category: "",
  description: "",
  amount: "",
  paymentMethod: "Cash",
});

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-gray-700">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const PettyCashEntryModal = ({
  open,
  onClose,
  onSave,
  openingBalance,
  currentBalance,
  editingEntry,
}: PettyCashEntryModalProps) => {
  const [form, setForm] = useState(emptyForm());

  // Reset / prefill when opened
  useEffect(() => {
    if (!open) return;

    if (editingEntry) {
      setForm({
        type: editingEntry.type,
        date: editingEntry.date,
        time: editingEntry.time,
        refNo: editingEntry.refNo,
        category: editingEntry.category,
        description: editingEntry.description,
        amount: String(editingEntry.amount),
        paymentMethod: editingEntry.paymentMethod,
      });
    } else {
      setForm(emptyForm());
    }
  }, [open, editingEntry]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const setField = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.date || !form.time) {
      alert("Please select date and time.");
      return;
    }
    if (!form.category.trim()) {
      alert("Please enter a category.");
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    onSave(
      {
        type: form.type,
        date: form.date,
        time: form.time,
        refNo: form.refNo.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod.trim(),
      },
      editingEntry?.id,
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TITLE */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h3 className="text-center font-bold text-gray-900">
            Petty Cash Entry
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {/* ENTRY TYPE */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-700">Entry Type</p>
            <div className="flex items-center gap-6">
              {(["in", "out"] as const).map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2 text-sm text-gray-800"
                >
                  <input
                    type="radio"
                    name="entryType"
                    checked={form.type === type}
                    onChange={() => setField("type", type)}
                    className="h-3.5 w-3.5 accent-[#005395]"
                  />
                  {type === "in" ? "Paid In" : "Paid Out"}
                </label>
              ))}
            </div>
          </div>

          {/* DATE & TIME */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Date" required>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setField("date", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Time" required>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setField("time", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          {/* REFERENCE + CATEGORY */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Reference No">
              <input
                type="text"
                value={form.refNo}
                onChange={(e) => setField("refNo", e.target.value)}
                placeholder="Enter reference no"
                className={inputClass}
              />
            </Field>

            <Field label="Category" required>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                placeholder="Enter category"
                className={inputClass}
              />
            </Field>
          </div>

          {/* DESCRIPTION */}
          <Field label="Description">
            <input
              type="text"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Enter description"
              className={inputClass}
            />
          </Field>

          {/* AMOUNT + PAYMENT METHOD */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Amount" required>
              <input
                type="number"
                min={0}
                value={form.amount}
                onChange={(e) => setField("amount", e.target.value)}
                placeholder="Rs. 0"
                className={inputClass}
              />
            </Field>

            <Field label="Payment Method">
              <input
                type="text"
                value={form.paymentMethod}
                onChange={(e) => setField("paymentMethod", e.target.value)}
                placeholder="Enter payment method"
                className={inputClass}
              />
            </Field>
          </div>

          {/* CURRENT CASH SUMMARY */}
          <div className="rounded-lg bg-gray-100 p-4">
            <p className="mb-3 text-xs font-semibold text-gray-600">
              Current Cash Summary
            </p>

            <div className="grid grid-cols-2">
              <div className="border-r border-gray-300 pr-4">
                <p className="text-xs text-gray-500">Opening Balance</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Rs. {openingBalance.toLocaleString()}
                </p>
              </div>

              <div className="pl-4">
                <p className="text-xs text-gray-500">Current Balance</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Rs. {currentBalance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-5 py-3">
          <ReusableButton
            type="button"
            title="Cancel"
            variant="outline"
            size="sm"
            onClick={onClose}
          />

          <ReusableButton
            type="button"
            title="Save Entry"
            variant="primary"
            size="sm"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default PettyCashEntryModal;
