import { useContext } from "react";
import { POSUserSessionContext } from "../context/PosUserSessionContext";

export const usePOSUserSession = () => {
  const context = useContext(POSUserSessionContext);
  if (!context) {
    throw new Error(
      "usePOSUserSessions must be used within POSUserSessionProvider",
    );
  }
  return context;
};
