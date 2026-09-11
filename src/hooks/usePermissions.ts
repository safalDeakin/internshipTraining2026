import { useAuth } from "../context/AuthContext";
import type { Action, Resources } from "../constants/permission";
import { canAccess } from "../utils/canAccess";

const usePermissions = () => {
  const { user } = useAuth();
  const checkPermission = (resource: Resources, action: Action) => {
    if (!user) {
      return false;
    }
    return canAccess(user.role, resource, action);
  };
  return {
    canAccess: checkPermission,
  };
};

export default usePermissions;
