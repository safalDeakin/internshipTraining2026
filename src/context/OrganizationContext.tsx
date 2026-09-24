import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "../auth/AuthContext";
import { organizations, type Organization } from "../auth/organizations";

type OrganizationContextType = {
  organization: Organization | null;
};
//handlemultitenant
const OrganizationContext = createContext<OrganizationContextType>({
  organization: null,
});

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  //loggedin user they have org find that
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
