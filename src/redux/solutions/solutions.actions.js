import { SolutionsActionTypes } from './solutions.types';

export const setSolutions = (solutions) => ({
  type: SolutionsActionTypes.SET_SOLUTIONS,
  payload: solutions,
});

export const pairOrganizationsWithSolutions = (organizations) => ({
  type: SolutionsActionTypes.PAIR_ORGANIZATIONS_WITH_SOLUTIONS,
  payload: organizations,
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

export const addSolution = (solution) => ({
  type: SolutionsActionTypes.ADD_SOLUTION,
  payload: solution,
});
