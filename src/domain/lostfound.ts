
import type { Dispatch, SetStateAction } from "react";

export type Page =
    | "overview"
    | "register"
    | "detail"
    | "claim";

export type ItemStatus = "In Storage" | "Claimed";

export interface Item {
    id: string;
    name: string;
    category: string;
    location: string;
    date: string;
    reportedBy: string;
    retention: string;
    status: ItemStatus;
    description?: string;
}

export type NewItem = Omit<Item, "id" | "status">;

export interface LostFoundStore {
    page: Page;
    setPage: Dispatch<SetStateAction<Page>>;

    items: Item[];

    selected: Item;
    selectItem: (item: Item) => void;

    addItem: (item: NewItem) => void;
    claimSelected: () => void;
}


