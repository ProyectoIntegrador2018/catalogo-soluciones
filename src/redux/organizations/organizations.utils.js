import ACCOUNT_STATUS from '../../constants/account-status';

export const approveOrganization = (organizations, organizationId) => {
  for (const i in organizations) {
    if (organizations[i].id === organizationId) {
      organizations[i].status = ACCOUNT_STATUS.Approved;
      // Slice needed to trigger change detection.
      return organizations.slice();
    }
  }
  return organizations;
};

export const rejectOrganization = (organizations, organizationId) => {
  for (const i in organizations) {
    if (organizations[i].id === organizationId) {
      organizations[i].status = ACCOUNT_STATUS.Rejected;
      // Slice needed to trigger change detection.
      return organizations.slice();
    }
  }
  return organizations;
};
