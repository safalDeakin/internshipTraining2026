import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import ReusableButton from "../../pages/posuserSession/shared/components/reuse/ReusableButton";

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
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [recommendedAddons, setRecommendedAddons] = useState<string[]>(
    initialData?.recommendedAddons?.length
      ? initialData.recommendedAddons
      : [""],
  );

  useEffect(() => {
    setName(initialData?.name ?? "");
    setDescription(initialData?.description ?? "");
    setRecommendedAddons(
      initialData?.recommendedAddons?.length
        ? initialData.recommendedAddons
        : [""],
    );
  }, [initialData]);

  const handleAddonChange = (index: number, value: string) => {
    setRecommendedAddons((previous) =>
      previous.map((addon, i) => (i === index ? value : addon)),
    );
  };

  const handleAddAddon = () => {
    setRecommendedAddons((previous) => [...previous, ""]);
  };

  const handleRemoveAddon = (index: number) => {
    setRecommendedAddons((previous) => previous.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onConfirm({
      name: name.trim(),
      description: description.trim(),
      recommendedAddons: recommendedAddons
        .map((addon) => addon.trim())
        .filter(Boolean),
    });
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="w-full p-2">
      {/* Product Name */}
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Product Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter product name"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter product description"
          rows={3}
          className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Recommended Add-ons */}
      <div className="mb-6">
        <div className="mb-2 flex flex-col ">
          <label className="text-sm font-medium text-gray-700">
            Recommended Add-ons
          </label>

          <ReusableButton
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddAddon}
            className="w-50 mt-2"
          >
            <Plus size={15} />
            Add
          </ReusableButton>
        </div>

        {/* <div className="space-y-2">
          {recommendedAddons.map((addon, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={addon}
                onChange={(event) =>
                  handleAddonChange(index, event.target.value)
                }
                placeholder="Enter add-on"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => handleRemoveAddon(index)}
                disabled={recommendedAddons.length === 1}
                className="rounded-md p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Remove add-on"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div> */}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
        <ReusableButton variant="outline" size="sm" onClick={onClose}>
          Cancel
        </ReusableButton>

        <ReusableButton variant="primary" size="sm" type="submit">
          Confirm
        </ReusableButton>
      </div>
    </form>
  );

  return formContent;
};

export default ProductFormModal;
