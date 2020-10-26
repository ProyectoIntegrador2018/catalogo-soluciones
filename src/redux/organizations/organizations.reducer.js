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
    default:
      return state;
  }
};

export default organizationsReducer;
