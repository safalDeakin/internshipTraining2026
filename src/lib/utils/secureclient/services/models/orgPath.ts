import type { Organization } from "./organization";

export const getOrganizationPath = (
  path: string,
  organization?: Organization | null,
) => {
  if (!organization?.slug) {
    return path;
  }

  return `/${organization.slug}${path}`;
};
