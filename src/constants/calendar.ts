import type { EventType } from "../types/calendar";

export const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const DAYS = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
];

export const EVENT_STYLES: Record<EventType, {
    bg: string;
    dot: string;
    text: string;
}> = {
    holiday: {
        bg: "bg-gray-200",
        dot: "bg-gray-500",
        text: "text-gray-700",
    },

    special: {
        bg: "bg-blue-100",
        dot: "bg-blue-500",
        text: "text-blue-700",
    },

    birthday: {
        bg: "bg-orange-200",
        dot: "bg-orange-500",
        text: "text-orange-700",
    },

    marketing: {
        bg: "bg-green-100",
        dot: "bg-green-500",
        text: "text-green-700",
    },

    internal: {
        bg: "bg-blue-100",
        dot: "bg-blue-400",
        text: "text-blue-700",
    },
};