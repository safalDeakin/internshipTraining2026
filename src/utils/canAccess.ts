import type { Action, Resources } from "../constants/permission";
import { policies } from "../data/policies";
import type { Role } from "../data/roles";

export const canAccess = (role: Role, resource: Resources, action: Action) => {
  const policy = policies.find(
    (policy) =>
      policy.role === role &&
      policy.resource === resource &&
      policy.action === action,
  );
  return policy?.effect === "allow";
};
