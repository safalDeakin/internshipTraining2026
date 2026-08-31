import { offerState } from "./OfferState";

class OfferActions {

    setSearch(search: string) {
        const offers = offerState.getOffers();
        offerState.updateState(offers, search);
    }

    addOffer(name: string) {
        if (!name.trim()) {
            return;
        }

        const offers = offerState.getOffers()

        const newOffer = {
            id: offers.length + 1,
            name
        }

        offerState.updateState(
            [...offers, newOffer], offerState.getSearch()
        )
    }
}

export const offerActions = new OfferActions();