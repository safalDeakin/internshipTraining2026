import { useContext } from "react";
import DayActivityContext from "./DayActivityContext";

export function useDayActivity() {
    const context = useContext(DayActivityContext);

    if (!context) {
        throw new Error("useDashboard must be used inside DashboardProvider");
    }

    return context;
}