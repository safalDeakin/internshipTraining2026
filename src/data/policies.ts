import {
  ACTIONS,
  RESOURCES,
  type Action,
  type Resources,
} from "../constants/permission";
import { ROLES, type Role } from "./roles";

type Policy = {
  role: Role;
  resource: Resources;
  action: Action;
  effect: "allow" | "deny";
};

export const policies: Policy[] = [
  //admin
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
    action: ACTIONS.UPDATE,
    effect: "allow",
  },
  {
    role: ROLES.ADMIN,
    resource: RESOURCES.ROOM,
    action: ACTIONS.DELETE,
    effect: "allow",
  },
  //reception
  {
    role: ROLES.RECEPTIONIST,
    resource: RESOURCES.ROOM,
    action: ACTIONS.VIEW,
    effect: "allow",
  },
  {
    role: ROLES.RECEPTIONIST,
    resource: RESOURCES.RESERVATION,
    action: ACTIONS.CREATE,
    effect: "allow",
  },

  //waiter
  {
    role: ROLES.WAITER,
    resource: RESOURCES.ORDER,
    action: ACTIONS.VIEW,
    effect: "allow",
  },
  {
    role: ROLES.WAITER,
    resource: RESOURCES.ORDER,
    action: ACTIONS.CREATE,
    effect: "allow",
  },
];
