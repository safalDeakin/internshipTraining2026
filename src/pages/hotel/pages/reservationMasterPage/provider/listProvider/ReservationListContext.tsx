
import { createContext } from "react";
import type { ReservationListModel } from "../../model/ReservationModel";

export type ReservationListContextType = {
    items: ReservationListModel[],
    title: string,
    searchQuery: string,
    setSearchQuery: (val: string) => void,
    getId: (id: ReservationListModel) => string
};

export const ReservationListContext =
    createContext<ReservationListContextType | null>(null);



