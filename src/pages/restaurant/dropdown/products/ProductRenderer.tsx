import ProductProvider from "./context/ProductProvider";
import Products from "./Products";

const ProductRenderer = () => {
  return (
    <ProductProvider>
      <Products />
    </ProductProvider>
  );
};

export default ProductRenderer;
