import PricelistProvider from "./context/PricelistProvider";
import Pricelist from "./Pricelist";

const PricelistRenderer = () => {
  return (
    <PricelistProvider>
      <Pricelist />
    </PricelistProvider>
  );
};

export default PricelistRenderer;
