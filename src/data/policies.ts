import { ROLES, type Role } from "./roles";
import { ACTIONS, RESOURCES } from "../constants/permission";
type Policy = {
  role: Role;
  resource: string;
  action: string;
  effect: "allow" | "deny";
};

export const policies: Policy[] = [
  {
    role: ROLES.ADMIN,
    resource: RESOURCES.ROOM,
    action: ACTIONS.VIEW,
    effect: "allow",
  },
  {
    role: ROLES.ADMIN,
    resource: RESOURCES.ROOM,
    action: ACTIONS.CREATE,
    effect: "allow",
  },
  {
    role: ROLES.ADMIN,
    resource: RESOURCES.ROOM,
    action: ACTIONS.DELETE,
    effect: "allow",
  },
  {
    role: ROLES.ADMIN,
    resource: RESOURCES.ROOM,
    action: ACTIONS.UPDATE,
    effect: "allow",
  },
  //receptionist
  {
    role: ROLES.RECEPTIONIST,
    resource: RESOURCES.ROOM,
    action: ACTIONS.VIEW,
    effect: "allow",
  },
  {
    role: ROLES.RECEPTIONIST,
    resource: RESOURCES.ROOM,
    action: ACTIONS.CREATE,
    effect: "allow",
  },
];
