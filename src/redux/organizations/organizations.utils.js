export const approveOrganization = (organizations, organizationId) => {
  for (const i in organizations) {
    if (organizations[i].id === organizationId) {
      organizations[i].approved = true;
      // Slice needed to trigger change detection.
      return organizations.slice();
    }
  }
  return organizations;
};
