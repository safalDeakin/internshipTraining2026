// author: shrajja

import { useState } from "react";

import ReusableButton from "../../../../shell/shared/components/ReusableButton";
import type {
  ApplicableOfferItem,
  ApplicationItemOption,
} from "../../dropdown/types/DropdownTypes";

interface AddApplicationItemModalProps {
  products: ApplicationItemOption[];
  existingItems: ApplicableOfferItem[];
  onClose: () => void;
  onConfirm: (products: ApplicationItemOption[]) => void | Promise<void>;
}

const AddApplicationItemModal = ({
  products,
  existingItems,
  onClose,
  onConfirm,
}: AddApplicationItemModalProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const existingProductIds = new Set(
    existingItems.map((item) => item.productId),
  );

  const toggleProduct = (id: string) => {
    if (existingProductIds.has(id)) return;

    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const handleConfirm = async () => {
    const selectedProducts = products.filter((product) =>
      selectedIds.includes(product.id),
    );

    if (!selectedProducts.length) return;

    setSaving(true);

    try {
      await onConfirm(selectedProducts);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex max-h-[75vh] min-h-0 flex-col">
      <div className="shrink-0 border-b px-5 py-4">
        <h2 className="text-base font-semibold text-gray-800">
          Add Applicable Items
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {products.map((product) => {
            const checked = selectedIds.includes(product.id);
            const alreadyAdded = existingProductIds.has(product.id);

            return (
              <label
                key={product.id}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-3 transition ${
                  alreadyAdded
                    ? "cursor-not-allowed bg-gray-50 opacity-50"
                    : checked
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={alreadyAdded || saving}
                  onChange={() => toggleProduct(product.id)}
                  className="h-4 w-4 accent-blue-600"
                />

                <span className="flex-1 text-sm font-medium text-gray-700">
                  {product.name}
                </span>

                {alreadyAdded && (
                  <span className="text-xs text-gray-400">Added</span>
                )}
              </label>
            );
          })}

          {products.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">
              No items available.
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between border-t px-5 py-3">
        <span className="text-xs text-gray-500">
          {selectedIds.length} selected
        </span>

        <div className="flex gap-2">
          <ReusableButton
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </ReusableButton>

          <ReusableButton
            variant="primary"
            size="sm"
            onClick={handleConfirm}
            disabled={selectedIds.length === 0 || saving}
          >
            {saving ? "Adding..." : "Add Selected"}
          </ReusableButton>
        </div>
      </div>
    </div>
  );
};

export default AddApplicationItemModal;
