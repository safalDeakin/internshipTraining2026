import { initialData } from "../data/data";

export type Offer = {
    id: number;
    name: string;
}

class OfferState {
    private offers: Offer[] = initialData;
    private search = "";

    private listeners: (() => void)[] = [];

    private snapshot = {
        filteredOffers: this.offers,
    };


    getSnapshot() {
        return this.snapshot;
    }

    getOffers() {
        return [...this.offers]
    }

    getSearch() {
        return this.search
    }

    updateState(offer: Offer[], search: string) {
        this.offers = offer;
        this.search = search

        this.snapshot = {
            filteredOffers: this.offers.filter((offer) =>
                offer.name.toLowerCase().includes(this.search.toLowerCase()))
        }

        this.notify()
    }

    subscribe(listener: () => void) {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(
                (item) => item !== listener
            );
        };
    }

    private notify() {
        this.listeners.forEach((listener) => listener());
    }
}

export const offerState = new OfferState();