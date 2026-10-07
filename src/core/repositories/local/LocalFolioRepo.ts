import { LocalStore } from "./LocalStore";

import type { FolioRepository } from "../contracts/FolioRepository";
import type { FolioItem, FolioItemInput, FolioItemUpdate } from "../../domain/folio";

export class LocalFolioRepo
    extends LocalStore
    implements FolioRepository {
    private folios: FolioItem[] = [];


    async getByReservationId(reservationId: string): Promise<FolioItem[]> {
        return this.folios.filter((folio) => folio.reservationId === reservationId);
    }

    async addItem(reservationId:string, input: FolioItemInput): Promise<FolioItem> {
        const newFolio: FolioItem = {
            id: Date.now().toString(),
            reservationId,
            ...input,
        };

        this.folios = [...this.folios, newFolio];
        this.notify();

        return newFolio;
    }

    async updateItem(itemId: string, input: FolioItemUpdate): Promise<FolioItem> {
        const folioIndex = this.folios.findIndex((f) => f.id === itemId);
        if (folioIndex === -1) {
            throw new Error("Folio not found");
        }

        this.folios[folioIndex] = { ...this.folios[folioIndex], ...input };
        this.notify();

        return this.folios[folioIndex];
    }

    async deleteItem(itemId: string): Promise<void> {
        this.folios = this.folios.filter((f) => f.id !== itemId);
        this.notify();
    }
}