import type {
    Room,
    RoomInput,
    RoomUpdate,
} from "../../domain/room";
import type { ObservableRepository } from "./ObservableRepository";

export interface RoomRepository extends ObservableRepository {
    getAll(): Promise<Room[]>;

    getById(
        id: string
    ): Promise<Room | null>;

    create(
        input: RoomInput
    ): Promise<Room>;

    update(
        id: string,
        input: RoomUpdate
    ): Promise<Room>;

    delete(
        id: string
    ): Promise<void>;

    getAvailableRooms(
        from: string,
        to: string
    ): Promise<Room[]>;

}