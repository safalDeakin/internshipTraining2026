//suhtor: Shrjja
import { createContext } from "react";
import type { User } from "../services/models/users";
import type { Action, Resources } from "../services/models/permission";
import type { Organization } from "../services/models/organization";

//to use service make object of that class
type AuthContextType = {
  user: User | undefined;
  organization: Organization | undefined;
  login: (email: string, password: string) => User;
  logout: () => void;
  setUser: (user: User | undefined) => void;
  isAuthenticated: () => boolean;
  isAuthorized: (selectedOrgSlug: string, resource: Resources, action: Action) => boolean
  getOrganizationFromSlug: (orgSlug: string | undefined) => Organization | undefined
};

//createContext allowed to share data with many compo
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

//provider is act as bridge between service and ui
