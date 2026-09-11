import type { Role } from "./roles";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  organizationId: number;
};

export const users: User[] = [
  {
    id: 1,
    name: "Ram",
    email: "ram@gmail.com",
    password: "123456",
    role: "ADMIN",
    organizationId: 1,
  },
  {
    id: 2,
    name: "Sita",
    email: "sita@gmail.com",
    password: "123456",
    role: "RECEPTIONIST",
    organizationId: 1,
  },
  {
    id: 3,
    name: "Hari",
    email: "hari@gmail.com",
    password: "123456",
    role: "WAITER",
    organizationId: 2,
  },
];
