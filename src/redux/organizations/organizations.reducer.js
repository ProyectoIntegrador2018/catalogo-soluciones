import { OrganizationsActionTypes } from './organizations.types';
import { approveOrganization, rejectOrganization } from './organizations.utils';

const INITIAL_STATE = {
  allOrganizations: null,
};

const organizationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrganizationsActionTypes.SET_ORGANIZATIONS:
      return {
        ...state,
        allOrganizations: action.payload,
      };
    case OrganizationsActionTypes.REMOVE_ORGANIZATION:
      return {
        ...state,
        allOrganizations: state.allOrganizations.filter(
          (organization) => organization.id !== action.payload,
        ),
      };
    case OrganizationsActionTypes.APPROVE_ORGANIZATION:
      return {
        ...state,
        allOrganizations: approveOrganization(
          state.allOrganizations,
          action.payload,
        ),
      };
    case OrganizationsActionTypes.REJECT_ORGANIZATION:
      return {
        ...state,
        allOrganizations: rejectOrganization(
          state.allOrganizations,
          action.payload,
        ),
      };
    default:
      return state;
  }
};

export default organizationsReducer;
