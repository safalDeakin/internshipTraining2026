import { useSyncExternalStore } from "react";
import { offerState } from "../store/OfferState";
import { offerActions } from "../store/OfferActions";

export const useOffer = () => {
  const state = useSyncExternalStore(
    (listener) => offerState.subscribe(listener),
    () => offerState.getSnapshot(),
  );

  return {
    filteredOffers: state.filteredOffers,
    setSearch: offerActions.setSearch.bind(offerActions),
    addOffer: offerActions.addOffer.bind(offerActions),
  };
};
