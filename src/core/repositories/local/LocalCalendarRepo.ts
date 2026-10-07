import type { CalendarEvent, CalendarEventInput, CalendarEventUpdate } from "../../domain/calendar";
import type { CalendarRepository } from "../contracts/CalendarRepository";
import { LocalStore } from "./LocalStore";

export class LocalCalendarRepo
    extends LocalStore
    implements CalendarRepository {
    private events: CalendarEvent[] = [];

    async getAll(): Promise<CalendarEvent[]> {
        return [...this.events];
    }

    async getById(
        id: number
    ): Promise<CalendarEvent | null> {
        return (
            this.events.find(
                (event) => event.id === id
            ) ?? null
        );
    }

    async create(
        event: CalendarEventInput
    ): Promise<CalendarEvent> {
        const newEvent: CalendarEvent = {
            id: Date.now(),
            ...event,
        };

        this.events = [
            ...this.events,
            newEvent,
        ];

        this.notify();

        return newEvent;
    }

    async update(
        id: number,
        updates: CalendarEventUpdate
    ): Promise<CalendarEvent> {
        // update locally
    }

    async delete(id: number): Promise<void> {
        // delete locally
    }

    replaceAll(events: CalendarEvent[]) {
        this.events = [...events];
        this.notify();
    }
}