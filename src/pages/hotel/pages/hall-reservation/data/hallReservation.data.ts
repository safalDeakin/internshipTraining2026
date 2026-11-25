import type { HallReservation } from "../../../../../domain/hallReservation";

export const hallReservations: HallReservation[] = [
    {
        id: "RV-H1221",
        title: "Room set up",

        guest: [
            { label: "Guest Name", value: "Nia Shrestha" },
            { label: "Organization Name", value: "Nepal Organization" },
            { label: "Phone Number", value: "9868800800" },
            { label: "E-mail", value: "niashrestha@gmail.com" },
            { label: "ID Type/Number", value: "Citizenship · 137-12-12221" },
        ],

        venue: [
            { label: "Hall Name", value: "301" },
            { label: "Hall Type", value: "Deluxe Room" },
            { label: "Floor", value: "1 Floor" },
            { label: "Hall Capacity", value: "250 Pax" },
            { label: "Dimension", value: "60–80 ft" },
        ],

        event: [
            { label: "Occasion", value: "Wedding" },
            { label: "Event Date", value: "2083/01/03" },
            { label: "Event Time", value: "11:00 AM To 6:00 PM" },
            { label: "Included Time", value: "7 Hours" },
            { label: "Expected Pax", value: "200" },
        ],

        agenda: [
            {
                start: "8:00 AM",
                end: "11:00 AM",
                activity: "Set Up & Decoration",
                location: "Grand Ballroom",
                setup: "Banquet",
            },
            {
                start: "11:00 AM",
                end: "12:00 PM",
                activity: "Welcome Drink",
                location: "Grand Ballroom",
                setup: "Cocktail",
            },
            {
                start: "12:00 PM",
                end: "2:00 PM",
                activity: "Wedding Reception",
                location: "Grand Ballroom",
                setup: "Banquet",
            },
            {
                start: "2:00 PM",
                end: "4:00 PM",
                activity: "Set Up & Decoration",
                location: "Grand Ballroom",
                setup: "Banquet",
            },
        ],

        folio: Array.from({ length: 6 }, (_, index) => ({
            date: "2083/11/12",
            reference: `EF-#100${index + 1}`,
            description: "Hall Rental – Grand Ballroom",
            category: "Hall Rental",
            quantity: 1,
            amount: "1,50,000",
            type: "Charge",
        })),

        payments: [
            {
                date: "2083/11/12",
                paymentType: "Advance Payment",
                description: "Initial Advance",
                reference: "PAY-#121",
                amount: "1,50,000",
            },
            {
                date: "2083/11/12",
                paymentType: "Partial Payment",
                description: "Second Payment",
                reference: "PAY-#123",
                amount: "1,50,000",
            },
        ],
    },

    {
        id: "RV-H1222",
        title: "Corporate Meeting",

        guest: [
            { label: "Guest Name", value: "Ram Sharma" },
            { label: "Organization Name", value: "ABC Corporation" },
            { label: "Phone Number", value: "9800000000" },
            { label: "E-mail", value: "ram@example.com" },
            { label: "ID Type/Number", value: "Citizenship · 123-45-67890" },
        ],

        venue: [
            { label: "Hall Name", value: "202" },
            { label: "Hall Type", value: "Conference Hall" },
            { label: "Floor", value: "2 Floor" },
            { label: "Hall Capacity", value: "100 Pax" },
            { label: "Dimension", value: "40–60 ft" },
        ],

        event: [
            { label: "Occasion", value: "Corporate Meeting" },
            { label: "Event Date", value: "2083/02/05" },
            { label: "Event Time", value: "9:00 AM To 5:00 PM" },
            { label: "Included Time", value: "8 Hours" },
            { label: "Expected Pax", value: "80" },
        ],

        agenda: [
            {
                start: "9:00 AM",
                end: "10:00 AM",
                activity: "Guest Arrival",
                location: "Conference Hall",
                setup: "Theatre",
            },
            {
                start: "10:00 AM",
                end: "1:00 PM",
                activity: "Business Meeting",
                location: "Conference Hall",
                setup: "Boardroom",
            },
        ],

        folio: Array.from({ length: 6 }, (_, index) => ({
            date: "2083/11/12",
            reference: `EF-#100${index + 1}`,
            description: "Hall Rental – Grand Ballroom",
            category: "Hall Rental",
            quantity: 1,
            amount: "1,50,000",
            type: "Charge",
        })),

        payments: [
            {
                date: "2083/11/12",
                paymentType: "Advance Payment",
                description: "Initial Advance",
                reference: "PAY-#121",
                amount: "1,50,000",
            },
            {
                date: "2083/11/12",
                paymentType: "Partial Payment",
                description: "Second Payment",
                reference: "PAY-#123",
                amount: "1,50,000",
            },
        ],
    },
];