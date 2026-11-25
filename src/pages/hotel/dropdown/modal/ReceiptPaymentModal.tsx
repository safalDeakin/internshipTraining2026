import FormBuilder from "../../../../lib/formBuilder/FormBuilders";
import type { GuestFolio } from "../billing/BillingLayout";

interface ReceivePaymentModalProps {
  folio: GuestFolio;
  onClose: (values?: string) => void;
}

export default function ReceivePaymentModal({
  folio,
  onClose,
}: ReceivePaymentModalProps) {
  const form = FormBuilder.formConfig({
    formConfig: {
      name: "Receive Payment",
      code: "receive_payment",

      fields: [
        {
          type: "number",
          label: "Total Amount",
          code: "totalAmount",
          placeholder: `Rs. ${folio.totalCharge.toLocaleString("en-IN")}`,
          isRequired: false,
        },
        {
          type: "number",
          label: "Due Amount",
          code: "dueAmount",
          placeholder: `Rs. ${folio.outstandingAmount.toLocaleString("en-IN")}`,
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
    },

    onSubmit: (values) => {
      const payment = JSON.parse(values);

      console.log("Payment Details:", payment);

      onClose(values);
    },

    onCancel: () => {
      onClose();
    },
  });

  return <div className="w-full p-3">{form.build()}</div>;
}
