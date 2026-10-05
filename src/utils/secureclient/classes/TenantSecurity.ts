//author:shrjja
import type { Organization } from "../models/organizations";
// can this user acces those organizational data
class TenantSecurity {
  private organizations: Organization[];
  constructor(organizations: Organization[]) {
    this.organizations = organizations;
  }
  canAccessTenant(userOrganizationId: number, requestedOrganizationId: number) {
    const userOrganization = this.organizations.find(
      (org) => org.id === userOrganizationId,
    );
    const requestOrganization = this.organizations.find(
      (org) => org.id === requestedOrganizationId,
    );
    if (!userOrganization || !requestOrganization) {
      return false;
    }
    return userOrganization.id === requestOrganization.id;
  }
}
export default TenantSecurity;
