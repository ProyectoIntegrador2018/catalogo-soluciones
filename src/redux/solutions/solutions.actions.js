import { SolutionsActionTypes } from './solutions.types';

export const setSolutions = (solutions) => ({
  type: SolutionsActionTypes.SET_SOLUTIONS,
  payload: solutions,
});
