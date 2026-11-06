import PricelistProvider from "./context/PricelistProvider";
import Pricelist from "./components/PricelistLayout";

const PricelistRenderer = () => {
  return (
    <PricelistProvider>
      <Pricelist />
    </PricelistProvider>
  );
};

export default PricelistRenderer;
