import { type Role } from "./roles";
import { type Action, type Resources } from "./permission";
type Policy = {
  role: Role;
  resource: Resources;
  action: Action[];
  // effect: "allow" | "deny";
};

class AccessControl {
  private policies: Policy[] = [
    //for admin access
    {
      role: "ADMIN",
      resource: "restaurant",
      action: ["view", "create", "update", "delete"],
    },
    {
      role: "ADMIN",
      resource: "accommodation",
      action: ["view", "create", "update", "delete"],
    },
    {
      role: "ADMIN",
      resource: "catering",
      action: ["view", "create", "update", "delete"],
    },
    {
      role: "ADMIN",
      resource: "pms",
      action: ["view", "create", "update", "delete"],
    },
    //for receptionist
    {
      role: "RECEPTIONIST",
      resource: "restaurant",
      action: ["view"],
    },
    {
      role: "RECEPTIONIST",
      resource: "accommodation",
      action: ["view", "create"],
    },
    //for waiter
    {
      role: "WAITER",
      resource: "restaurant",
      action: ["view"],
    },
    {
      role: "WAITER",
      resource: "accommodation",
      action: ["view"],
    },
    {
      role: "WAITER",
      resource: "catering",
      action: ["view"],
    },
  ];
  can(role: Role, resource: Resources, action: Action) {
    const policy = this.policies.find(
      (policy) => policy.role === role && policy.resource === resource,
    );
    if (!policy) {
      return false;
    }
    return policy.action.includes(action);
  }
}
export default AccessControl;
