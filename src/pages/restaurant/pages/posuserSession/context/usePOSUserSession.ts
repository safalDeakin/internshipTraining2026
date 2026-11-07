import { useContext } from "react";
import { POSUserSessionContext } from "../context/POSUserSessionContext";

export const usePOSUserSession = () => {
  const context = useContext(POSUserSessionContext);

  if (!context) {
    throw new Error(
      "usePOSUserSession must be used inside POSUserSessionProvider",
    );
  }

  return context;
};
