//author:shrajja
import type { Role } from "./roles";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  organizationId: number;
};
