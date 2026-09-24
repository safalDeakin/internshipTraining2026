import { organizations } from "../auth/organizations";

// can this user acces those organizational data
class TenantSecurity {
  canAccessTenant(userOrganizationId: number, requestedOrganizationId: number) {
    const userOrganization = organizations.find(
      (org) => org.id === userOrganizationId,
    );
    const requestOrganization = organizations.find(
      (org) => org.id === requestedOrganizationId,
    );
    if (!userOrganization || !requestOrganization) {
      return false;
    }
    return userOrganization.id === requestOrganization.id;
  }
}
export default TenantSecurity;
