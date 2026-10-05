//author:shrajja
import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import type { Organization } from "../models/organizations";

type OrganizationContextType = {
  organization: Organization | null; //the current user's organization.
  organizations: Organization[]; //list of org
};
//Creates the context with a default value of undefined
const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined,
);
//children: whatever components are wrapped inside it.
//organizations: the list of organizations, passed in from a parent (probably fetched from an API).
type OrganizationProviderProps = {
  children: ReactNode;
  organizations: Organization[];
};

export const OrganizationProvider = ({
  children,
  organizations = [],
}: OrganizationProviderProps) => {
  //get current logged in user
  const { user } = useAuth();
  const organization =
    organizations.find((org) => org.id === user?.organizationId) ?? null;
  //Everything in children can now read { organization, organizations }.
  return (
    <OrganizationContext.Provider value={{ organization, organizations }}>
      {children}
    </OrganizationContext.Provider>
  );
};
export const useOrganization = () => {
  //Reads the current context value.
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("must use inside provider");
  }
  return context;
};
