import { useSyncExternalStore } from "react";
import { ReservationStateHolder } from "../states/ReservationStateHolder";

export const useReservationState = (stateHolder: ReservationStateHolder) => {
    const snapshot = useSyncExternalStore(
        stateHolder.subscribe,
        stateHolder.getSnapshot
    );

    return {
        ...snapshot,
        setSearch: stateHolder.setSearch.bind(stateHolder),
        selectReservation:
            stateHolder.selectReservation.bind(stateHolder),
    };
};


// const {
//     reservations,
//     search,
//     selectedReservationId,
//     setSearch,
//     selectReservation
// } = useReservationState(reservationState);