
import type {
    Reservation,
    Room,
    Stat,
} from "../types/reservation";

import { Sun, Moon } from "lucide-react";

export const ROOMS: Room[] = [
    { id: "101", floor: "1st Floor", type: "Deluxe King" },
    { id: "102", floor: "1st Floor", type: "Standard" },
    { id: "103", floor: "1st Floor", type: "Deluxe" },
    { id: "104", floor: "1st Floor", type: "Standard" },
    { id: "105", floor: "1st Floor", type: "Executive" },
    { id: "201", floor: "2nd Floor", type: "Deluxe King" },
    { id: "202", floor: "2nd Floor", type: "Suite" },
    { id: "203", floor: "2nd Floor", type: "Standard" },
    { id: "204", floor: "2nd Floor", type: "Executive" },
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



export const TIME_LABELS = [
    { label: "12", icon: Sun },
    { label: "" },
    { label: "" },
    { label: "" },
    { label: "12", icon: Moon },
    { label: "" },
    { label: "" },
    { label: "" },
];

export const IS_MAJOR = [
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
];

export const SLOTS_PER_DAY = 8;
export const TOTAL_SLOTS = DAYS.length * SLOTS_PER_DAY;

export const S = (day: number, slotInDay: number) =>
    day * SLOTS_PER_DAY + slotInDay;

export const RESERVATIONS: Record<string, Reservation[]> = {
    "101": [
        {
            id: "CAL-101-001",
            startSlot: S(1, 0),
            span: 16,
            status: "Reserved",
            guestName: "James W.",
        },
        {
            id: "CAL-101-002",
            startSlot: S(5, 2),
            span: 10,
            status: "Occupied",
            guestName: "Chen L.",
        },
    ],

    "102": [
        {
            id: "CAL-102-001",
            startSlot: S(0, 0),
            span: 12,
            status: "Occupied",
            guestName: "Smith A.",
        },
        {
            id: "CAL-102-002",
            startSlot: S(4, 0),
            span: 16,
            status: "Reserved",
            guestName: "Park S.",
        },
    ],

    "103": [
        {
            id: "CAL-103-001",
            startSlot: S(0, 0),
            span: 8,
            status: "Out of Service",
        },
        {
            id: "CAL-103-002",
            startSlot: S(3, 2),
            span: 12,
            status: "Reserved",
            guestName: "Lee M.",
        },
    ],

    "104": [
        {
            id: "CAL-104-001",
            startSlot: S(2, 0),
            span: 16,
            status: "Reserved",
            guestName: "Brown T.",
        },
        {
            id: "CAL-104-002",
            startSlot: S(5, 4),
            span: 8,
            status: "Occupied",
            guestName: "Wang X.",
        },
    ],

    "105": [
        {
            id: "CAL-105-001",
            startSlot: S(2, 0),
            span: 8,
            status: "Out of Service",
        },
        {
            id: "CAL-105-002",
            startSlot: S(6, 0),
            span: 8,
            status: "Reserved",
            guestName: "Kim J.",
        },
    ],

    "201": [
        {
            id: "CAL-201-001",
            startSlot: S(1, 0),
            span: 28,
            status: "Occupied",
            guestName: "Davis R.",
        },
    ],

    "202": [
        {
            id: "CAL-202-001",
            startSlot: S(0, 0),
            span: 16,
            status: "Reserved",
            guestName: "Miller C.",
        },
        {

            id: "CAL-202-002",
            startSlot: S(5, 0),
            span: 16,
            status: "Reserved",
            guestName: "Wilson B.",
        },
    ],

    "203": [
        {
            id: "CAL-203-001",
            startSlot: S(3, 0),
            span: 12,
            status: "Occupied",
            guestName: "Moore E.",
        },
    ],

    "204": [
        {
            id: "CAL-204-001",
            startSlot: S(1, 0),
            span: 12,
            status: "Reserved",
            guestName: "Taylor G.",
        },
        {
            id: "CAL-204-002",
            startSlot: S(6, 4),
            span: 4,
            status: "Out of Service",
        },
    ],
};

export const STATS: Stat[] = [
    {
        label: "Available Rooms",
        value: 10,
        status: "Available",
    },
    {
        label: "Reserved Rooms",
        value: 10,
        status: "Reserved",
    },
    {
        label: "Occupied Rooms",
        value: 15,
        status: "Occupied",
    },
    {
        label: "Out of Service",
        value: 3,
        status: "Out of Service",
    },
];

