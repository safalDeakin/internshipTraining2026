import { createContext } from "react";

import type { OfferType } from "../../types/DropdownTypes";

export interface OfferContextType {
  // All offers
  data: OfferType[];

  // Search-filtered offers
  filteredOffers: OfferType[];

  // Loading state
  loading: boolean;

  // Search
  search: string;
  setSearch: (search: string) => void;

  // Add a complete offer
  addOffer: (offer: Omit<OfferType, "id">) => Promise<boolean>;
}

export const OfferContext = createContext<OfferContextType | null>(null);
