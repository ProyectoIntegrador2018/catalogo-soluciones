import { OrganizationsActionTypes } from './organizations.types';

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
    default:
      return state;
  }
};

export default organizationsReducer;
