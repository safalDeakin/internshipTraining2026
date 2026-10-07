import { useSyncExternalStore } from "react";
import { useAppContext } from "../context/AppContext";

export function useReservationState() {
    const { reservationState } =
        useAppContext();

    const snapshot =
        useSyncExternalStore(
            reservationState.subscribe,
            reservationState.getSnapshot
        );

    return {
        ...snapshot,
        setSearch: reservationState.setSearch.bind(reservationState),
        selectReservation: reservationState.selectReservation.bind(reservationState),
        clearSelectedReservation: reservationState.clearSelectedReservation.bind(reservationState),
        loadReservations: reservationState.loadReservations.bind(reservationState),
        updateReservation: reservationState.updateReservation.bind(reservationState),
        deleteReservation: reservationState.deleteReservation.bind(reservationState),
        cancelReservation: reservationState.cancelReservation.bind(reservationState),
        checkInReservation: reservationState.checkInReservation.bind(reservationState),
        checkOutReservation: reservationState.checkOutReservation.bind(reservationState),
    };
}