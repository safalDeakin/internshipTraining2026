import FormBuilder, {
  type FormConfig,
} from "../../../../lib/formBuilder/FormBuilders";

export interface CompleteTaskFormData {
  fullName: string;
  completionNote: string;
}

interface CompleteTaskModalProps {
  onSubmit: (data: CompleteTaskFormData) => void;
}

const CompleteTaskModal = ({ onSubmit }: CompleteTaskModalProps) => {
  const formConfig: FormConfig = {
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
  };

  const formBuilder = FormBuilder.formConfig({
    formConfig,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      onSubmit({
        fullName: data.fullName.trim(),
        completionNote: data.completionNote.trim(),
      });
    },
  });

  return <div className="w-full p-2">{formBuilder.build()}</div>;
};

export default CompleteTaskModal;
