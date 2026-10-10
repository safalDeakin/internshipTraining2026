import type { RoomFilters, RoomStatusSnapshot } from "../model/roomStatusTypes";
import { RoomStatusRepository } from "../repositories/RoomStatusRepository";

const defaultFilters: RoomFilters = {
    floor: "All",
    roomType: "All",
    status: "All",
    search: "",
};

export class RoomStatusStateholder {
    private listeners = new Set<() => void>();
    private allRooms;
    private snapshot: RoomStatusSnapshot;

    constructor(repository: RoomStatusRepository) {
        this.allRooms = repository.getRooms();
        this.snapshot = {
            rooms: this.allRooms,
            summaries: repository.getStatusSummaries(),
            filters: defaultFilters,
            selectedRoomIds: new Set(),
        };
    }

    getSnapshot = () => this.snapshot;

    subscribe = (listener: () => void) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    setFilter = (name: keyof RoomFilters, value: string) => {
        const filters = { ...this.snapshot.filters, [name]: value };
        const query = filters.search.trim().toLowerCase();
        const rooms = this.allRooms.filter((room) => {
            return (
                (filters.floor === "All" || room.floor === Number(filters.floor)) &&
                (filters.roomType === "All" || room.type === filters.roomType) &&
                (filters.status === "All" || room.status === filters.status) &&
                (!query ||
                    room.number.toLowerCase().includes(query) ||
                    room.guestOrReservation.toLowerCase().includes(query))
            );
        });
        this.update({ ...this.snapshot, filters, rooms });
    };

    toggleRoom = (roomId: number) => {
        const selectedRoomIds = new Set(this.snapshot.selectedRoomIds);
        selectedRoomIds.has(roomId) ? selectedRoomIds.delete(roomId) : selectedRoomIds.add(roomId);
        this.update({ ...this.snapshot, selectedRoomIds });
    };

    toggleAll = () => {
        const everyVisibleRoomSelected =
            this.snapshot.rooms.length > 0 &&
            this.snapshot.rooms.every((room) => this.snapshot.selectedRoomIds.has(room.id));
        const selectedRoomIds = new Set(this.snapshot.selectedRoomIds);
        this.snapshot.rooms.forEach((room) => {
            everyVisibleRoomSelected ? selectedRoomIds.delete(room.id) : selectedRoomIds.add(room.id);
        });
        this.update({ ...this.snapshot, selectedRoomIds });
    };

    clearSelection = () => {
        this.update({ ...this.snapshot, selectedRoomIds: new Set() });
    };

    private update(snapshot: RoomStatusSnapshot) {
        this.snapshot = snapshot;
        this.listeners.forEach((listener) => listener());
    }
}
