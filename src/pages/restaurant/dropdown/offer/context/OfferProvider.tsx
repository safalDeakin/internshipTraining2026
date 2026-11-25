import { useMemo, useState, useCallback, type ReactNode } from "react";

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
  // 1. Retrieve offers from QueryService
  const { data, loading } = useSubscription<OfferType, string>(
    OfferQueryService,
  );

  // 2. Search state
  const [search, setSearch] = useState("");

  // 3. Filter offers
  const filteredOffers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return data;

    return data.filter(
      (offer) =>
        offer.name.toLowerCase().includes(query) ||
        offer.code.toLowerCase().includes(query),
    );
  }, [data, search]);

  // 4. Add complete offer
  const addOffer = useCallback(
    async (offer: Omit<OfferType, "id">): Promise<boolean> => {
      if (!offer.name.trim() || !offer.code.trim()) {
        return false;
      }

      const newOffer: OfferType = {
        ...offer,
        id: Date.now(),
      };

      // Save through CommandService
      return await OfferCmdService.create(newOffer);
    },
    [],
  );

  // 5. Context value
  const value = useMemo(
    () => ({
      data,
      filteredOffers,
      loading,
      search,
      setSearch,
      addOffer,
    }),
    [data, filteredOffers, loading, search, addOffer],
  );

  return (
    <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
  );
};

export default OfferProvider;
