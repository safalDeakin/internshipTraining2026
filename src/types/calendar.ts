export type EventType =
    | "holiday"
    | "special"
    | "birthday"
    | "marketing"
    | "internal";

export interface CalendarEvent {
    id: number;
    title: string;
    date: number;
    month: number;
    year: number;
    type: EventType;
    time?: string;
    subtitle?: string;
}

export type ModalMode = "holiday" | "event" | null;

export interface ModalState {
    mode: ModalMode;
    editId?: number;
    date?: number;
}

export interface EventForm {
    title: string;
    subtitle: string;
    time: string;
    type: EventType;
    date: number;
}