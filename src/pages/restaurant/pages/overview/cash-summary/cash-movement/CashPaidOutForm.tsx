import { useEffect } from "react";
import { X } from "lucide-react";

import type { FormConfig } from "../../../../../../lib/formBuilder/FormBuilders";
import FormBuilder from "../../../../../../lib/formBuilder/FormBuilders";

export interface CashPaidOutData {
  expenseType: string;
  amount: number;
  department: string;
  paidTo: string;
  invoiceNo: string;
  invoicedDate: string;
  description: string;
}

interface CashPaidOutFormProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: CashPaidOutData) => void;
}

const CashPaidOutForm = ({
  open,
  onClose,
  onConfirm,
}: CashPaidOutFormProps) => {
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

  const cashPaidOutConfig: FormConfig = {
    name: "Cash Paid-Out",
    code: "CASH_PAID_OUT",

    fields: [
      {
        type: "text",
        label: "Expenses Type",
        code: "expenseType",
        placeholder: "Enter expense type",
        isRequired: true,
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
        label: "Department",
        code: "department",
        placeholder: "Enter department",
        isRequired: true,
      },
      {
        type: "text",
        label: "Paid To",
        code: "paidTo",
        placeholder: "Enter recipient name",
        isRequired: true,
      },
      {
        type: "text",
        label: "Invoice No",
        code: "invoiceNo",
        placeholder: "Enter invoice number",
        isRequired: false,
      },
      {
        type: "date",
        label: "Invoiced Date",
        code: "invoicedDate",
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

  const formFromConfig = FormBuilder.formConfig({
    formConfig: cashPaidOutConfig,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      onConfirm({
        expenseType: data.expenseType,
        amount: Number(data.amount),
        department: data.department,
        paidTo: data.paidTo,
        invoiceNo: data.invoiceNo ?? "",
        invoicedDate: data.invoicedDate,
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
        aria-labelledby="cash-paid-out-title"
        className="flex max-h-[90vh] w-full max-w-md flex-col rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="border-b border-gray-200 px-5 py-4">
          <h3
            id="cash-paid-out-title"
            className="font-bold text-gray-900 text-center"
          >
            Cash Paid-Out
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

export default CashPaidOutForm;
