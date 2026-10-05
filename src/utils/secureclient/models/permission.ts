//author:shrajja
//part where we want to control
export const RESOURCES = {
  ROOM: "room",
  ACCOMMODATION: "accommodation",
  CATERING: "catering",
  // PMS: "pms",
  RESTAURANT: "restaurant",
  TESTCOMPONENT: "test-component",
  ACTIVITY: "activity-logs",
  REPORT: "reports",
  CALENDER: "businesscalender",
} as const;

//action sperform in thoese part
export const ACTIONS = {
  VIEW: "view",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
} as const;

export type Resources = (typeof RESOURCES)[keyof typeof RESOURCES];
export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];
