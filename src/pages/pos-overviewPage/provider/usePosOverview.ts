import { useContext } from "react";
import PosOverviewContext from "./pos-overviewContext";

export const usePosOverviewHook = () => {
    const context = useContext(PosOverviewContext);

    if (!context) {
        throw new Error(
            "usePosOverviewHook must be used inside RepoPosOverviewProvider"
        );
    }

    return context;
};

export type DashboardData = ReturnType<typeof usePosOverviewHook>;