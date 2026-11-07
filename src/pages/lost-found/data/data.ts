import type { Item } from "../../../domain/lostfound";

export const initialLostAndFoundItems: Item[] = [
    {
        id: "LF-#1211",
        name: "iPhone 15",
        category: "Mobile Phone",
        location: "Restaurant - Table 5",
        date: "2083/11/12",
        reportedBy: "Waiter",
        retention: "2083/11/19",
        status: "In Storage",
        description: "Light green phone with a protective case.",
    },

    ...Array.from({ length: 7 }, (_, i) => ({
        id: `LF-#${1212 + i}`,
        name: "Black Wallet",
        category: "Wallet / Bag",
        location: "Lobby - Reception",
        date: "2083/11/12",
        reportedBy: "Receptionist",
        retention: "2083/11/19",
        status: "In Storage" as const,
        description:
            "Black leather wallet containing some cash and a card.",
    })),

    {
        id: "LF-#1208",
        name: "Room Key Card",
        category: "Other",
        location: "Deluxe Room 101",
        date: "2083/11/10",
        reportedBy: "Housekeeping",
        retention: "2083/11/17",
        status: "Claimed",
        description: "White hotel key card.",
    },
];