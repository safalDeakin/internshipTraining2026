export type Role = "ADMIN" | "HR_MANAGER" | "RECRUITER";

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
    role: "HR_MANAGER",
    resource: "candidate",
    action: "view",
    effect: "allow",
  },
  {
    role: "HR_MANAGER",
    resource: "candidate",
    action: "approve",
    effect: "allow",
  },
  {
    role: "RECRUITER",
    resource: "candidate",
    action: "view",
    effect: "allow",
  },
  {
    role: "RECRUITER",
    resource: "candidate",
    action: "approve",
    effect: "allow",
  },
];
