export const ROLES = {
  ADMIN: "ADMIN",
  RECEPTIONIST: "RECEPTIONIST",
  WAITER: "WAITER",
} as const;
export type Role = (typeof ROLES)[keyof typeof ROLES];
