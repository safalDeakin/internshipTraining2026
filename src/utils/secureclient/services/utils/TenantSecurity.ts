//author:shrjja  correct
//Does this logged-in user belong to the organization they are trying to access?
import type { Organization } from "../models/organization";

const organizations: Organization[] = [
  {
    id: 1,
    name: "Hotel Everest",
    slug: "hotel-everest",
  },
  {
    id: 2,
    name: "Hotel Annapurna",
    slug: "hotel-annapurna",
  },
];

// can this user acces those organizational data
class TenantSecurity {
  //first
  //searches organization list by ID.
  findOrgById(orgId: number): Organization | undefined {
    return organizations.find((org) => org.id === orgId);
  }
  //second
  // instead of ID, it searches using the URL slug
  findOrgFromSlug(organizationSlug: string): Organization | undefined {
    return organizations.find((org) => org.slug === organizationSlug);
  }
  //third //securirty check
  canAccessTenant(
    userOrganizationId: number,
    requestedOrganizationId: number,
  ): boolean {
    const userOrganization = this.findOrgById(userOrganizationId);
    const requestOrganization = this.findOrgById(requestedOrganizationId);
    if (!userOrganization || !requestOrganization) {
      return false;
    }
    return userOrganization.id === requestOrganization.id;
  }
}
export default TenantSecurity;
