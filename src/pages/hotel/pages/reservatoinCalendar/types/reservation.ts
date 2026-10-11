
export type Status =
  | "Available"
  | "Reserved"
  | "Occupied"
  | "Out of Service";

export type ViewMode = "Weekly" | "Daily" | "Monthly";

export interface Room {
  id: string;
  floor: string;
  type: string;
}

export interface Reservation {
  id: string;
  startSlot: number;
  span: number;
  status: Status;
  guestName?: string;
}

export interface Stat {
  label: string;
  value: number;
  status: Status;
}


export interface DropPreview {
  roomId: string;
  startSlot: number;
  valid: boolean;
  reason?: "overlap" | "room-type";
}
