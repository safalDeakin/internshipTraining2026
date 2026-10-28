export type RoomStatus =
    | "Reserved"
    | "Vacant"
    | "Dirty"
    | "Clean"
    | "Blocked"
    | "Maintenance"
    | "Out of Service";

export interface Room {
    id: number;
    number: string;
    type: "Deluxe" | "Standard" | "Suite";
    floor: number;
    guestOrReservation: string;
    status: RoomStatus;
    remarks: string;
    lastUpdated: string;
}

export interface StatusSummary {
    label: RoomStatus | "Occupied";
    value: number;
    tone: "blue" | "lavender" | "purple" | "indigo" | "red" | "pink";
}

export interface RoomFilters {
    floor: string;
    roomType: string;
    status: string;
    search: string;
}

export interface RoomStatusSnapshot {
    rooms: Room[];
    summaries: StatusSummary[];
    filters: RoomFilters;
    selectedRoomIds: Set<number>;
}
