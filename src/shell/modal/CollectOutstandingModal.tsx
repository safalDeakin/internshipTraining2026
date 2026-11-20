import FormBuilder, {
  type FormConfig,
} from "../../lib/formBuilder/FormBuilders";

/* ----------------------------- Types ----------------------------- */

export interface OutstandingInvoice {
  invoiceNumber: string;
  customerName: string;
  phone: string;
  address?: string;
  references: string[];
  totalAmount: number;
  paidAmount: number;
  paymentMethod?: string;
}

export interface OutstandingPayment {
  totalAmount: number;
  dueAmount: number;
  payer: string;
  receivedAmount: number;
}

interface CollectOutstandingModalProps {
  invoice: OutstandingInvoice;
  onClose: () => void;
  onGenerate: (payment: OutstandingPayment) => void;
}

/* -------------------------- Component ---------------------------- */

const CollectOutstandingModal = ({
  invoice,
  onClose,
  onGenerate,
}: CollectOutstandingModalProps) => {
  const dueAmount = Math.max(0, invoice.totalAmount - invoice.paidAmount);

  const config: FormConfig = {
    name: "Collect Outstanding",
    code: "COLLECT_OUTSTANDING_FORM",
    fields: [
      {
        type: "text",
        label: "Total Amount",
        code: "totalAmount",
        placeholder: `Rs. ${invoice.totalAmount}`,
        isRequired: false,
      },
      {
        type: "text",
        label: "Due Amount",
        code: "dueAmount",
        placeholder: `Rs. ${dueAmount}`,
        isRequired: false,
      },
      {
        type: "text",
        label: "Payer",
        code: "payer",
        placeholder: "Enter payer name",
        isRequired: true,
      },
      {
        type: "number",
        label: "Received Amount",
        code: "receivedAmount",
        placeholder: "Enter received amount",
        isRequired: true,
      },
    ],
  };

  const formBuilder = FormBuilder.formConfig({
    formConfig: config,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      const payer = String(data.payer ?? "").trim();
      const receivedAmount = Number(data.receivedAmount);

      if (!payer) return;

      if (
        !Number.isFinite(receivedAmount) ||
        receivedAmount <= 0 ||
        receivedAmount > dueAmount
      ) {
        return;
      }

      onGenerate({
        totalAmount: invoice.totalAmount,
        dueAmount,
        payer,
        receivedAmount,
      });
    },

    onCancel: onClose,
  });

  return <div className="w-full p-3">{formBuilder.build()}</div>;
};

export default CollectOutstandingModal;
