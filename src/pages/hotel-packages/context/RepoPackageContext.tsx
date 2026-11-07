import { createContext } from "react";
import type { HotelPackage } from "../../../domain/hotel-package";


export type RepoPackageContextType = {
    data: HotelPackage[]
    selectedPackage: HotelPackage | null
    selectedPackageId: string
    selectPackage: (id: string) => void

    create: (data: HotelPackage) => Promise<boolean | DOMException>
    remove: (id: string) => Promise<boolean | DOMException>
};

//createContext allowed to share data with many compo
const RepoPackageContext = createContext<RepoPackageContextType | null>(null);
export default RepoPackageContext;