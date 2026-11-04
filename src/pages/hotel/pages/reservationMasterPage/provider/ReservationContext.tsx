
import { createContext } from "react";
import type { ReservationDetailModel, ReservationListModel } from "../model/reservationmodel";

export type ReservationListContextType = {
    items: ReservationListModel[],
    title: string,
    searchQuery: string,
    setSearchQuery: (val: string) => void,
    getId: (id: ReservationListModel) => string
    getReservationDetails: (id: string) => ReservationDetailModel
};

export const ReservationListContext =
    createContext<ReservationListContextType | null>(null);
