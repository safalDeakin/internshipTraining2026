import type {
    Reservation,
    ReservationInput,
    ReservationUpdate,
    ReservationFilter,
} from "../../domain/reservation";

import type { ReservationRepository } from "../contracts/ReservationRepository";

import { LocalStore } from "./LocalStore";

export class LocalReservationRepo
    extends LocalStore
    implements ReservationRepository
{
    private reservations: Reservation[] = [];

    async getAll(
        filter?: ReservationFilter
    ): Promise<Reservation[]> {
        let result = [...this.reservations];

        if (filter?.status) {
            result = result.filter(
                (reservation) =>
                    reservation.status === filter.status
            );
        }

        if (filter?.source) {
            result = result.filter(
                (reservation) =>
                    reservation.source === filter.source
            );
        }

        if (filter?.roomId) {
            result = result.filter(
                (reservation) =>
                    reservation.room.id === filter.roomId
            );
        }

        if (filter?.roomType) {
            result = result.filter(
                (reservation) =>
                    reservation.room.type === filter.roomType
            );
        }

        if (filter?.guestId) {
            result = result.filter(
                (reservation) =>
                    reservation.guest.id === filter.guestId
            );
        }

        if (filter?.search) {
            const search = filter.search.toLowerCase();

            result = result.filter(
                (reservation) =>
                    reservation.guest.name
                        .toLowerCase()
                        .includes(search) ||
                    reservation.reservationNumber
                        .toLowerCase()
                        .includes(search)
            );
        }

        return result;
    }

    async getById(
        id: string
    ): Promise<Reservation | null> {
        return (
            this.reservations.find(
                (reservation) => reservation.id === id
            ) ?? null
        );
    }

    async create(
        input: ReservationInput
    ): Promise<Reservation> {
        // Build the entity.
        // In a real app this may involve resolving
        // guest/room references.

        throw new Error(
            "create() not implemented yet"
        );
    }

    async update(
        id: string,
        input: ReservationUpdate
    ): Promise<Reservation> {
        const existing = await this.getById(id);

        if (!existing) {
            throw new Error(
                `Reservation ${id} not found`
            );
        }

        const updated: Reservation = {
            ...existing,
            ...input,
        };

        this.reservations = this.reservations.map(
            (reservation) =>
                reservation.id === id
                    ? updated
                    : reservation
        );

        this.notify();

        return updated;
    }

    async delete(id: string): Promise<void> {
        const exists = await this.getById(id);

        if (!exists) {
            throw new Error(
                `Reservation ${id} not found`
            );
        }

        this.reservations = this.reservations.filter(
            (reservation) => reservation.id !== id
        );

        this.notify();
    }

    async cancel(
        id: string,
        reason?: string
    ): Promise<Reservation> {
        const existing = await this.getById(id);

        if (!existing) {
            throw new Error(
                `Reservation ${id} not found`
            );
        }

        const updated: Reservation = {
            ...existing,
            status: "Cancelled",
            notes: reason
                ? `${existing.notes}\nCancellation: ${reason}`
                : existing.notes,
        };

        this.reservations = this.reservations.map(
            (reservation) =>
                reservation.id === id
                    ? updated
                    : reservation
        );

        this.notify();

        return updated;
    }

    async checkIn(
        id: string
    ): Promise<Reservation> {
        return this.setStatus(id, "Checked In");
    }

    async checkOut(
        id: string
    ): Promise<Reservation> {
        return this.setStatus(id, "Checked Out");
    }

    private async setStatus(
        id: string,
        status: Reservation["status"]
    ): Promise<Reservation> {
        const existing = await this.getById(id);

        if (!existing) {
            throw new Error(
                `Reservation ${id} not found`
            );
        }

        const updated = {
            ...existing,
            status,
        };

        this.reservations = this.reservations.map(
            (reservation) =>
                reservation.id === id
                    ? updated
                    : reservation
        );

        this.notify();

        return updated;
    }

    replaceAll(reservations: Reservation[]) {
        this.reservations = [...reservations];
        this.notify();
    }
}