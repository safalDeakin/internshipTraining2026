import { createContext } from "react";
import { type Guest } from "../../../../domain/GuestModel";

export type RepoTestContextType = {
    data: Guest[] | null
    create: (data: Guest) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};

//createContext allowed to share data with many compo
const RepoTestContext = createContext<RepoTestContextType | null>(null);
export default RepoTestContext;