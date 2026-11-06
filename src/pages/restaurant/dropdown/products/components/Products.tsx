// author: shrajja

import FnBDetails from "./FnBDetails";
import { useProduct } from "../context/useProduct";

import MasterDetailView from "../../../../../component/MasterDetailView/MasterDetailView";
import type { ProductType } from "../../types/DropdownTypes";

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

  const getProductDetails = (selectedId: string) => {
    const product = data.find((item) => item.id === selectedId) ?? null;

    const variants = product ? getVariants(product.attributes) : [];

    return <FnBDetails product={product} variants={variants} />;
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
      headerChildren={null}
    />
  );
};

export default Products;
