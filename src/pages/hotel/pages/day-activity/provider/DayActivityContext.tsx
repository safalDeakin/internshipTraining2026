import { createContext } from "react";

import type { Building, DayActivity } from "../../../../../domain/dayActivity";

export type DayActivityContextType = {
    title: string;

    data: Building[];

    searchQuery: string;
    setSearchQuery: (val: string) => void;

    getId: (item: Building) => string;

    create: (data: DayActivity) => Promise<boolean | DOMException>;
    remove: (id: string) => Promise<boolean | DOMException>;

    selectedBuilding?: Building;
    selectBuilding: (id: string) => void;
};

const DayActivityContext = createContext<DayActivityContextType | null>(null);

export default DayActivityContext;