import FormBuilder, {
  type FormConfig,
} from "../../../../lib/formBuilder/FormBuilders";

export interface ProductFormData {
  name: string;
  description: string;
  recommendedAddons: string[];
}

interface ProductFormModalProps {
  title: string;
  initialData?: ProductFormData;
  onClose: () => void;
  onConfirm: (data: ProductFormData) => void;
}

const ProductFormModal = ({
  title,
  initialData,
  onClose,
  onConfirm,
}: ProductFormModalProps) => {
  const productConfig: FormConfig = {
    name: title,
    code: "PRODUCT_FORM",
    fields: [
      {
        type: "text",
        label: "Product Name",
        code: "name",
        placeholder: "Enter product name",
        isRequired: true,
      },
      {
        type: "textArea",
        label: "Description",
        code: "description",
        placeholder: "Enter product description",
        isRequired: false,
      },
    ],
  };

  const formFromConfig = FormBuilder.formConfig({
    formConfig: productConfig,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      onConfirm({
        name: data.name.trim(),
        description: data.description?.trim() ?? "",
        recommendedAddons: [],
      });
    },

    onCancel: () => {
      onClose();
    },
  });

  return <div className="w-full p-2"> {formFromConfig.build()}</div>;
};

export default ProductFormModal;
