//author: Shrjja
//authentication + organization/tenant + authorization are handled through this context.
//defines what is avaivalbe
import { createContext } from "react";
import type { User } from "../services/models/users";
import type { Action, Resources } from "../services/models/permission";
import type { Organization } from "../services/models/organization";

export type AuthContextType = {
  user: User | undefined; //logged in user
  organization: Organization | undefined; //currently selected org
  login: (email: string, password: string) => User; //shape of login fun
  logout: () => void; //no argument return nothing
  setUser: (user: User | undefined) => void; //chnage current user
  isAuthenticated: () => boolean; //user currently authenticated?
  //Is this user allowed to perform this action on this resource in this organization?
  isAuthorized: (
    selectedOrgSlug: string,
    resource: Resources,
    action: Action,
  ) => boolean;
  getOrganizationFromSlug: (
    orgSlug: string | undefined,
  ) => Organization | undefined; //If the slug doesn't exist:then undefined
};

//createContext allowed to share data with many compo
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// console.log("HELOOOOOOo");
export default AuthContext;
