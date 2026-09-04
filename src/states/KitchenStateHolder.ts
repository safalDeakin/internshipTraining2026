import { Repo } from "../repo/Repo";

export class KitchenStateHolder {
    private repo: Repo;

    private listeners = new Set<() => void>();

    private unsubscribeRepo: () => void;

    private search = "";

    private selectedOrderId: string | null = null;

    private snapshot = {
        kitchenOrders: [] as ReturnType<Repo["getKitchenOrders"]>,
        search: "",
        selectedOrderId: null as string | null,
    };

    constructor(repo: Repo) {
        this.repo = repo;

        this.snapshot = {
            kitchenOrders: this.repo.getKitchenOrders(),
            search: this.search,
            selectedOrderId: this.selectedOrderId,
        };

        this.unsubscribeRepo = this.repo.subscribeKitchen(
            this.handleRepoChange
        );
    }

    private handleRepoChange = () => {
        this.updateSnapshot();
        this.notify();
    };

    private updateSnapshot() {
        this.snapshot = {
            kitchenOrders: this.repo.getKitchenOrders(),
            search: this.search,
            selectedOrderId: this.selectedOrderId,
        };
    }

    getSnapshot = () => {
        return this.snapshot;
    };

    setSearch(search: string) {
        this.search = search;

        this.updateSnapshot();
        this.notify();
    }

    selectOrder(id: string) {
        this.selectedOrderId = id;

        this.updateSnapshot();
        this.notify();
    }

    subscribe = (listener: () => void) => {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    };

    private notify() {
        this.listeners.forEach(listener => {
            listener();
        });
    }

    dispose() {
        this.unsubscribeRepo();
        this.listeners.clear();
    }
}