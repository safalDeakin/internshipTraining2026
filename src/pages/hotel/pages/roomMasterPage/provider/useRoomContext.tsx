import { useContext } from "react";
import { RoomsListContext } from "./RoomsContext";

export const useRoomsMasterDetail = () => {
    const context = useContext(RoomsListContext);
    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
};

