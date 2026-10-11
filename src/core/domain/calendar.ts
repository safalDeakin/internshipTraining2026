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

export interface CalendarEventInput {
    title: string;

    date: number;
    month: number;
    year: number;

    type: EventType;

    time?: string;
    subtitle?: string;
}

export type CalendarEventUpdate = Partial<CalendarEventInput>;