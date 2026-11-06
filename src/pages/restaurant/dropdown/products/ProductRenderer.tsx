import Products from "./components/Products";
import ProductProvider from "./context/ProductProvider";

const ProductRenderer = () => {
  return (
    <ProductProvider>
      <Products />
    </ProductProvider>
  );
};

export default ProductRenderer;
