import { OrganizationsActionTypes } from './organizations.types';

export const setOrganizations = (organizations) => ({
  type: OrganizationsActionTypes.SET_ORGANIZATIONS,
  payload: organizations,
});

export const removeOrganization = (organizationId) => ({
  type: OrganizationsActionTypes.REMOVE_ORGANIZATION,
  payload: organizationId,
});
