import { createSelector } from 'reselect';
import ACCOUNT_STATUS from '../../constants/account-status';

const selectOrganizations = (state) => state.organizations;

export const selectAllOrganizations = createSelector(
  [selectOrganizations],
  (organizations) => organizations.allOrganizations,
);

export const selectApprovedOrganizations = createSelector(
  [selectAllOrganizations],
  (organizations) =>
    organizations
      ? organizations.filter(
          (organization) => organization.status === ACCOUNT_STATUS.Approved,
        )
      : null,
);

export const selectUnapprovedOrganizations = createSelector(
  [selectAllOrganizations],
  (organizations) =>
    organizations
      ? organizations.filter(
          (organization) => organization.status === ACCOUNT_STATUS.Pending,
        )
      : null,
);
