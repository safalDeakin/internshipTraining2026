
import type { DayActivity } from "../../../../../domain/dayActivity";

export const dayActivity: DayActivity = {
    id: "P123",

    buildings: [
        // Building A - Main
        {
            id: "building-a",
            name: "Building A - Main",
            rooms: 15,

            summaryItems: [
                { label: "Total Rooms", value: "15/28 Rooms" },
                { label: "In-house Guest", value: "42 Guest", detail: "35 Adult, 7 Children" },
                { label: "Expected Revenue", value: "28", detail: "NPR 50,000" },
                { label: "Room Hold", value: "5", detail: "Request Hold" },
            ],

            checklists: [
                {
                    title: "Room & Reservation Check",
                    items: [
                        "All room status are correct (occupied, vacant, hold, blocked, available)",
                        "Reservation are properly updated",
                        "Room changes & transfer are recorded",
                        "No missing arrival & departure",
                    ],
                },
                {
                    title: "Folio & Billing Check",
                    items: [
                        "All Guest Folio are balanced.",
                        "Charge are correctly posted.",
                        "Advance payment are applied.",
                        "No pending bill issues.",
                    ],
                },
            ],

            paymentRows: [
                { id: "cash", name: "Cash Payment", expected: "NPR 20,000", difference: "-" },
                { id: "card", name: "Card Payment", expected: "NPR 10,000", difference: "-" },
                { id: "cheque", name: "Cheques Payment", expected: "NPR 10,000", difference: "-" },
                { id: "wallet", name: "Digital Wallet", expected: "NPR 10,000", difference: "-" },
                { id: "credit", name: "Credit Sale (A/R)", expected: "0", difference: "-" },
            ],

            revenueRows: [
                { id: "room", name: "Room Revenue", expected: "NPR 45,000" },
                { id: "restaurant", name: "Restaurant", expected: "NPR 7,000" },
                { id: "discount", name: "Discount", expected: "NPR 2,000" },
            ],
        },

        // Building B
        {
            id: "building-b",
            name: "Building B",
            rooms: 6,

            summaryItems: [
                { label: "Total Rooms", value: "6/10 Rooms" },
                { label: "In-house Guest", value: "18 Guest", detail: "14 Adult, 4 Children" },
                { label: "Expected Revenue", value: "12", detail: "NPR 32,500" },
                { label: "Room Hold", value: "2", detail: "Request Hold" },
            ],

            checklists: [
                {
                    title: "Room & Reservation Check",
                    items: [
                        "All room statuses are updated",
                        "Occupied rooms match reservation records",
                        "Room hold requests are verified",
                        "Upcoming arrivals and departures are confirmed",
                    ],
                },
                {
                    title: "Folio & Billing Check",
                    items: [
                        "All guest folios are balanced",
                        "Room and restaurant charges are posted",
                        "Advance payments are reconciled",
                        "Outstanding guest balances are reviewed",
                    ],
                },
                {
                    title: "Housekeeping Check",
                    items: [
                        "Vacant rooms are cleaned",
                        "Room inspections are completed",
                        "Maintenance requests are recorded",
                    ],
                },
            ],

            paymentRows: [
                { id: "b-cash", name: "Cash Payment", expected: "NPR 12,000", difference: "-" },
                { id: "b-card", name: "Card Payment", expected: "NPR 8,500", difference: "NPR 500" },
                { id: "b-cheque", name: "Cheque Payment", expected: "NPR 5,000", difference: "-" },
                { id: "b-wallet", name: "Digital Wallet", expected: "NPR 4,000", difference: "-" },
                { id: "b-credit", name: "Credit Sale (A/R)", expected: "NPR 3,000", difference: "-" },
            ],

            revenueRows: [
                { id: "b-room", name: "Room Revenue", expected: "NPR 25,000" },
                { id: "b-restaurant", name: "Restaurant", expected: "NPR 5,500" },
                { id: "b-discount", name: "Discount", expected: "NPR 1,000" },
                { id: "b-laundry", name: "Laundry Service", expected: "NPR 3,000" },
            ],
        },

        // Building C
        {
            id: "building-c",
            name: "Building C",
            rooms: 5,

            summaryItems: [
                { label: "Total Rooms", value: "5/8 Rooms" },
                { label: "In-house Guest", value: "9 Guest", detail: "7 Adult, 2 Children" },
                { label: "Expected Revenue", value: "7", detail: "NPR 18,000" },
                { label: "Room Hold", value: "1", detail: "Request Hold" },
            ],

            checklists: [
                {
                    title: "Room & Reservation Check",
                    items: [
                        "Room occupancy records are verified",
                        "Reservation details are updated",
                        "Room hold requests are confirmed",
                        "Departure records are checked",
                    ],
                },
                {
                    title: "Folio & Billing Check",
                    items: [
                        "Guest folios are reviewed",
                        "All posted charges are verified",
                        "Payment receipts are recorded",
                        "Outstanding balances are identified",
                    ],
                },
                {
                    title: "Maintenance & Safety Check",
                    items: [
                        "Room equipment is inspected",
                        "Electrical and plumbing issues are checked",
                        "Safety equipment is available",
                    ],
                },
            ],

            paymentRows: [
                { id: "c-cash", name: "Cash Payment", expected: "NPR 7,000", difference: "-" },
                { id: "c-card", name: "Card Payment", expected: "NPR 4,000", difference: "-" },
                { id: "c-cheque", name: "Cheque Payment", expected: "NPR 2,000", difference: "-" },
                { id: "c-wallet", name: "Digital Wallet", expected: "NPR 3,000", difference: "NPR 200" },
                { id: "c-credit", name: "Credit Sale (A/R)", expected: "NPR 2,000", difference: "-" },
            ],

            revenueRows: [
                { id: "c-room", name: "Room Revenue", expected: "NPR 14,000" },
                { id: "c-restaurant", name: "Restaurant", expected: "NPR 2,500" },
                { id: "c-discount", name: "Discount", expected: "NPR 500" },
                { id: "c-other", name: "Other Services", expected: "NPR 2,000" },
            ],
        },
    ],
};
