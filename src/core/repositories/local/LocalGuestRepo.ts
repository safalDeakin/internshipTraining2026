import type { Guest, GuestInput, GuestUpdate } from "../../domain/guest";
import type { GuestRepository } from "../contracts/GuestRepository";
import { LocalStore } from "./LocalStore";

export class LocalGuestRepo
    extends LocalStore
    implements GuestRepository {

    private guests: Guest[] = [];

    async getAll(): Promise<Guest[]> {
        return Promise.resolve([...this.guests]);
    }

    async getById(id: string): Promise<Guest | null> {
        const guest = this.guests.find((g) => g.id === id);
        return Promise.resolve(guest || null);
    }

    async search(query: string): Promise<Guest[]> {
        const lowerQuery = query.toLowerCase();
        const results = this.guests.filter((g) =>
            g.name.toLowerCase().includes(lowerQuery)
        );
        return Promise.resolve(results);
    }

    async create(input: GuestInput): Promise<Guest> {
        const guest: Guest = { ...input, id: Math.random().toString(36).substr(2, 9) };
        this.guests.push(guest);
        return Promise.resolve(guest);
    }

    async update(id: string, input: GuestUpdate): Promise<Guest> {
        const guestIndex = this.guests.findIndex((g) => g.id === id);
        if (guestIndex === -1) {
            throw new Error("Guest not found.");
        }
        this.guests[guestIndex] = { ...this.guests[guestIndex], ...input };
        return Promise.resolve(this.guests[guestIndex]);
    }

    async delete(id: string): Promise<void> {
        const guestIndex = this.guests.findIndex((g) => g.id === id);
        if (guestIndex === -1) {
            throw new Error("Guest not found.");
        }
        this.guests.splice(guestIndex, 1);
        return Promise.resolve();
    }

}