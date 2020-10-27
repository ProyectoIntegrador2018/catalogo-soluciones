import { SolutionsActionTypes } from './solutions.types';
import { matchOrganization } from './solutions.utils';

const INITIAL_STATE = {
  allSolutions: null,
};

const solutionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SolutionsActionTypes.SET_SOLUTIONS:
      return {
        ...state,
        allSolutions: action.payload,
      };
    case SolutionsActionTypes.PAIR_ORGANIZATION_WITH_SOLUTION:
      return {
        ...state,
        allSolutions: matchOrganization(state.allSolutions, action.payload),
      };
    case SolutionsActionTypes.REMOVE_SOLUTION:
      return {
        ...state,
        allSolutions: state.allSolutions.filter(
          (solution) => solution.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default solutionsReducer;
