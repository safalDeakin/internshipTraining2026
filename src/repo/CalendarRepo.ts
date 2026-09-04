import type { CalendarEvent } from "../types/calendar";
import { initialEvents } from "../data/calendarData";

export class CalendarRepo {
  private events: CalendarEvent[] = initialEvents;

  private listeners = new Set<() => void>();

  //For getting Events
  getEvents() {
    return this.events;
  }

  //for Adding events
  addEvent(event: CalendarEvent) {
    this.events = [...this.events, event];

    this.notify();
  }

  //For updating the evenets
  updateEvent(
    id: number,
    updates: Partial<CalendarEvent>
  ) {
    this.events = this.events.map((event) =>
      event.id === id
        ? {
            ...event,
            ...updates,
          }
        : event
    );

    this.notify();
  }

  //For deleting the events
  deleteEvent(id: number) {
    this.events = this.events.filter(
      (event) => event.id !== id
    );

    this.notify();
  }

  //subscribe Part
  subscribe(listener: () => void) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  //Notify
  private notify() {
    this.listeners.forEach((listener) => {
      listener();
    });
  }
}