import Scrollable from "../../../../lib/component/scrollable/Scrollable";
import OfferLayout from "./components/OfferLayout";
import OfferProvider from "./context/OfferProvider";

const OfferRenderer = () => {
  return (
    <OfferProvider>
      <Scrollable direction="y">
        <OfferLayout />
      </Scrollable>
    </OfferProvider>
  );
};

export default OfferRenderer;
