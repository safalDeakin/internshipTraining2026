import { useSyncExternalStore } from "react";
import { useRepo } from "../context/RepoContext";

export const useReservationReportState = () => {
    const { reservationReportState } = useRepo();

    const state = useSyncExternalStore(
        reservationReportState.subscribe,
        reservationReportState.getSnapshot
    );

    return {
        ...state,

        setSearch: reservationReportState.setSearch,
        setStatus: reservationReportState.setStatus,
        setRoomType: reservationReportState.setRoomType,
        setPaymentStatus:
            reservationReportState.setPaymentStatus,
        setFromDate: reservationReportState.setFromDate,
        setToDate: reservationReportState.setToDate,
        resetFilters: reservationReportState.resetFilters,
    };
};