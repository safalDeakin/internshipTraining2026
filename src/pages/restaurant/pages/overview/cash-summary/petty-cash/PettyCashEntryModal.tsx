// author: shrajja

import { useEffect } from "react";
import { X } from "lucide-react";

import type { FormConfig } from "../../../../../../lib/formBuilder/FormBuilders";
import FormBuilder from "../../../../../../lib/formBuilder/FormBuilders";

export interface PettyCashEntry {
  id: number;
  type: "in" | "out";
  date: string;
  time: string;
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

const PettyCashEntryModal = ({
  open,
  onClose,
  onSave,
  openingBalance,
  currentBalance,
  editingEntry,
}: PettyCashEntryModalProps) => {
  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Form configuration
  const pettyCashConfig: FormConfig = {
    name: "Cash Entry",
    code: "PETTY_CASH_ENTRY",

    fields: [
      {
        type: "radio",
        label: "Entry Type",
        code: "type",
        isRequired: true,
        options: [
          { label: "Paid In", val: "in" },
          { label: "Paid Out", val: "out" },
        ],
      },
      {
        type: "date",
        label: "Date",
        code: "date",
        isRequired: true,
      },
      {
        type: "text",
        label: "Time",
        code: "time",
        placeholder: "HH:mm",
        isRequired: true,
      },
      {
        type: "text",
        label: "Reference No",
        code: "refNo",
        placeholder: "Enter reference no",
        isRequired: false,
      },
      {
        type: "text",
        label: "Category",
        code: "category",
        placeholder: "Enter category",
        isRequired: true,
      },
      {
        type: "text",
        label: "Description",
        code: "description",
        placeholder: "Enter description",
        isRequired: false,
      },
      {
        type: "number",
        label: "Amount",
        code: "amount",
        placeholder: "Rs. 0",
        isRequired: true,
      },
      {
        type: "text",
        label: "Payment Method",
        code: "paymentMethod",
        placeholder: "Enter payment method",
        isRequired: true,
      },
    ],
  };

  // Generate form
  const formFromConfig = FormBuilder.formConfig({
    formConfig: pettyCashConfig,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      if (!data.date || !data.time) {
        alert("Please select date and time.");
        return;
      }

      if (!data.category?.trim()) {
        alert("Please enter a category.");
        return;
      }

      if (!data.amount || Number(data.amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      onSave(
        {
          type: data.type as "in" | "out",
          date: data.date,
          time: data.time,
          refNo: data.refNo?.trim() ?? "",
          category: data.category.trim(),
          description: data.description?.trim() ?? "",
          amount: Number(data.amount),
          paymentMethod: data.paymentMethod?.trim() ?? "",
        },
        editingEntry?.id,
      );
    },

    onCancel: () => {
      onClose();
    },
  });

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
        {/* HEADER */}
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="font-bold text-gray-900 text-center">Cash Entry</h3>

          {/* <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <X size={18} />
          </button> */}
        </div>

        {/* FORM */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {formFromConfig.build()}

          {/* CURRENT CASH SUMMARY */}
          {/* <div className="rounded-lg bg-gray-100 p-4">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PettyCashEntryModal;
