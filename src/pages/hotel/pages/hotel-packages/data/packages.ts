import type { HotelPackage } from "../types/package"

const standardMenu = [
    { mealType: "Welcome Drink", included: "2 Items", serviceType: "Buffet" },
    { mealType: "Starters", included: "2 Items", serviceType: "Buffet" },
    { mealType: "Main Course", included: "2 Items", serviceType: "Buffet" },
    { mealType: "Desserts", included: "2 Items", serviceType: "Buffet" },
    { mealType: "Beverages", included: "2 Items", serviceType: "Buffet" },
]

const standardAddOns = [
    { service: "Decoration", details: "Theme decoration for stage & entry" },
    { service: "Sound System", details: "Standard sound system" },
    { service: "Lighting", details: "Basic lighting for hall" },
    { service: "Photography", details: "Four-hour event coverage" },
    { service: "Hospitality", details: "Dedicated floor coordinator" },
]


export const packages: HotelPackage[] = [
    {
        id: "special-couple",
        name: "Special Couple Package",
        code: "WP-#1211",
        category: "Package",
        packageType: "Food & Venue",
        description:
            "A premium wedding package including delicious food, room, decor and premium service for a memorable celebration.",
        stats: [
            { label: "Package Price Per Pax", value: "NPR 2,500" },
            { label: "Minimum Pax", value: "2 Pax" },
            { label: "Maximum Pax", value: "2 Pax" },
            { label: "Applicable For", value: "Couple Only" },
            { label: "Package Type", value: "Food & Room" },
            { label: "Status", value: "Active" },
        ],
        bookingDetails: [
            { label: "Booking Type", value: "Per Pax" },
            { label: "Currency", value: "NPR" },
            { label: "Created By", value: "Admin User" },
            { label: "Created Date", value: "2083/01/01" },
        ],
        roomDetails: [
            { label: "Room Name", value: "Standard Room" },
            { label: "Room No", value: "R 101" },
            { label: "Floor", value: "Ground Floor" },
        ],
        roomCharges: [
            { label: "Extra Hour Charged", value: "NPR 1,500 / Hour" },
            { label: "Extra Setup Charge", value: "NPR 1,000" },
        ],
        menu: standardMenu,
        addOns: standardAddOns,
    },
    {
        id: "co-operate",
        name: "Co-operate Package",
        code: "CP-#1184",
        category: "Corporate",
        packageType: "Conference & Food",
        description:
            "A practical full-day corporate package with conference facilities, refreshments and event support.",
        stats: [
            { label: "Package Price Per Pax", value: "NPR 1,800" },
            { label: "Minimum Pax", value: "20 Pax" },
            { label: "Maximum Pax", value: "80 Pax" },
            { label: "Applicable For", value: "Corporate" },
            { label: "Package Type", value: "Hall & Food" },
            { label: "Status", value: "Active" },
        ],
        bookingDetails: [
            { label: "Booking Type", value: "Per Pax" },
            { label: "Currency", value: "NPR" },
            { label: "Created By", value: "Admin User" },
            { label: "Created Date", value: "2082/11/14" },
        ],
        roomDetails: [
            { label: "Room Name", value: "Conference Hall" },
            { label: "Room No", value: "C 202" },
            { label: "Floor", value: "First Floor" },
        ],
        roomCharges: [
            { label: "Extra Hour Charged", value: "NPR 2,000 / Hour" },
            { label: "Extra Setup Charge", value: "NPR 1,500" },
        ],
        menu: standardMenu.slice(0, 4),
        addOns: standardAddOns.slice(1),
    },
    {
        id: "winter-2024",
        name: "2024-Winter Special",
        code: "WS-#2041",
        category: "Seasonal",
        packageType: "Stay & Breakfast",
        description:
            "A quiet winter stay with a warm breakfast, flexible check-out and thoughtful seasonal amenities.",
        stats: [
            { label: "Package Price Per Pax", value: "NPR 3,200" },
            { label: "Minimum Pax", value: "1 Pax" },
            { label: "Maximum Pax", value: "4 Pax" },
            { label: "Applicable For", value: "All Guests" },
            { label: "Package Type", value: "Room & Food" },
            { label: "Status", value: "Active" },
        ],
        bookingDetails: [
            { label: "Booking Type", value: "Per Night" },
            { label: "Currency", value: "NPR" },
            { label: "Created By", value: "Reservations" },
            { label: "Created Date", value: "2082/09/01" },
        ],
        roomDetails: [
            { label: "Room Name", value: "Deluxe Room" },
            { label: "Room No", value: "D 304" },
            { label: "Floor", value: "Third Floor" },
        ],
        roomCharges: [
            { label: "Extra Hour Charged", value: "NPR 800 / Hour" },
            { label: "Extra Bed Charge", value: "NPR 1,200" },
        ],
        menu: standardMenu.slice(0, 3),
        addOns: standardAddOns.slice(3),
    },
    {
        id: "winter-family",
        name: "2024-Winter Family",
        code: "WF-#2045",
        category: "Seasonal",
        packageType: "Family Stay",
        description:
            "A comfortable family escape with connecting rooms, daily breakfast and child-friendly services.",
        stats: [
            { label: "Package Price Per Pax", value: "NPR 2,900" },
            { label: "Minimum Pax", value: "3 Pax" },
            { label: "Maximum Pax", value: "6 Pax" },
            { label: "Applicable For", value: "Families" },
            { label: "Package Type", value: "Room & Food" },
            { label: "Status", value: "Active" },
        ],
        bookingDetails: [
            { label: "Booking Type", value: "Per Night" },
            { label: "Currency", value: "NPR" },
            { label: "Created By", value: "Reservations" },
            { label: "Created Date", value: "2082/09/05" },
        ],
        roomDetails: [
            { label: "Room Name", value: "Family Suite" },
            { label: "Room No", value: "F 401" },
            { label: "Floor", value: "Fourth Floor" },
        ],
        roomCharges: [
            { label: "Extra Hour Charged", value: "NPR 1,000 / Hour" },
            { label: "Extra Bed Charge", value: "NPR 1,200" },
        ],
        menu: standardMenu.slice(0, 4),
        addOns: standardAddOns.slice(3),
    },
]
