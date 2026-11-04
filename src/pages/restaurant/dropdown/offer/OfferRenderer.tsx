import Offer from "./components/Offer";
import OfferProvider from "./context/OfferProvider";

const OfferRenderer = () => {
  return (
    <OfferProvider>
      <Offer />
    </OfferProvider>
  );
};

export default OfferRenderer;
