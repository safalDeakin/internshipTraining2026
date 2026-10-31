import { createContext } from "react";
import type { Room } from "../../../domain/houseKeeping";


export type RepoHouseKeepingContextType = {
    data: Room[]
    selectedPackage: Room | null
    selectedPackageId: string
    selectPackage: (id: string) => void

    create: (data: Room) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};

//createContext allowed to share data with many compo
const HouseKeepingContext = createContext<RepoHouseKeepingContextType | null>(null);
export default HouseKeepingContext;