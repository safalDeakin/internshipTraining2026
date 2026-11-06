
import { createContext } from "react";
import type { ProductDetail, RoomTypes } from "../model/RoomModel";

export type RoomsListContextType = {
    items: RoomTypes[],
    title: string,
    searchQuery: string,
    setSearchQuery: (val: string) => void,
    getId: (id: RoomTypes) => string
    getRoomDetails: (id: string) => ProductDetail
};

export const RoomsListContext =
    createContext<RoomsListContextType | null>(null);
