import { OrganizationsActionTypes } from './organizations.types';

export const setOrganizations = (organizations) => ({
  type: OrganizationsActionTypes.SET_ORGANIZATIONS,
  payload: organizations,
});

export const removeOrganization = (organizationId) => ({
  type: OrganizationsActionTypes.REMOVE_ORGANIZATION,
  payload: organizationId,
});

export const adminApproveOrganization = (organizationId) => ({
  type: OrganizationsActionTypes.APPROVE_ORGANIZATION,
  payload: organizationId,
});

export const adminRejectOrganization = (organizationId) => ({
  type: OrganizationsActionTypes.REJECT_ORGANIZATION,
  payload: organizationId,
});
