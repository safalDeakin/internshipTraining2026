import FormBuilder from "../../../../lib/formBuilder/FormBuilders";

interface RoomServiceRequestFormProps {
  onClose: () => void;
}

export default function RoomServiceRequestForm({
  onClose,
}: RoomServiceRequestFormProps) {
  const form = FormBuilder.formConfig({
    formConfig: {
      name: "Room Service Request",
      code: "room_service_request",

      fields: [
        {
          type: "dropdown",
          label: "Service Type",
          code: "serviceType",
          isRequired: true,
          options: [
            { label: "Extra Towel & Linen", val: "Extra Towel & Linen" },
            { label: "Room Cleaning", val: "Room Cleaning" },
            { label: "Food & Beverage", val: "Food & Beverage" },
            { label: "Laundry", val: "Laundry" },
            { label: "Room Setup", val: "Room Setup" },
            { label: "Decoration", val: "Decoration" },
          ],
        },
        {
          type: "number",
          label: "Quantity",
          code: "quantity",
          placeholder: "Enter quantity",
          isRequired: true,
        },
        {
          type: "number",
          label: "Price",
          code: "price",
          placeholder: "Enter price",
          isRequired: true,
        },
        {
          type: "date",
          label: "Requested Date",
          code: "requestedDate",
          isRequired: true,
        },
        {
          type: "text",
          label: "Requested Time",
          code: "requestedTime",
          placeholder: "e.g. 11:00 AM",
          isRequired: true,
        },
        {
          type: "text",
          label: "Service Location",
          code: "serviceLocation",
          placeholder: "e.g. Room 101",
          isRequired: true,
        },
        {
          type: "textArea",
          label: "Special Instruction",
          code: "specialInstruction",
          placeholder: "Enter special instructions...",
          isRequired: false,
        },
      ],
    },

    onSubmit: (values) => {
      const request = JSON.parse(values);

      console.log("Room Service Request:", request);

      onClose();
    },

    onCancel: () => {
      onClose();
    },
  });

  return <div className="w-full p-3">{form.build()}</div>;
}
