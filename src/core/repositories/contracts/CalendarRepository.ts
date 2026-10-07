import type {
    CalendarEvent,
    CalendarEventInput,
    CalendarEventUpdate,
} from "../../domain/calendar";
import type { ObservableRepository } from "./ObservableRepository";

export interface CalendarRepository extends ObservableRepository {
    getAll(): Promise<CalendarEvent[]>;

    getById(
        id: number
    ): Promise<CalendarEvent | null>;

    create(
        input: CalendarEventInput
    ): Promise<CalendarEvent>;

    update(
        id: number,
        input: CalendarEventUpdate
    ): Promise<CalendarEvent>;

    delete(
        id: number
    ): Promise<void>;

}