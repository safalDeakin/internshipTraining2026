import PricelistProvider from "./context/PricelistProvider";
import Pricelist from "./components/Pricelist";

const PricelistRenderer = () => {
  return (
    <PricelistProvider>
      <Pricelist />
    </PricelistProvider>
  );
};

export default PricelistRenderer;
