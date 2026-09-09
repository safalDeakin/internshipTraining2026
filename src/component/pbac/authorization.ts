import { policy } from "./policies";

export interface User {
  role: string;
}
interface CanAccessParams {
  user: User | null;
  resource: string;
  action: string;
}
export const canAccess = ({ user, resource, action }: CanAccessParams) => {
  if (!user) {
    return false;
  }

  const matchPolicy = policy.find(
    (item) =>
      item.role === user.role &&
      item.resource === resource &&
      item.action === action,
  );
  if (!matchPolicy) {
    return false;
  }
  return matchPolicy.effect === "allow";
};
