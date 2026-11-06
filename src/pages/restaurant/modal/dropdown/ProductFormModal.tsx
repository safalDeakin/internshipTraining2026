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
    initialData?.recommendedAddons ?? [""],
  );

  useEffect(() => {
    setName(initialData?.name ?? "");
    setDescription(initialData?.description ?? "");
    setRecommendedAddons(initialData?.recommendedAddons ?? [""]);
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

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="relative mb-6">
          <h2 className="text-center text-xl font-semibold text-black">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-0 top-0 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="mb-2 block text-sm ">Title</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter product name"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="mb-2 block text-sm ">Description</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter product description"
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Recommended Add-ons */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-gray-800">
            Recommended Add-ons
          </p>

          <button
            type="button"
            onClick={handleAddAddon}
            className="mt-3 flex items-center gap-1 text-sm font-medium bg-gray-100"
          >
            <Plus className="h-4 w-4" />
            Add more
          </button>
        </div>

        {/* Footer */}
        <div className=" w-full flex justify-between gap-3 border-t border-gray-200 pt-4">
          <ReusableButton
            variant="outline"
            onClick={onClose}
            size="lg"
            className="w-full"
          >
            Cancel
          </ReusableButton>

          <ReusableButton
            variant="primary"
            type="submit"
            size="lg"
            className="w-full"
          >
            Confirm
          </ReusableButton>
        </div>
      </form>
    </div>
  );
};

export default ProductFormModal;
