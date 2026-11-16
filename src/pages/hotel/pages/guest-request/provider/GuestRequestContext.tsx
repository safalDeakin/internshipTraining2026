import { createContext } from "react";

import type { GuestRequest } from "../../../../../domain/GuestRequest";


export type RepoGuestRequestContextType = {
    title: string,
    data: GuestRequest[]
    searchQuery: string,
    setSearchQuery: (val: string) => void,
    getId: (id: GuestRequest) => string

    create: (data: GuestRequest) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};

//createContext allowed to share data with many compo
const RepoGuestRequestContext = createContext<RepoGuestRequestContextType | null>(null);
export default RepoGuestRequestContext;