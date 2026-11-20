import { createContext } from "react";
import type { HoldItem, ReservationRecord } from "../../../../../domain/holdReservation";





export type RepoHoldReservationContextType = {
    title: string,
    data: ReservationRecord[]
    searchQuery: string,
    setSearchQuery: (val: string) => void,
    getId: (id: HoldItem) => string


    create: (data: ReservationRecord) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};

//createContext allowed to share data with many compo
const RepoHoldReservationContext = createContext<RepoHoldReservationContextType | null>(null);
export default RepoHoldReservationContext;
