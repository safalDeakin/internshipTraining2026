import { useContext } from "react";
import { ReservationListContext } from "./ReservationContext";

export const useReservationContext = () => {
    const context = useContext(ReservationListContext);
    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
};
