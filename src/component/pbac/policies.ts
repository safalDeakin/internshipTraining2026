export type Role = "ADMIN" | "RECEPTIONIST" | "WAITER";

export type Effect = "allow" | "deny";
export interface Policy {
  role: Role;
  resource: string;
  action: string;
  effect: Effect;
}
export const policy: Policy[] = [
  {
    role: "ADMIN",
    resource: "candidate",
    action: "view",
    effect: "allow",
  },
  {
    role: "ADMIN",
    resource: "candidate",
    action: "delete",
    effect: "allow",
  },
  {
    role: "RECEPTIONIST",
    resource: "candidate",
    action: "view",
    effect: "allow",
  },
  {
    role: "RECEPTIONIST",
    resource: "candidate",
    action: "approve",
    effect: "allow",
  },
  {
    role: "WAITER",
    resource: "candidate",
    action: "view",
    effect: "allow",
  },
  {
    role: "WAITER",
    resource: "candidate",
    action: "approve",
    effect: "allow",
  },
];
