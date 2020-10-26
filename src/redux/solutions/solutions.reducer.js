import { SolutionsActionTypes } from './solutions.types';

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
    default:
      return state;
  }
};

export default solutionsReducer;
