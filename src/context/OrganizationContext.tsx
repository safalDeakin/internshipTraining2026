import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { organizations } from "../data/organizations";

type Organization = {
  id: number;
  name: string;
};
type OrganizationContextType = {
  organization: Organization | null;
};
const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined,
);

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const organization =
    organizations.find((org) => org.id === user?.organizationId) ?? null;
  return (
    <OrganizationContext.Provider value={{ organization }}>
      {children}
    </OrganizationContext.Provider>
  );
};
export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("must use inside provider");
  }
  return context;
};
