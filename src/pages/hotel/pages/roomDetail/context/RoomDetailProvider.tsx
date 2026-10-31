
import type { ReactNode } from "react";

import { useRoomDetail } from "../../../hooks/roomDetail/useRoomDetail";
import { RoomDetailContext } from "./RoomDetailContext";

type RoomDetailProviderProps = {
    children: ReactNode;
};

export function RoomDetailProvider({
    children,
}: RoomDetailProviderProps) {
    const roomDetail = useRoomDetail();

    return (
        <RoomDetailContext.Provider value={roomDetail}>
            {children}
        </RoomDetailContext.Provider>
    );
}