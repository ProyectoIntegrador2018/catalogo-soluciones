import { SolutionsActionTypes } from './solutions.types';

export const setSolutions = (solutions) => ({
  type: SolutionsActionTypes.SET_SOLUTIONS,
  payload: solutions,
});

export const pairOrganizationWithSolution = (organization) => ({
  type: SolutionsActionTypes.PAIR_ORGANIZATION_WITH_SOLUTION,
  payload: organization,
});

export const removeSolution = (solutionId) => ({
  type: SolutionsActionTypes.REMOVE_SOLUTION,
  payload: solutionId,
});

export const adminApproveSolution = (solutionId) => ({
  type: SolutionsActionTypes.APPROVE_SOLUTION,
  payload: solutionId,
});

export const modifySolution = (solution) => ({
  type: SolutionsActionTypes.MODIFY_SOLUTION,
  payload: solution,
});
