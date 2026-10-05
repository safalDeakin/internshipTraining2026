//author:shrjja

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

  findOrgById(orgId: number): Organization | undefined {
    return organizations.find(
      (org) => org.id === orgId,
    );
  }

  findOrgFromSlug(organizationSlug: string): Organization | undefined {
    return organizations.find(
      (org) => org.slug === organizationSlug,
    );
  }

  canAccessTenant(userOrganizationId: number, requestedOrganizationId: number) {
    const userOrganization = this.findOrgById(userOrganizationId)

    const requestOrganization = this.findOrgById(requestedOrganizationId)

    if (!userOrganization || !requestOrganization) {
      return false;
    }
    return userOrganization.id === requestOrganization.id;
  }
}
export default TenantSecurity;
