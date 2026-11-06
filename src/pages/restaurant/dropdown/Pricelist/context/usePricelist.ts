import { useContext } from "react";
import { PricelistContext } from "./PricelistContext";

const usePricelist = () => {
  const context = useContext(PricelistContext);

  if (!context) {
    throw new Error("usePricelist must be used inside PricelistProvider");
  }

  return context;
};

export default usePricelist;
