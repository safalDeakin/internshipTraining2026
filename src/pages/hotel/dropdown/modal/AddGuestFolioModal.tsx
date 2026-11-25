import FormBuilder from "../../../../lib/formBuilder/FormBuilders";

interface AddGuestFolioModalProps {
  onSubmit: (values: string) => void;
}

const AddGuestFolioModal = ({ onSubmit }: AddGuestFolioModalProps) => {
  const formBuilder = FormBuilder.formConfig({
    formConfig: {
      name: "Advance Deposit",
      code: "advance-deposit",
      fields: [
        // Guest Information
        {
          type: "text",
          label: "Guest Name",
          code: "guestName",
          placeholder: "Enter guest name",
          isRequired: true,
        },
        {
          type: "text",
          label: "Contact No.",
          code: "contactNo",
          placeholder: "Enter contact number",
          isRequired: true,
        },

        // Payment Information
        {
          type: "dropdown",
          label: "Payment Method",
          code: "paymentMethod",
          options: [
            { label: "Cash", val: "Cash" },
            { label: "Card", val: "Card" },
            { label: "Bank Transfer", val: "Bank Transfer" },
            { label: "Digital Wallet", val: "Digital Wallet" },
          ],
          isRequired: true,
        },
        {
          type: "date",
          label: "Payment Date",
          code: "paymentDate",
          isRequired: true,
        },
        {
          type: "number",
          label: "Amount Received",
          code: "amountReceived",
          placeholder: "Enter amount",
          isRequired: true,
        },
        {
          type: "text",
          label: "Bank/Account (Optional)",
          code: "bankAccount",
          placeholder: "Enter bank/account",
          isRequired: false,
        },

        // Additional Information
        {
          type: "textArea",
          label: "Remark",
          code: "remark",
          placeholder: "Enter remark",
          isRequired: false,
        },
        {
          type: "text",
          label: "Attachment",
          code: "attachment",
          placeholder: "Click to upload",
          isRequired: false,
        },
      ],
    },

    onSubmit: (values: string) => {
      onSubmit(values);
    },
  });

  return (
    <div
      className="max-h-[75vh] overflow-y-auto p-4"
      onSubmitCapture={(event) => {
        event.preventDefault();
      }}
    >
      <div className="mb-4">
        <h3 className="mb-3 text-base font-semibold">Guest Information</h3>

        <h3 className="mb-3 text-base font-semibold">Payment Information</h3>
      </div>

      {formBuilder.build()}
    </div>
  );
};

export default AddGuestFolioModal;
