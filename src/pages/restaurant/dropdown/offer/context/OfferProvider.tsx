import { useMemo, useState, useCallback, type ReactNode } from "react";

import { OfferContext } from "./OfferContext";

import { useSubscription } from "../../../../../application/useSubscription";

import {
  OfferCmdService,
  OfferQueryService,
} from "../../../../../application/services";

import type { OfferType, ApplicableOfferItem } from "../../types/DropdownTypes";

interface OfferProviderProps {
  children: ReactNode;
}

const OfferProvider = ({ children }: OfferProviderProps) => {
  // Subscribe to offer repository
  const { data, loading } = useSubscription<OfferType, string>(
    OfferQueryService,
  );

  const [search, setSearch] = useState("");

  // Filter offers by name or code
  const filteredOffers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return data;

    return data.filter((offer) => {
      const nameMatches = offer.name.toLowerCase().includes(query);
      const codeMatches = offer.code?.toLowerCase().includes(query);

      return nameMatches || codeMatches;
    });
  }, [data, search]);

  // Create a new offer
  const addOffer = useCallback(async (name: string): Promise<boolean> => {
    const trimmedName = name.trim();

    if (!trimmedName) return false;

    const newOffer: OfferType = {
      id: Date.now(),
      name: trimmedName,
      applicableItems: [],
    };

    return OfferCmdService.create(newOffer);
  }, []);

  // Update an existing offer
  const updateOffer = useCallback(
    async (offer: OfferType): Promise<boolean> => {
      if (!offer.name.trim()) return false;

      return OfferCmdService.update(String(offer.id), offer);
    },
    [],
  );

  // Add applicable items to an existing offer
  const addApplicableItems = useCallback(
    async (offerId: number, items: ApplicableOfferItem[]): Promise<boolean> => {
      const existingOffer = data.find((offer) => offer.id === offerId);

      if (!existingOffer || items.length === 0) {
        return false;
      }

      const existingItems = existingOffer.applicableItems ?? [];

      // Prevent duplicate products
      const existingProductIds = new Set(
        existingItems.map((item) => item.productId),
      );

      const newItems = items.filter(
        (item) => !existingProductIds.has(item.productId),
      );

      if (newItems.length === 0) {
        return false;
      }

      const updatedItems: ApplicableOfferItem[] = [
        ...existingItems,
        ...newItems,
      ];

      return OfferCmdService.update(String(offerId), {
        applicableItems: updatedItems,
      });
    },
    [data],
  );

  // Context value
  const value = useMemo(
    () => ({
      data,
      filteredOffers,
      loading,
      search,
      setSearch,
      addOffer,
      updateOffer,
      addApplicableItems,
    }),
    [
      data,
      filteredOffers,
      loading,
      search,
      addOffer,
      updateOffer,
      addApplicableItems,
    ],
  );

  return (
    <OfferContext.Provider value={value}>{children}</OfferContext.Provider>
  );
};

export default OfferProvider;
