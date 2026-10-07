import { repo } from "./Repo copy";
import type { Item } from "./Repo copy";

type StateSnapshot = {
    data: Item[];
    searchTerm: string;
};

class StateHolder {

    private searchTerm = "";

    private listeners: (() => void)[] = [];

    private snapshot: StateSnapshot = {
        data: this.getData(),
        searchTerm: this.searchTerm,
    };

    constructor() {

        repo.subscribe(() => {
            this.updateSnapshot();
        });

    }

    getSnapshot() {
        return this.snapshot;
    }

    getData() {

        const search = this.searchTerm
            .trim()
            .toLowerCase();

        if (search.length === 0) {
            return repo.getData();
        }

        return repo.getFilteredData(search);
    }

    setSearch(searchTerm: string) {

        this.searchTerm = searchTerm;

        this.updateSnapshot();
    }

    addNewItem() {
        return repo.addNewItem();
    }

    updatePrice(id: number, price: number) {
        repo.updatePrice(id, price);
    }

    updateVariant(id: number, varient: string) {
        repo.updateVariant(id, varient);
    }

    toggleExclude(id: number) {
        repo.toggleExclude(id);
    }

    subscribe(listener: () => void) {

        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(
                (currentListener) =>
                    currentListener !== listener
            );
        };
    }

    private updateSnapshot() {

        this.snapshot = {
            data: this.getData(),
            searchTerm: this.searchTerm,
        };

        this.notify();
    }

    private notify() {
        // console.log(this.getData())

        this.listeners.forEach(
            (listener) => listener()
        );
    }
}

export const stateholder = new StateHolder();

export default StateHolder;