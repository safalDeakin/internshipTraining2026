import type { Repo } from '../repo/Repo';
import type { Reservation } from '../types';

type Snapshot = {
    reservations: Reservation[];
    filteredReservations: Reservation[];
    selectedReservationId: string;
    selectedReservation: Reservation;
    search: string;
};

export class ReservationStateHolder {
    private repo: Repo;
    private listeners = new Set<() => void>();
    private unsubscribeRepo: () => void;

    private search = '';
    private selectedReservationId: string;
    private snapshot: Snapshot;

    constructor(repo: Repo) {
        this.repo = repo;
        const reservations = repo.getReservations();
        this.selectedReservationId = reservations[0]?.id ?? '';
        this.snapshot = this.buildSnapshot();
        this.unsubscribeRepo = repo.subscribe(this.handleRepoChange);
    }

    private handleRepoChange = () => {
        this.snapshot = this.buildSnapshot();
        this.notify();
    };

    private buildSnapshot(): Snapshot {
        const reservations = this.repo.getReservations();
        const q = this.search.toLowerCase().trim();
        const filteredReservations = q
            ? reservations.filter(
                (r) =>
                    r.guest.name.toLowerCase().includes(q) ||
                    r.reservationNumber.toLowerCase().includes(q) ||
                    r.roomCode.toLowerCase().includes(q)
            )
            : reservations;

        // Ensure selected id still valid after update
        const selected =
            reservations.find((r) => r.id === this.selectedReservationId) ?? reservations[0];

        return {
            reservations,
            filteredReservations,
            selectedReservationId: selected?.id ?? '',
            selectedReservation: selected,
            search: this.search,
        };
    }

    getSnapshot = (): Snapshot => this.snapshot;

    subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    private notify() {
        this.listeners.forEach((l) => l());
    }

    setSearch(search: string) {
        this.search = search;
        this.snapshot = this.buildSnapshot();
        this.notify();
    }

    selectReservation(id: string) {
        this.selectedReservationId = id;
        this.snapshot = this.buildSnapshot();
        this.notify();
    }

    dispose() {
        this.unsubscribeRepo();
        this.listeners.clear();
    }
}
