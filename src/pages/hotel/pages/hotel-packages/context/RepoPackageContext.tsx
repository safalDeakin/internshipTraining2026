import { createContext } from "react";
import type { HotelPackage } from "../../../../../domain/hotel-package";


export type RepoPackageContextType = {
    title: string
    data: HotelPackage[]
    searchQuery: string,
    setSearchQuery: (val: string) => void,
    getId: (id: HotelPackage) => string


    create: (data: HotelPackage) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};

//createContext allowed to share data with many compo
const RepoPackageContext = createContext<RepoPackageContextType | null>(null);
export default RepoPackageContext;