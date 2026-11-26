import FormBuilder from "../../../../lib/formBuilder/FormBuilders";

interface CompleteTaskModalProps {
  onSubmit: (values: string) => void;
}

const CompleteTaskModal = ({ onSubmit }: CompleteTaskModalProps) => {
  const formBuilder = FormBuilder.formConfig({
    formConfig: {
      name: "Complete Task",
      code: "complete-task",
      fields: [
        {
          type: "text",
          label: "Full Name",
          code: "fullName",
          placeholder: "Enter full name",
          isRequired: true,
        },
        {
          type: "textArea",
          label: "Completion Note",
          code: "completionNote",
          placeholder: "Enter completion details",
          isRequired: true,
        },
      ],
    },

    onSubmit: (values: string) => {
      const data = JSON.parse(values);
    },
  });

  return (
    <div className="max-h-[75vh] overflow-y-auto p-4">
      {formBuilder.build()}
    </div>
  );
};

export default CompleteTaskModal;
