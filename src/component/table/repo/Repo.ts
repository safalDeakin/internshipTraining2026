import { initialData } from "../data/data";


export type Item = {
    id: number;
    name: string;
    varient: string;
    itemcode: string;
    type: string;
    price: number;
    exclude: boolean;
    description: string;
}


class Repo {
    private data: Item[] = initialData;
    private searchTerm = "";
    private selectedItems: number[] = [1, 2];
    private newItemIds: number[] = [];
    private changedRowIds: number[] = []
    private searchType = "All"
    private listeners: (() => void)[] = [];

    private snapshot = {
        data: this.data,
        selectedItems: this.selectedItems,
        newItemIds: this.newItemIds,
        changedRowIds: this.changedRowIds,
        searchType: this.searchType,
    };

    getSnapshot() {
        return this.snapshot;
    }

    private updateSnapshot() {
        this.snapshot = {
            data: this.getFilteredData(),
            selectedItems: this.selectedItems,
            newItemIds: this.newItemIds,
            changedRowIds: this.changedRowIds,
            searchType: this.searchType,
        };
    }


    getData() {
        return this.data
    }

    getSearchTerm() {
        return this.searchTerm
    }

    getSelectedItems() {
        return this.selectedItems;
    }

    getNewItemIds() {
        return this.newItemIds;
    }

    getChangedRowIds() {
        return this.changedRowIds
    }


    getFilteredData() {
        const search = this.searchTerm.trim().toLowerCase()

        return this.data.filter((item) => {
            const matchesType =
                this.searchType === "All" ||
                item.type === this.searchType;

            const matchesSearch =
                !search ||
                item.name.toLowerCase().includes(search) ||
                item.varient.toLowerCase().includes(search) ||
                item.type.toLowerCase().includes(search)


            return matchesType && matchesSearch
        }
        )

    }

    search(searchTerm: string) {
        this.searchTerm = searchTerm
        this.notify()
    }


    searchByType(type: string) {
        this.searchType = type;
        this.notify();
    }

    

    addNewItem(newToTop: boolean) {
        const newId =
            this.data.length > 0
                ? Math.max(...this.data.map((item) => item.id)) + 1
                : 1;

        const newItem: Item = {
            id: newId,
            name: "Maza",
            varient: "Medium",
            itemcode: "#AF7899",
            type: "Beverage",
            price: 300,
            exclude: true,
            description: "Lorem ipsum...",
        };

        this.data = newToTop
            ? [newItem, ...this.data]
            : [...this.data, newItem]

        this.newItemIds = [
            ...this.newItemIds,
            newId
        ];

        this.notify();


        setTimeout(() => {
            this.newItemIds = this.newItemIds.filter(
                id => id !== newId
            );

            this.notify();
        }, 5000);
    }


    updatePrice(id: number, price: number) {
        this.data = this.data.map((item) =>
            item.id === id
                ? {
                    ...item,
                    price,
                }
                : item
        );

        this.notify();
    }


    




    subscribe(listener: () => void) {
        this.listeners.push(listener)
        return () => {
            this.listeners = this.listeners.filter(
                (currentListener) => currentListener !== listener
            );
        };
    }

    private notify() {
        this.updateSnapshot()
        this.listeners.forEach((listener) => listener())
    }


}

export const repo = new Repo()

export default Repo