import { useContext } from "react";
import RepoGuestRequestContext from "./GuestRequestContext";

export const useGuestRequestHook = () => {
    const context = useContext(RepoGuestRequestContext);

    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
}


