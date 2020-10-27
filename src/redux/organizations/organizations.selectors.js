import { createSelector } from 'reselect';

const selectOrganizations = (state) => state.organizations;

export const selectAllOrganizations = createSelector(
  [selectOrganizations],
  (organizations) => organizations.allOrganizations,
);

export const selectApprovedOrganizations = createSelector(
  [selectAllOrganizations],
  (organizations) =>
    organizations
      ? organizations.filter((organization) => organization.approved)
      : null,
);

export const selectUnapprovedOrganizations = createSelector(
  [selectAllOrganizations],
  (organizations) =>
    organizations
      ? organizations.filter((organization) => !organization.approved)
      : null,
);
