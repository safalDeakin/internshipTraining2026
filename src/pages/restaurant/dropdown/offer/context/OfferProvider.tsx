import { useMemo, useState, type ReactNode } from "react";
import { OfferContext } from "./OfferContext";
import { useSubscription } from "../../../../../application/useSubscription";
import {
  OfferCmdService,
  OfferQueryService,
} from "../../../../../application/services";
import type { OfferType } from "../../types/DropdownTypes";

interface OfferProviderProps {
  children: ReactNode;
}

const OfferProvider = ({ children }: OfferProviderProps) => {
  //Reads or retrieves data.
  const { data, loading } = useSubscription<OfferType, string>(
    OfferQueryService,
  );

  const [search, setSearch] = useState("");

  const filteredOffers = useMemo(() => {
    return data.filter((offer) =>
      offer.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const addOffer = async (name: string): Promise<boolean> => {
    if (!name.trim()) return false;
    const newOffer: OfferType = {
      id: Date.now(),
      name: name.trim(),
    };
    //Changes or creates data.
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
