import type { Action, Resources } from "../constants/permission";
import { useAuth } from "../context/AuthContext";
import { policies } from "../data/policies";

const usePermissions = () => {
  const { user } = useAuth();
  const canAccess = (resource: Resources, action: Action) => {
    if (!user) {
      return false;
    }
    const policy = policies.find(
      (pol) =>
        pol.role === user.role &&
        pol.resource === resource &&
        pol.action === action,
    );
    return policy?.effect === "allow";
  };
  return { canAccess };
};

export default usePermissions;
