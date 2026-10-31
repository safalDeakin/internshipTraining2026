
import { createContext, useContext } from "react";
import type { useRoomDetail } from "../../../hooks/roomDetail/useRoomDetail";

export type RoomDetailContextValue = ReturnType<
    typeof useRoomDetail
>;

export const RoomDetailContext =
    createContext<RoomDetailContextValue | null>(null);

export function useRoomDetailContext() {
    const context = useContext(RoomDetailContext);

    if (!context) {
        throw new Error(
            "useRoomDetailContext must be used inside RoomDetailProvider"
        );
    }

    return context;
}
