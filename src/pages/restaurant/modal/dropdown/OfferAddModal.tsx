// author: shrajja

import FormBuilder, {
  type FormConfig,
} from "../../../../lib/formBuilder/FormBuilders";

export interface OfferFormData {
  name: string;
  code: string;
  campaignName: string;
  campaignId: string;
  label: string;
}

interface OfferAddModalProps {
  onClose: () => void;
  onConfirm: (data: OfferFormData) => void;
  labels?: { label: string; val: string }[];
}

const OfferAddModal = ({
  onClose,
  onConfirm,
  labels = [],
}: OfferAddModalProps) => {
  const offerConfig: FormConfig = {
    name: "Create Offer",
    code: "OFFER_FORM",
    fields: [
      {
        type: "text",
        label: "Offer Name",
        code: "name",
        placeholder: "Enter offer name",
        isRequired: true,
      },
      {
        type: "text",
        label: "Offer Code",
        code: "code",
        placeholder: "Enter offer code",
        isRequired: true,
      },
      {
        type: "text",
        label: "Campaign Name",
        code: "campaignName",
        placeholder: "Enter campaign name",
        isRequired: true,
      },
      {
        type: "text",
        label: "Campaign ID",
        code: "campaignId",
        placeholder: "Enter campaign ID",
        isRequired: true,
      },
      {
        type: "dropdown",
        label: "Label",
        code: "label",
        placeholder: "Select label",
        isRequired: true,
        options: labels,
      },
    ],
  };

  const formFromConfig = FormBuilder.formConfig({
    formConfig: offerConfig,

    onSubmit: (values: string) => {
      const data = JSON.parse(values);

      onConfirm({
        name: data.name.trim(),
        code: data.code.trim(),
        campaignName: data.campaignName.trim(),
        campaignId: data.campaignId.trim(),
        label: data.label,
      });
    },

    onCancel: onClose,
  });

  return (
    <div className="w-full p-6">
      <h2 className="mb-8 text-center text-2xl font-semibold text-gray-900">
        Create Offer
      </h2>

      {formFromConfig.build()}
    </div>
  );
};

export default OfferAddModal;
