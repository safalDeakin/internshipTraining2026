// author: shrajja

import { useState } from "react";
import { Edit, Trash2, Minus, Box, Plus } from "lucide-react";

import type { ProductGroup } from "../data/initialProductData";
import type { ProductFormData } from "./modal/ProductFormModal";
import ProductFormModal from "./modal/ProductFormModal";

interface FnBDetailsProps {
  product: ProductGroup | null;
  variants: string[];
}

type ProductItem = ProductGroup["items"][number];

type ModalType = "add" | "edit-item" | "edit-group" | null;

const FnBDetails = ({ product, variants }: FnBDetailsProps) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null);

  // Open modal to add a new item
  const handleAddProduct = () => {
    setEditingItem(null);
    setModalType("add");
  };

  // Open modal to edit an individual item
  const handleEditProduct = (item: ProductItem) => {
    setEditingItem(item);
    setModalType("edit-item");
  };

  // Open modal to edit the product group name
  const handleEditGroupName = () => {
    setEditingItem(null);
    setModalType("edit-group");
  };

  // Close modal
  const handleCloseModal = () => {
    setModalType(null);
    setEditingItem(null);
  };

  // Handle form submission
  const handleConfirmProduct = (data: ProductFormData) => {
    if (modalType === "edit-group" && product) {
      console.log("Updating product group:", product.id, data);
    } else if (modalType === "edit-item" && editingItem) {
      console.log("Updating product item:", editingItem.id, data);
    } else if (modalType === "add") {
      console.log("Adding new product:", data);
    }

    handleCloseModal();
  };

  // Modal title
  const getModalTitle = () => {
    switch (modalType) {
      case "add":
        return "Register New Items (F&B)";
      case "edit-item":
        return "Edit Items Details (F&B)";
      case "edit-group":
        return "Edit Product Group";
      default:
        return "";
    }
  };

  // Modal initial data
  const getInitialData = (): ProductFormData | undefined => {
    if (modalType === "edit-group" && product) {
      return {
        name: product.name,
        description: "",
        recommendedAddons: [],
      };
    }

    if (modalType === "edit-item" && editingItem) {
      return {
        name: editingItem.name,
        description: editingItem.description,
        recommendedAddons: [],
      };
    }

    return undefined;
  };

  return (
    <main className="min-w-0 overflow-y-auto px-2">
      {!product ? (
        <div className="flex h-full items-center justify-center text-sm text-gray-500">
          Select a product to see its details.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between rounded-md border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-gray-600" />

              <h1 className="text-base font-semibold text-gray-900">
                {product.name}
              </h1>

              <span className="text-sm text-gray-500">({product.code})</span>

              <span
                className={`ml-1 rounded-full px-3 py-0.5 text-xs font-medium text-white ${
                  product.status === "Active" ? "bg-teal-600" : "bg-gray-400"
                }`}
              >
                {product.status}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Edit Product Group Name */}
              <button
                type="button"
                onClick={handleEditGroupName}
                aria-label={`Edit ${product.name}`}
                className="flex items-center gap-1.5 rounded bg-slate-600 px-3 py-1.5 text-sm text-white hover:bg-slate-700"
              >
                <Edit className="h-3.5 w-3.5" />
                Edit Name
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 rounded bg-red-400 px-3 py-1.5 text-sm text-white hover:bg-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>

          {/* Items */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-800">
                Items{" "}
                <span className="text-green-600">({product.items.length})</span>
              </h2>

              <button
                type="button"
                onClick={handleAddProduct}
                className="flex items-center text-sm font-medium text-blue-600 hover:underline"
              >
                <Plus className="h-3 w-3" />
                Add Products
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {product.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-md border border-gray-200 bg-white p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm font-medium text-gray-900">
                        {item.name}
                      </span>

                      <span className="text-xs text-gray-500">
                        (SKU: {item.sku})
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-700">
                      {item.description}
                    </p>

                    <p className="mt-0.5 text-sm text-gray-700">
                      Calories: {item.calories}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-blue-600">
                    {/* Edit individual item */}
                    <button
                      type="button"
                      onClick={() => handleEditProduct(item)}
                      aria-label={`Edit ${item.name}`}
                      className="rounded p-1 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    {/* Remove individual item */}
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      className="rounded p-1 hover:bg-blue-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Variant Generator */}
          <section className="px-1">
            <h2 className="mb-3 text-sm font-medium text-gray-800">
              Variant Generator
            </h2>

            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-800">
                Product Attributes
              </h3>

              <button
                type="button"
                aria-label="Edit attributes"
                className="rounded p-1 text-blue-600 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 border-b border-gray-200 pb-4">
              {product.attributes.map((group, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-4 text-sm font-semibold text-gray-800">
                    {index + 1}.
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {group.map((value) => (
                      <span
                        key={value}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-md border border-gray-200 bg-white p-3">
              <h3 className="mb-3 text-sm font-medium text-gray-800">
                Variants{" "}
                <span className="italic">
                  (Auto-Generated based on Product attributes combination)
                </span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <span
                    key={variant}
                    className="rounded border border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-700"
                  >
                    {variant}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Search Tags */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-800">Search Tags</h2>

              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Edit Tags
              </button>
            </div>

            <div className="flex flex-wrap gap-2 rounded-md border border-gray-200 bg-white p-3">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-300 px-4 py-1 text-sm text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Reusable Add / Edit Modal */}
      {modalType && product && (
        <ProductFormModal
          key={`${modalType}-${editingItem?.id ?? product.id}`}
          title={getModalTitle()}
          initialData={getInitialData()}
          onClose={handleCloseModal}
          onConfirm={handleConfirmProduct}
        />
      )}
    </main>
  );
};

export default FnBDetails;
