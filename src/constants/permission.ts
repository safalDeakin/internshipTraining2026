export const RESOURCES = {
  ROOM: "room",
  RESERVATION: "reservation",
  CUSTOMER: "customer",
  ORDER: "order",
  USER: "user",
} as const;

export const ACTIONS = {
  VIEW: "view",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

export type Resources = (typeof RESOURCES)[keyof typeof RESOURCES];
export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];
