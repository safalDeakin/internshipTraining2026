
import { useContext, useSyncExternalStore } from "react";
import { RatePlanContext } from "../context/RatePlanContext";

export function useRatePlan() {
    const store = useContext(RatePlanContext);

    if (!store) {
        throw new Error(
            "useRatePlan must be used within RatePlanProvider",
        );
    }

    const state = useSyncExternalStore(
        store.subscribe,
        store.getSnapshot,
        store.getSnapshot,
    );

    return {
        ...state,
        openAddDialog: store.openAddDialog,
        openUpdateDialog: store.openUpdateDialog,
        closeDialog: store.closeDialog,
        showRoomDetails: store.showRoomDetails,
        closeRoomDetails: store.closeRoomDetails,
        addRoomRate: store.addRoomRate,
        updateTimelineRate: store.updateTimelineRate,
    };
}
