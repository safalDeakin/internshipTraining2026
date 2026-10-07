//author: Shrajja
//modified by: Safal Shrestha
import type { Organization } from "./models/organization";
import type { Action, Resources } from "./models/permission";
import type { User } from "./models/users";
import AccessControl from "./utils/AccessControl";
import TenantSecurity from "./utils/TenantSecurity";
import UserAuthentication from "./utils/UserAuthentication";

class AuthService {
  accessControl = new AccessControl();
  userAuthentication = new UserAuthentication();
  tenantSecurity = new TenantSecurity();

  isAuthorized = (
    selectedOrgId: number | null,
    user: User,
    resource: Resources,
    action: Action,
  ): boolean => {
    if (!selectedOrgId) {
      return false;
    }

    //tenant check
    const tenantAllowed = this.tenantSecurity.canAccessTenant(
      user.organizationId,
      selectedOrgId,
    );
    console.log("Authserivce tenantallowed", tenantAllowed);

    const accessAllowed = this.accessControl.can(user?.role, resource, action);
    return tenantAllowed && accessAllowed;
  };

  getOrganizationFromSlug = (
    organizationSlug: string | undefined,
  ): Organization | undefined => {
    if (organizationSlug) {
      return this.tenantSecurity.findOrgFromSlug(organizationSlug);
    }
    return undefined;
  };

  getOrganizationById = (
    organizationId: number | undefined,
  ): Organization | undefined => {
    if (organizationId) {
      return this.tenantSecurity.findOrgById(organizationId);
    } else {
      return undefined;
    }
  };

  isAuthenticated = (user: User): boolean => {
    // here we verify if the user token is active or not
    console.log("User HArd AUthenticated " + user);
    return true;
  };

  login(email: string, password: string): User {
    //check each login of user is math with users data or not
    return this.userAuthentication.login(email, password);
  }

  getCurrentUser(): User | undefined {
    return this.userAuthentication.getCurrentUser();
  }

  //logout concept remove from localStorage
  logout(): void {
    localStorage.removeItem("user");
  }
}
export default AuthService;
