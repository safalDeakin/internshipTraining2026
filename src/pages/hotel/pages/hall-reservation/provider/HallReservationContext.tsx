import { createContext } from "react";
import type { HallReservation } from "../../../../../domain/hallReservation";

export type RepoHallReservationContextType = {
    title: string;
    data: HallReservation[];
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    getId: (item: HallReservation) => string;

    create: (data: HallReservation) => Promise<boolean | DOMException>;
    remove: (id: string) => Promise<boolean | DOMException>;

};

const RepoHallReservationContext =
    createContext<RepoHallReservationContextType | null>(null);

export default RepoHallReservationContext;