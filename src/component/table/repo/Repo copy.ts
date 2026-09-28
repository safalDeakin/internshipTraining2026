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
    createdAt: number;
}

class Repo {
    private data: Item[] = initialData;
    private listeners: (() => void)[] = [];

    getData() {
        return [...this.data].sort(
            (a, b) => b.createdAt - a.createdAt
        );
    }


    getFilteredData(searchTerm: string) {
        const search = searchTerm.trim().toLowerCase()

        return this.data.filter((item) =>
            item.name.toLowerCase().includes(search) ||
            item.varient.toLowerCase().includes(search) ||
            item.type.toLowerCase().includes(search)
        )

    }

    addNewItem() {
        const id = this.data.length + 1
        const now = Date.now()
        const newItem: Item = {
            id: id,
            name: "Maza",
            varient: "Medium",
            itemcode: "#AF7899",
            type: "Beverage",
            price: 300,
            exclude: true,
            description: "Lorem ipsum...",
            createdAt: now
        };

        this.data = [...this.data, newItem].sort(
            (a, b) => b.createdAt - a.createdAt
        );


        this.notify();

        return newItem.id;
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


    updateVariant(id: number, varient: string) {

        this.data = this.data.map((item) =>
            item.id === id
                ? {
                    ...item,
                    varient,
                }
                : item
        );

        this.notify();
    }

    toggleExclude(id: number) {

        this.data = this.data.map((item) =>
            item.id === id
                ? {
                    ...item,
                    exclude: !item.exclude,
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
        this.listeners.forEach((listener) => listener())
    }


}

export const repo = new Repo()

export default Repo