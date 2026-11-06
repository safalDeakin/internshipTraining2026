import OfferLayout from "./components/OfferLayout";
import OfferProvider from "./context/OfferProvider";

const OfferRenderer = () => {
  return (
    <OfferProvider>
      <OfferLayout />
    </OfferProvider>
  );
};

export default OfferRenderer;
