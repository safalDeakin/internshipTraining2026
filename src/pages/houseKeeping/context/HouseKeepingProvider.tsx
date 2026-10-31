
import { useContext, useMemo, useState, type ReactNode } from "react";
import HouseKeepingContext from "./HouseKeepingContext";
import { HouseKeepingCmdService, HouseKeepingQueryService } from "../../../application/services";
import { useSubscription } from "../../../application/useSubscription";
import type { Room } from "../../../domain/houseKeeping";


// Provider
export const RepoHousekeepingProvider = ({ children }: { children: ReactNode }) => {

    //provider needs to log in, find an organization, or check authorization so ask for AuthService
    const queryService = HouseKeepingQueryService;
    const cmdService = HouseKeepingCmdService;

    const { data } = useSubscription<Room, string>(queryService);
    const [selectedPackage, setSelectedPackage] = useState<Room | null>(null);

    const selectPackage = (selection: Room | string | null) => {
        if (typeof selection === "string") {
            setSelectedPackage(data.find((room) => String(room.id) === selection) ?? null);
        } else {
            setSelectedPackage(selection);
        }
    };



    const create = async (data: Room): Promise<boolean> => {
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

    const value = useMemo(
        () => ({
            data,
            create,
            remove,
            selectedPackage,
            selectedPackageId: String(selectedPackage?.id ?? ""),
            selectPackage,
        }),
        [data, selectedPackage],
    )

    return (
        <HouseKeepingContext.Provider
            value={value}
        >
            {children}
        </HouseKeepingContext.Provider>
    );
};

export const useRepoHouseKeepingHook = () => {
    const context = useContext(HouseKeepingContext);

    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}

