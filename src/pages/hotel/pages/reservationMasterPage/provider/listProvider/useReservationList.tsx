import { useContext } from "react";
import { ReservationListContext } from "./ReservationListContext";

export const useReservationList = () => {
    const context = useContext(ReservationListContext);
    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
};
