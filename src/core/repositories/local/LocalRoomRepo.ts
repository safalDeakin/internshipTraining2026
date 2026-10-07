import type { Room, RoomInput, RoomUpdate } from "../../domain/room";
import type { RoomRepository } from "../contracts/RoomRepository";
import { LocalStore } from "./LocalStore";

export class LocalRoomRepo
    extends LocalStore
    implements RoomRepository {
    private rooms: Room[] = [];

    async getAll(): Promise<Room[]> {
        return [...this.rooms];
    }

    async getById(
        id: string
    ): Promise<Room | null> {
        return (
            this.rooms.find(
                (room) => room.id === id
            ) ?? null
        );
    }

    async create(
        input: RoomInput
    ): Promise<Room> {
        // create room locally
    }

    async update(
        id: string,
        input: RoomUpdate
    ): Promise<Room> {
        // update room locally
    }

    async delete(id: string): Promise<void> {
        // delete room locally
    }

    async getAvailableRooms(
        from: string,
        to: string
    ): Promise<Room[]> {
        // local availability logic
    }
}