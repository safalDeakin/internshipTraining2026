import { createContext, type ReactNode, useContext, useRef } from "react";
import { useExternalStore } from "../../../hooks/room-status/useExternalStore";
import { RoomStatusRepository } from "../repositories/RoomStatusRepository";
import { RoomStatusStateholder } from "../state/RoomStatusStateHolder";

const RoomStatusContext = createContext<RoomStatusStateholder | null>(null);

export function RoomStatusProvider({ children }: { children: ReactNode }) {
    const stateholderRef = useRef<RoomStatusStateholder | null>(null);

    if (!stateholderRef.current) {
        stateholderRef.current = new RoomStatusStateholder(new RoomStatusRepository());
    }

    return (
        <RoomStatusContext.Provider value={stateholderRef.current}>
            {children}
        </RoomStatusContext.Provider>
    );
}

export function useRoomStatusStore() {
    const stateholder = useContext(RoomStatusContext);
    if (!stateholder) {
        throw new Error("useRoomStatusStore must be used within RoomStatusProvider");
    }
    const snapshot = useExternalStore(stateholder);
    return { snapshot, stateholder };
}
