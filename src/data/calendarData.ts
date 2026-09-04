import type { CalendarEvent } from "../types/calendar";

export const initialEvents: CalendarEvent[] = [
    {
        id: 1,
        title: "Special Events",
        date: 5,
        month: 0,
        year: 2025,
        type: "special",
    },

    {
        id: 2,
        title: "Birthday",
        date: 6,
        month: 0,
        year: 2025,
        type: "birthday",
    },

    {
        id: 3,
        title: "Holiday",
        date: 10,
        month: 0,
        year: 2025,
        type: "holiday",
    },

    {
        id: 4,
        title: "Special Events",
        date: 13,
        month: 0,
        year: 2025,
        type: "special",
    },

    {
        id: 5,
        title: "Holiday",
        date: 18,
        month: 0,
        year: 2025,
        type: "holiday",
    },

    {
        id: 6,
        title: "Birthday",
        date: 24,
        month: 0,
        year: 2025,
        type: "birthday",
    },

    {
        id: 7,
        title: "Marketing & Launch Events",
        date: 25,
        month: 0,
        year: 2025,
        type: "marketing",
        subtitle: "Product Lunch",
        time: "3:00 - 5:00",
    },

    {
        id: 8,
        title: "Internals Events",
        date: 30,
        month: 0,
        year: 2025,
        type: "internal",
        subtitle: "Wellness Day",
        time: "3:00 - 5:00",
    },
];