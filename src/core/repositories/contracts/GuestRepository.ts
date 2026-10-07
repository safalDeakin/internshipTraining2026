import type {
    Guest,
    GuestInput,
    GuestUpdate,
} from "../../domain/guest";
import type { ObservableRepository } from "./ObservableRepository";

export interface GuestRepository extends ObservableRepository {
    getAll(): Promise<Guest[]>;

    getById(
        id: string
    ): Promise<Guest | null>;

    search(
        query: string
    ): Promise<Guest[]>;

    create(
        input: GuestInput
    ): Promise<Guest>;

    update(
        id: string,
        input: GuestUpdate
    ): Promise<Guest>;

    delete(
        id: string
    ): Promise<void>;

}