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
  // Step 1: Define form configuration
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
        type: "text",
        label: "Description",
        code: "description",
        placeholder: "Enter product description",
        isRequired: false,
      },

      // Recommended Add-ons can be added later.
      /*
      {
        type: "checkbox",
        label: "Recommended Add-ons",
        code: "recommendedAddons",
        options: [],
      },
      */
    ],
  };

  // Step 2: Generate form using configuration
  //configuration becomes an actual form.
  const formFromConfig = FormBuilder.fromConfig({
    //pass previously defined configuration to FormBuilder.
    formConfig: productConfig,

    //runs when the user submits the form. convert into json
    onSubmit: (values: string) => {
      const data = JSON.parse(values);
      //passes the cleaned product data back to the parent component.
      onConfirm({
        name: data.name.trim(),
        description: data.description.trim(),
        recommendedAddons: [],
      });
    },
    //form's Cancel button is clicked, it calls the parent's onClose() function.
    onCancel: () => {
      onClose();
    },
  });

  // Step 3: Render generated form
  return <div className="w-full p-2">{formFromConfig.build()}</div>;
};

export default ProductFormModal;
