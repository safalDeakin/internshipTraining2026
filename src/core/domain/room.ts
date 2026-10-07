export type RoomStatus =
    | "Available"
    | "Reserved"
    | "Occupied"
    | "Out of Service";

export interface Room {
    id: string;

    number: string;
    type: string;
    floor: string;

    bedType: string;
    smoking: string;
    occupancy: string;

    status: RoomStatus;
}

export interface RoomInput {
    number: string;
    type: string;
    floor: string;

    bedType: string;
    smoking: string;
    occupancy: string;

    status: RoomStatus;
}

export type RoomUpdate = Partial<RoomInput>;