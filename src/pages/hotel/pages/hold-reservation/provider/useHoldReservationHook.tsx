import { useContext } from "react";
import RepoHoldReservationContext from "./HoldReservationContext";

export function useHoldReservationHook() {
    const context = useContext(RepoHoldReservationContext);
    if (!context) throw new Error("useHoldReservation must be used inside HoldReservationProvider");
    return context;
}