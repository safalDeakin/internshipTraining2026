import { useContext } from "react";
import { ReservationDetailContext } from "./ReservationDetailContext";

export const useReservationDetail = () => {
    const context = useContext(ReservationDetailContext);
    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
};
