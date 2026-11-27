// author: shrajja

import { Edit, Trash2, Minus, Box, Plus } from "lucide-react";

import type { ProductFormData } from "../../../modal/dropdown/ProductFormModal";
import ProductFormModal from "../../../modal/dropdown/ProductFormModal";

import ReusableButton from "../../../../../shell/shared/components/ReusableButton";

import type { ProductType } from "../../types/DropdownTypes";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";
import Toolbar from "../../../../../lib/component/Toolbar/Toolbar";
import Container from "../../../../../lib/component/Container/Container";
import Scrollable from "../../../../../lib/component/scrollable/Scrollable";
import DeleteConfirmationModal from "../../../modal/DeleteConfirmationModal";

interface FnBDetailsProps {
  product: ProductType | null;
  variants: string[];
}

type ProductItem = ProductType["items"][number];

type ModalType = "add" | "edit-item" | "edit-group";

const FnBDetails = ({ product, variants }: FnBDetailsProps) => {
  const { showDialog, closeDialog } = useDialogBox();

  // Open centralized dialog for Add / Edit actions
  const openProductDialog = (
    modalType: ModalType,
    editingItem?: ProductItem,
  ) => {
    if (!product) return;

    // Modal title
    const modalTitle = {
      add: "Register New Items (F&B)",
      "edit-item": "Edit Items Details (F&B)",
      "edit-group": "Edit Product Group",
    }[modalType];

    // Initial form data
    let initialData: ProductFormData | undefined;

    if (modalType === "edit-group") {
      initialData = {
        name: product.name,
        description: "",
        recommendedAddons: [],
      };
    }

    if (modalType === "edit-item" && editingItem) {
      initialData = {
        name: editingItem.name,
        description: editingItem.description,
        recommendedAddons: [],
      };
    }

    showDialog({
      title: modalTitle,
      width: 520,
      showHeader: true,
      closeOnBackdrop: true,
      closeOnEscape: true,

      content: (
        <ProductFormModal
          title={modalTitle}
          initialData={initialData}
          onClose={() => closeDialog()}
          onConfirm={(data: ProductFormData) => {
            // Handle form submission
            if (modalType === "edit-group") {
              console.log("Updating product group:", product.id, data);
            } else if (modalType === "edit-item" && editingItem) {
              console.log("Updating product item:", editingItem.id, data);
            } else if (modalType === "add") {
              console.log("Adding new product:", data);
            }

            closeDialog();
          }}
        />
      ),
    });
  };
  const handleDeleteProduct = () => {
    if (!product) return;

    showDialog({
      title: "Delete Product",
      width: 420,
      showHeader: false,
      closeOnBackdrop: true,
      closeOnEscape: true,
      content: (
        <DeleteConfirmationModal
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          itemName={product.name}
          onConfirm={() => {
            console.log("Deleting product:", product.id);

            // Call delete service here

            closeDialog();
          }}
          onCancel={() => closeDialog()}
        />
      ),
    });
  };
  return (
    <Scrollable direction="y">
      <main className="min-w-0 px-2">
        {!product ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Select a product to see its details.
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Header */}
            <Toolbar
              left={
                <div className="flex items-center gap-2">
                  <Box className="h-5 w-5 text-gray-600" />

                  <h1 className="text-base font-semibold text-gray-900">
                    {product.name}
                  </h1>

                  <span className="text-sm text-gray-500">
                    ({product.code})
                  </span>

                  <span
                    className={`ml-1 rounded-full px-3 py-0.5 text-xs font-medium text-white ${
                      product.status === "Active"
                        ? "bg-teal-600"
                        : "bg-gray-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              }
              right={
                <div className="flex items-center gap-3">
                  <ReusableButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => openProductDialog("edit-group")}
                    icon={<Edit className="h-3.5 w-3.5" />}
                  >
                    Edit Name
                  </ReusableButton>

                  <ReusableButton
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={handleDeleteProduct}
                    icon={<Trash2 className="h-3.5 w-3.5" />}
                  >
                    Delete
                  </ReusableButton>
                </div>
              }
            />

            {/* Product Details - Single Container */}
            <Container type="box" background="surface-default">
              {/* Items */}
              <section>
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-800">
                    Items{" "}
                    <span className="text-green-600">
                      ({product.items.length})
                    </span>
                  </h2>

                  <button
                    type="button"
                    onClick={() => openProductDialog("add")}
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
                        <button
                          type="button"
                          onClick={() => openProductDialog("edit-item", item)}
                          aria-label={`Edit ${item.name}`}
                          className="rounded p-1 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

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
              <section className="mt-6 border-t border-gray-200 pt-5">
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
              <section className="mt-6 border-t border-gray-200 pt-5">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-800">
                    Search Tags
                  </h2>

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
            </Container>
          </div>
        )}
      </main>
    </Scrollable>
  );
};

export default FnBDetails;
