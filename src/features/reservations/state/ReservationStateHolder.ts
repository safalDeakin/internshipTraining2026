import type {
    Reservation,
    ReservationUpdate,
} from "../../../core/domain/reservation";

import type { QueryService } from "../../../core/services/QueryService";
import type { CommandService } from "../../../core/services/CommandService";

export type ReservationStateSnapshot = {
    reservations: Reservation[];
    filteredReservations: Reservation[];

    selectedReservationId: string | null;
    selectedReservation: Reservation | null;

    search: string;

    loading: boolean;
    error: string | null;
};

export class ReservationStateHolder {
    private readonly queryService: QueryService;
    private readonly commandService: CommandService;

    private listeners = new Set<() => void>();

    private unsubscribeReservations: () => void;

    // =========================================================
    // STATE
    // =========================================================

    private reservations: Reservation[] = [];

    private selectedReservationId: string | null = null;

    private search = "";

    private loading = false;

    private error: string | null = null;

    // =========================================================
    // SNAPSHOT
    // =========================================================

    private snapshot: ReservationStateSnapshot = {
        reservations: [],
        filteredReservations: [],

        selectedReservationId: null,
        selectedReservation: null,

        search: "",

        loading: false,
        error: null,
    };

    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    constructor(
        queryService: QueryService,
        commandService: CommandService
    ) {
        this.queryService = queryService;
        this.commandService = commandService;

        this.unsubscribeReservations =
            this.queryService.subscribeReservations(
                this.handleRepositoryChange
            );

        // Initial data load
        void this.loadReservations();
    }

    // =========================================================
    // REPOSITORY CHANGE
    // =========================================================

    private handleRepositoryChange = () => {
        void this.refreshReservations();
    };

    // =========================================================
    // SNAPSHOT
    // =========================================================

    getSnapshot = (): ReservationStateSnapshot => {
        return this.snapshot;
    };

    private buildSnapshot(): ReservationStateSnapshot {
        const query = this.search
            .trim()
            .toLowerCase();

        const filteredReservations = query
            ? this.reservations.filter(
                  (reservation) =>
                      reservation.guest.name
                          .toLowerCase()
                          .includes(query) ||
                      reservation.reservationNumber
                          .toLowerCase()
                          .includes(query) ||
                      reservation.room.number
                          .toLowerCase()
                          .includes(query)
              )
            : [...this.reservations];

        const selectedReservation =
            this.reservations.find(
                (reservation) =>
                    reservation.id ===
                    this.selectedReservationId
            ) ?? this.reservations[0] ?? null;

        const selectedReservationId =
            selectedReservation?.id ?? null;

        return {
            reservations: [...this.reservations],

            filteredReservations,

            selectedReservationId,

            selectedReservation,

            search: this.search,

            loading: this.loading,

            error: this.error,
        };
    }

    // =========================================================
    // COMMIT
    // =========================================================

    private commit() {
        this.snapshot = this.buildSnapshot();
        this.notify();
    }

    // =========================================================
    // SUBSCRIBE
    // =========================================================

    subscribe = (
        listener: () => void
    ): (() => void) => {
        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    };

    private notify() {
        this.listeners.forEach(
            (listener) => listener()
        );
    }

    // =========================================================
    // INITIAL / FULL LOAD
    // =========================================================

    async loadReservations() {
        this.loading = true;
        this.error = null;

        this.commit();

        try {
            const reservations =
                await this.queryService.getReservations();

            this.reservations = reservations;

            // Make sure current selection is valid.
            this.ensureValidSelection();

            this.error = null;
        } catch (error) {
            this.error =
                error instanceof Error
                    ? error.message
                    : "Failed to load reservations";
        } finally {
            this.loading = false;
            this.commit();
        }
    }

    // =========================================================
    // REFRESH AFTER REPOSITORY CHANGE
    // =========================================================

    private async refreshReservations() {
        try {
            const reservations =
                await this.queryService.getReservations();

            this.reservations = reservations;

            this.ensureValidSelection();

            this.error = null;

            this.commit();
        } catch (error) {
            this.error =
                error instanceof Error
                    ? error.message
                    : "Failed to refresh reservations";

            this.commit();
        }
    }

    // =========================================================
    // KEEP SELECTED RESERVATION VALID
    // =========================================================

    private ensureValidSelection() {
        const stillExists =
            this.selectedReservationId
                ? this.reservations.some(
                      (reservation) =>
                          reservation.id ===
                          this.selectedReservationId
                  )
                : false;

        if (!stillExists) {
            this.selectedReservationId =
                this.reservations[0]?.id ?? null;
        }
    }

    // =========================================================
    // SEARCH
    // =========================================================

    setSearch(search: string) {
        this.search = search;

        this.commit();
    }

    // =========================================================
    // SELECTION
    // =========================================================

    selectReservation(id: string) {
        const exists = this.reservations.some(
            (reservation) =>
                reservation.id === id
        );

        if (!exists) {
            return;
        }

        this.selectedReservationId = id;

        this.commit();
    }

    clearSelectedReservation() {
        this.selectedReservationId = null;

        this.commit();
    }

    // =========================================================
    // RESERVATION COMMANDS
    // =========================================================

    async updateReservation(
        id: string,
        input: ReservationUpdate
    ) {
        return this.commandService.updateReservation(
            id,
            input
        );
    }

    async deleteReservation(id: string) {
        await this.commandService.deleteReservation(
            id
        );
    }

    async cancelReservation(
        id: string,
        reason?: string
    ) {
        return this.commandService.cancelReservation(
            id,
            reason
        );
    }

    async checkInReservation(id: string) {
        return this.commandService.checkInReservation(
            id
        );
    }

    async checkOutReservation(id: string) {
        return this.commandService.checkOutReservation(
            id
        );
    }

    // =========================================================
    // CLEANUP
    // =========================================================

    destroy() {
        this.unsubscribeReservations();
        this.listeners.clear();
    }
}