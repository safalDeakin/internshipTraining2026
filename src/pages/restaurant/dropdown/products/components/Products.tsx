// author: shrajja

import FnBDetails from "./FnBDetails";
import { useProduct } from "../context/useProduct";

import MasterDetailView from "../../../../../lib/component/MasterDetailView/MasterDetailView";
import type { ProductType } from "../../types/DropdownTypes";
import { Plus } from "lucide-react";

import ProductFormModal, {
  type ProductFormData,
} from "../../../modal/dropdown/ProductFormModal";
import useDialogBox from "../../../../../lib/component/DialogueBox/useDialogueBox";

const getVariants = (attributes: string[][]) => {
  if (!attributes.length) return [];

  return attributes
    .reduce<
      string[][]
    >((combinations, group) => combinations.flatMap((combination) => group.map((value) => [...combination, value])), [[]])
    .map((combination) => combination.join(" x "));
};

const Products = () => {
  const { data, filteredProducts, loading, search, setSearch } = useProduct();

  const { showDialog, closeDialog } = useDialogBox();

  const getProductDetails = (selectedId: string) => {
    const product = data.find((item) => item.id === selectedId) ?? null;

    const variants = product ? getVariants(product.attributes) : [];

    return <FnBDetails product={product} variants={variants} />;
  };

  // Handle product submission
  const handleProductSubmit = (data: ProductFormData) => {
    console.log("Registered product:", data);

    // TODO: Call product registration context/API here.
  };

  // Open product registration dialog
  const handleAddProduct = async () => {
    const result = await showDialog<ProductFormData>({
      title: "Register Product",
      width: 550,
      showHeader: true,
      closeOnBackdrop: true,
      closeOnEscape: true,
      content: (
        <ProductFormModal
          title="Register Product"
          onClose={() => closeDialog()}
          onConfirm={(data) => closeDialog(data)}
        />
      ),
    });

    if (result) {
      handleProductSubmit(result);
    }
  };

  if (loading) {
    return <div className="p-5 text-sm text-gray-500">Loading products...</div>;
  }

  return (
    <MasterDetailView<ProductType, string>
      title="Products"
      items={filteredProducts}
      searchQuery={search}
      onSearchChange={setSearch}
      getId={(item) => item.id}
      listItemBuilder={(item) => <span>{item.name}</span>}
      detailContentBuilder={getProductDetails}
      headerChildren={
        <button
          type="button"
          onClick={handleAddProduct}
          className="p-2 rounded-md text-blue-600 border border-gray-300 hover:bg-gray-100"
          title="Add Products"
        >
          <Plus size={18} />
        </button>
      }
    />
  );
};

export default Products;
