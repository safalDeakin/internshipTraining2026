import { useContext } from "react";
import RepoHallReservationContext from "./HallReservationContext";

export const useHallReservationHook = () => {
    const context = useContext(RepoHallReservationContext);

    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}


