import { useContext } from "react";
import AuthContext from "./context/AuthContext";

//hooks
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("must use inside provider");
    }
    return context;
};
