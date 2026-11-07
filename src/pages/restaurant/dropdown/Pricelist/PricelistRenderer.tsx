import PricelistProvider from "./context/PricelistProvider";
import PricelistLayout from "./components/PricelistLayout";

const PricelistRenderer = () => {
  return (
    <PricelistProvider>
      <PricelistLayout />
    </PricelistProvider>
  );
};

export default PricelistRenderer;
