import { useContext } from "react";
import { RoomsListContext } from "./RoomsContext";

export const useRooms = () => {
    const context = useContext(RoomsListContext);
    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
};
