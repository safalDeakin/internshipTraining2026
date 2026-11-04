import { useMemo, useState, type ReactNode } from "react";
import { ProductContext } from "./ProductContext";
import type { ProductGroup } from "../data/initialProductData";
import { useSubscription } from "../../../../../application/useSubscription";
import { ProductQueryService } from "../../../../../application/services";

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider = ({ children }: ProductProviderProps) => {
  const { data, loading } = useSubscription<ProductGroup, string>(
    ProductQueryService,
  );

  const [search, setSearch] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("1");

  const filteredProducts = useMemo(
    () =>
      data.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [data, search],
  );

  const value = useMemo(
    () => ({
      data,
      filteredProducts,
      loading,
      search,
      setSearch,
      selectedProductId,
      setSelectedProductId,
    }),
    [data, filteredProducts, loading, search, selectedProductId],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
