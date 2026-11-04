import { useMemo, useState, type ReactNode } from "react";
import { OfferContext } from "./OfferContext";
import { useSubscription } from "../../../../../application/useSubscription";
import type { Offer } from "../data/initialOfferData";
import {
  OfferCmdService,
  OfferQueryService,
} from "../../../../../application/services";

interface OfferProviderProps {
  children: ReactNode;
}

const OfferProvider = ({ children }: OfferProviderProps) => {
  const { data, loading } = useSubscription<Offer, string>(OfferQueryService);
  console.log("Offer data:", data);
  console.log("Offer loading:", loading);
  const [search, setSearch] = useState("");

  const filteredOffers = useMemo(() => {
    return data.filter((offer) =>
      offer.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const addOffer = async (name: string): Promise<boolean> => {
    if (!name.trim()) return false;

    const newOffer: Offer = {
      id: Date.now(),
      name: name.trim(),
    };

    return OfferCmdService.create(newOffer);
  };

  const value = useMemo(
    () => ({
      data,
      filteredOffers,
      loading,
      search,
      setSearch,
      addOffer,
    }),
    [data, filteredOffers, loading, search],
  );

  return (
    <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
  );
};

export default OfferProvider;
