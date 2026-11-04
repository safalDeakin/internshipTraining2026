
import { useMemo, type ReactNode } from "react";
import { posOverviewCmdService, posOverviewQueryService } from "../../../application/services";
import { useSubscription } from "../../../application/useSubscription";


import PosOverviewContext, { type RepoPosOverviewContextType } from "./pos-overviewContext";
import type { POSOverview } from "../../../domain/pos.overview";



// Provider
export const RepoPosOverviewProvider = ({ children }: { children: ReactNode }) => {

    //provider needs to log in, find an organization, or check authorization so ask for AuthService
    const queryService = posOverviewQueryService;
    const cmdService = posOverviewCmdService;

    const { data, loading, error } = useSubscription<POSOverview, string>(queryService);

    const overview = data?.[0] ?? null;

    const create = async (data: POSOverview): Promise<boolean> => {
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

    const value = useMemo<RepoPosOverviewContextType>(
        () => ({
            overview,
            create,
            remove,
        }),
        [overview],
    )


    if (loading) {
        return <div>Loading POS Overviews...</div>;
    }

    if (error) {
        return <div>Unable to load POS Overviews.</div>;
    }

    return (
        <PosOverviewContext.Provider
            value={value}
        >
            {children}
        </PosOverviewContext.Provider>
    );
};



