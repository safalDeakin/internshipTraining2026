import { Repo } from "../repo/Repo";

export class ReservationStateHolder {
    private repo: Repo;

    private listeners = new Set<() => void>();

    private unsubscribeRepo: () => void;

    private search = "";

    private selectedReservationId: string | null = null;

    private snapshot = {
        reservations: [] as ReturnType<Repo["getReservations"]>,
        search: "",
        selectedReservationId: null as string | null,
    };

    constructor(repo: Repo) {
        this.repo = repo;

        this.snapshot = {
            reservations: this.repo.getReservations(),
            search: this.search,
            selectedReservationId:
                this.selectedReservationId,
        };

        this.unsubscribeRepo =
            this.repo.subscribeReservations(
                this.handleRepoChange
            );
    }

    private handleRepoChange = () => {
        this.updateSnapshot();
        this.notify();
    };

    private updateSnapshot() {
        this.snapshot = {
            reservations: this.repo.getReservations(),
            search: this.search,
            selectedReservationId:
                this.selectedReservationId,
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

    selectReservation(id: string) {
        this.selectedReservationId = id;

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