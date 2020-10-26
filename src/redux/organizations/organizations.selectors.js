import { createSelector } from 'reselect';

const selectOrganizations = (state) => state.organizations;

export const selectAllOrganizations = createSelector(
  [selectOrganizations],
  (organizations) => organizations.allOrganizations,
);
