import FormBuilder from "../../../../lib/formBuilder/FormBuilders";

interface PickupStatusModalProps {
  onClose: () => void;
  onUpdate: (values: {
    status: "New" | "Completed";
    pickupDate: string;
    pickupTime: string;
    remark: string;
  }) => void;
}

export default function PickupStatusModal({
  onClose,
  onUpdate,
}: PickupStatusModalProps) {
  const form = FormBuilder.formConfig({
    formConfig: {
      name: "Pick up status",
      code: "pickup_status_form",
      fields: [
        {
          type: "dropdown",
          label: "Status",
          code: "status",
          isRequired: true,
          options: [
            { label: "Pending", val: "New" },
            { label: "Completed", val: "Completed" },
          ],
        },
        {
          type: "date",
          label: "Pick up Date",
          code: "pickupDate",
          isRequired: true,
        },
        {
          type: "text",
          label: "Pick up Time",
          code: "pickupTime",
          placeholder: "11:00 AM",
          isRequired: true,
        },
        {
          type: "text",
          label: "Remark",
          code: "remark",
          placeholder: "Enter",
          isRequired: false,
        },
      ],
    },

    onSubmit: (values) => {
      const parsedValues = JSON.parse(values);

      onUpdate(parsedValues);
      onClose();
    },

    onCancel: () => onClose(),
  });

  return <div className="w-full p-3">{form.build()}</div>;
}
