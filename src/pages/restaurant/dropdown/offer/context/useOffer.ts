import { useContext } from "react";
import { OfferContext } from "./OfferContext";

export const useOffer = () => {
  const context = useContext(OfferContext);

  if (!context) {
    throw new Error("useOffer must be used inside OfferProvider");
  }

  return context;
};
