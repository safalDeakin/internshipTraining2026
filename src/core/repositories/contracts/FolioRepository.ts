import type {
    FolioItem,
    FolioItemInput,
} from "../../domain/folio";
import type { ObservableRepository } from "./ObservableRepository";

export interface FolioRepository extends ObservableRepository {
    getByReservationId(
        reservationId: string
    ): Promise<FolioItem[]>;

    addItem(
        reservationId: string,
        input: FolioItemInput
    ): Promise<FolioItem>;

    updateItem(
        itemId: string,
        input: Partial<FolioItemInput>
    ): Promise<FolioItem>;

    deleteItem(
        itemId: string
    ): Promise<void>;

}