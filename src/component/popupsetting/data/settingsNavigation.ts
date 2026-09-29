import {
    Laptop,
    Pencil,
    UserRound,
} from "lucide-react";

export const settingsNavigation = [
    {
        id: "appearance" as const,
        label: "Appearance",
        icon: Pencil,
    },
    {
        id: "accounts" as const,
        label: "Accounts",
        icon: UserRound,
    },
    {
        id: "devices" as const,
        label: "Devices",
        icon: Laptop,
    },
];