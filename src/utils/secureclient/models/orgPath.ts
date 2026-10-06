import type { Organization } from "./organizations";

export const getOrganizationPath = (
  path: string,
  organization?: Organization | null,
) => {
  if (!organization?.slug) {
    return path;
  }

  return `/${organization.slug}${path}`;
};
