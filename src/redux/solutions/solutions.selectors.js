import { createSelector } from 'reselect';

const selectSolutions = (state) => state.solutions;

export const selectAllSolutions = createSelector(
  [selectSolutions],
  (solutions) => solutions.allSolutions,
);

export const selectApprovedSolutions = createSelector(
  [selectAllSolutions],
  (solutions) =>
    solutions ? solutions.filter((solution) => solution.approved) : null,
);

export const selectUnapprovedSolutions = createSelector(
  [selectAllSolutions],
  (solutions) =>
    solutions ? solutions.filter((solution) => !solution.approved) : null,
);
