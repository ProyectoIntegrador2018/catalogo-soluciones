import { SolutionsActionTypes } from './solutions.types';

export const setSolutions = (solutions) => ({
  type: SolutionsActionTypes.SET_SOLUTIONS,
  payload: solutions,
});

export const pairOrganizationWithSolution = (organization) => ({
  type: SolutionsActionTypes.PAIR_ORGANIZATION_WITH_SOLUTION,
  payload: organization,
});
