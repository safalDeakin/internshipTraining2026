import { initialData } from "../data/data";

export type Offer = {
    id: number;
    name: string;
}

class OfferState {
    private offers: any[] = initialData;
    private search = "";

    private listeners: (() => void)[] = [];

    private snapshot = {
        filteredOffers: this.offers,
    };


    getSnapshot() {
        return this.snapshot;
    }

    setSearchValue(search: string) {
        this.search = search;

        this.updateSnapshot();
        this.notify();
    }

    addOfferValue(name: string) {
        const newOffer = {
            id: this.offers.length + 1,
            name,
        };

        this.offers = [
            ...this.offers,
            newOffer,
        ];

        this.updateSnapshot();
        this.notify();
    }

    private updateSnapshot() {
        this.snapshot = {
            filteredOffers: this.offers.filter((offer) =>
                offer.name
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
            ),
        };
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