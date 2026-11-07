import type { Action, Resources } from "./permission";

export const permissions: Record<
  string,
  {
    resource: Resources;
    action: Action;
  }
> = {
  restaurant: {
    resource: "restaurant",
    action: "view",
  },

  accomodation: {
    resource: "accommodation",
    action: "view",
  },

  "reservation-report": {
    resource: "reports",
    action: "view",
  },

  "activity-log": {
    resource: "activity-logs",
    action: "view",
  },
  //path
  "test-component": {
    resource: "test-component",
    action: "view",
  },
};
