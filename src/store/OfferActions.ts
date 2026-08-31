import { offerState } from "./OfferState";

class OfferActions {

    setSearch(search: string) {
        offerState.setSearchValue(search);
    }

    addOffer(name: string) {
        if (!name.trim()) {
            return;
        }

        offerState.addOfferValue(name);
    }
}

export const offerActions = new OfferActions();