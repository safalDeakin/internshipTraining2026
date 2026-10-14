export type DayKey = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type RoomStatus =
    | "Available"
    | "Reserved"
    | "Occupied"
    | "Out of Service";


export interface RoomNumber {
    number: string;
    floor: number;
}

export interface RoomRate {
    id: string;
    name: string;
    code: string;

    roomNo: string;
    status: RoomStatus;

    baseRate: number;
    additionalRate: number;
    additionalRateType: "fixed" | "percentage";
    capacity: number;
    beds: string;
    description: string;
    color: string;
    roomNumbers: RoomNumber[];
}

export interface NewRoomRate {
    name: string;
    code: string;
    roomNo: string;
    floor: number;
    status: string;
    baseRate: number;
    additionalRate: number;
    capacity: number;
    beds: string;
    description: string;
}

export interface TimelineRate {
    roomId: string;
    rates: Record<DayKey, number>;
}

export type DialogName = "add" | "update" | null;

export interface RatePlanContextValue {
    rooms: RoomRate[];
    timeline: TimelineRate[];
    dialog: DialogName;
    selectedRoom: RoomRate | null;
    openAddDialog: () => void;
    openUpdateDialog: () => void;
    closeDialog: () => void;
    showRoomDetails: (room: RoomRate) => void;
    closeRoomDetails: () => void;
    addRoomRate: (room: NewRoomRate) => void;
    updateTimelineRate: (roomId: string, day: DayKey, rate: number) => void;
}




