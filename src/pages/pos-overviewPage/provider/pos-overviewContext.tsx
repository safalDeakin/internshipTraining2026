import { createContext } from "react";
import type { POSOverview } from "../../../domain/pos.overview";


export type RepoPosOverviewContextType = {
    overview: POSOverview | null;
    create: (data: POSOverview) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};


//createContext allowed to share data with many compo
const PosOverviewContext = createContext<RepoPosOverviewContextType | null>(null);
export default PosOverviewContext;