
import { useContext, useMemo, useState, type ReactNode } from "react";
import RepoPackageContext from "./RepoPackageContext";
import { packageCmdService, packageQueryService } from "../../../application/services";
import type { HotelPackage } from "../../../domain/hotel-package";
import { useSubscription } from "../../../application/useSubscription";


// Provider
export const RepoPackageProvider = ({ children }: { children: ReactNode }) => {



    //provider needs to log in, find an organization, or check authorization so ask for AuthService
    const queryService = packageQueryService;
    const cmdService = packageCmdService;

    const { data } = useSubscription<HotelPackage, string>(queryService);


    const [selectedPackageId, setSelectedPackageId] = useState<string>(
        data[0]?.id ?? ""
    );


    const create = async (data: HotelPackage): Promise<boolean> => {
        try {
            return await cmdService.create(data);
        } catch (error) {
            alert(`Id:${data.id} Already Exist`);
            console.log(error)
            return false;
        }
    }

    const remove = async (ID: string): Promise<boolean> => {
        try {
            return await cmdService.delete(ID)
        } catch (error) {
            console.log(error)
            alert(`Id:${ID} Not Found`);
            return false;
        }
    }

    const selectedPackage = useMemo(
        () => data.find((item) => item.id === selectedPackageId) ?? data[0],
        [data, selectedPackageId],
    );

    const value = useMemo(
        () => ({
            data,
            selectedPackage,
            selectedPackageId,
            selectPackage: setSelectedPackageId,
            create,
            remove
        }),
        [data, selectedPackage, selectedPackageId],
    )

    return (
        <RepoPackageContext.Provider
            value={value}
        >
            {children}
        </RepoPackageContext.Provider>
    );
};

export const useRepoPackageHook = () => {
    const context = useContext(RepoPackageContext);

    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}

