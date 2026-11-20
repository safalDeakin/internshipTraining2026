// author: shrajja

import FormBuilder, {
  type FormConfig,
} from "../../../../lib/formBuilder/FormBuilders";

export interface PricelistFormData {
  name: string;
  expiryDate: string;
  template: string;
  description: string;
}

interface PricelistAddModalProps {
  onClose: () => void;
  onConfirm: (data: PricelistFormData) => void;
  templates?: { label: string; val: string }[];
}

const PricelistAddModal = ({
  onClose,
  onConfirm,
  templates = [{ label: "Empty Pricelist", val: "empty" }],
}: PricelistAddModalProps) => {
  const pricelistConfig: FormConfig = {
    name: "Add PriceList",
    code: "PRICELIST_FORM",
    fields: [
      {
        type: "text",
        label: "Title",
        code: "name",
        placeholder: "Enter pricelist title",
        isRequired: true,
      },
      {
        type: "text",
        label: "Expiry Date",
        code: "expiryDate",
        placeholder: "YYYY-MM-DD",
        isRequired: true,
      },
      {
        type: "dropdown",
        label: "Templates (select one for Lazy load)",
        code: "template",
        isRequired: true,
        options: templates,
      },
      {
        type: "textArea",
        label: "Description",
        code: "description",
        placeholder: "Enter description",
        isRequired: false,
      },
    ],
  };

  const formFromConfig = FormBuilder.formConfig({
    formConfig: pricelistConfig,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      onConfirm({
        name: data.name.trim(),
        expiryDate: data.expiryDate.trim(),
        template: data.template,
        description: data.description?.trim() ?? "",
      });
    },

    onCancel: () => {
      onClose();
    },
  });

  return (
    <div className="w-full p-3">
      <h2 className="mb-5 text-center text-lg font-semibold text-gray-800">
        Add PriceList
      </h2>

      {formFromConfig.build()}
    </div>
  );
};

export default PricelistAddModal;
