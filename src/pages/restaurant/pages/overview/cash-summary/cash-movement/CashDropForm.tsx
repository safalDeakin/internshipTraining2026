import { useEffect } from "react";
import { X } from "lucide-react";

import type { FormConfig } from "../../../../../../lib/formBuilder/FormBuilders";
import FormBuilder from "../../../../../../lib/formBuilder/FormBuilders";

export interface CashDropData {
  reason: string;
  amount: number;
  transferTo: string;
  approvedBy: string;
  description: string;
}

interface CashDropFormProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: CashDropData) => void;
}

const CashDropForm = ({ open, onClose, onConfirm }: CashDropFormProps) => {
  // Close modal on Escape
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
  const cashDropConfig: FormConfig = {
    name: "Cash Drop",
    code: "CASH_DROP",

    fields: [
      {
        type: "dropdown",
        label: "Reasons",
        code: "reason",
        placeholder: "Select reason",
        isRequired: true,
        options: [
          { label: "Bank Deposit", val: "Bank Deposit" },
          { label: "Cash Transfer", val: "Cash Transfer" },
          { label: "Cash Storage", val: "Cash Storage" },
          { label: "Other", val: "Other" },
        ],
      },
      {
        type: "number",
        label: "Amount",
        code: "amount",
        placeholder: "Enter amount",
        isRequired: true,
      },
      {
        type: "text",
        label: "Transfer To",
        code: "transferTo",
        placeholder: "Enter transfer destination",
        isRequired: true,
      },
      {
        type: "text",
        label: "Approved by",
        code: "approvedBy",
        placeholder: "Enter approver name",
        isRequired: true,
      },
      {
        type: "textArea",
        label: "Description/Remarks/Note",
        code: "description",
        placeholder: "Enter description",
        isRequired: false,
      },
    ],
  };

  // Generate form
  const formFromConfig = FormBuilder.formConfig({
    formConfig: cashDropConfig,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      onConfirm({
        reason: data.reason,
        amount: Number(data.amount),
        transferTo: data.transferTo,
        approvedBy: data.approvedBy,
        description: data.description?.trim() ?? "",
      });
    },

    onCancel: onClose,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cash-drop-title"
        className="flex max-h-[90vh] w-full max-w-md flex-col rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className=" border-b border-gray-200 px-5 py-4">
          <h3
            id="cash-drop-title"
            className="font-bold text-gray-900 text-center"
          >
            Cash Drop
          </h3>

          {/* <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={18} />
          </button> */}
        </div>

        {/* FORM */}
        <div className="flex-1 overflow-y-auto p-5">
          {formFromConfig.build()}
        </div>
      </div>
    </div>
  );
};

export default CashDropForm;
