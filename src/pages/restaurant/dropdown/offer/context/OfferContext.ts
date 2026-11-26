import { createContext } from "react";

import type { OfferType, ApplicableOfferItem } from "../../types/DropdownTypes";

export interface OfferContextType {
  data: OfferType[];
  filteredOffers: OfferType[];
  loading: boolean;

  search: string;
  setSearch: (search: string) => void;

  addOffer: (name: string) => Promise<boolean>;
  updateOffer: (offer: OfferType) => Promise<boolean>;

  addApplicableItems: (
    offerId: number,
    items: ApplicableOfferItem[],
  ) => Promise<boolean>;
}

export const OfferContext = createContext<OfferContextType | null>(null);
