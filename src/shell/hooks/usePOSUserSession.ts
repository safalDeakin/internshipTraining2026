import { useContext } from "react";
import { POSUserSessionContext } from "../context/POSUserSessionContext";

//Accesses the main session context	Returns provider data and functions
export const usePOSUserSession = () => {
  const context = useContext(POSUserSessionContext);

  if (!context) {
    throw new Error(
      "usePOSUserSession must be used inside POSUserSessionProvider",
    );
  }

  return context;
};
