import { createContext } from "react";
import type { GuestRequest } from "../../../../../domain/GuestRequest";

export type RepoGuestRequestContextType = {
  title: string;
  data: GuestRequest[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  getId: (id: GuestRequest) => string;

  create: (data: GuestRequest) => Promise<boolean>;
  update: (id: string, changes: Partial<GuestRequest>) => Promise<boolean>;
  remove: (id: string) => Promise<boolean | DOMException>;
};

const RepoGuestRequestContext =
  createContext<RepoGuestRequestContextType | null>(null);

export default RepoGuestRequestContext;
