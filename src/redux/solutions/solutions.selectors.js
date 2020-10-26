import { createSelector } from 'reselect';

const selectSolutions = (state) => state.solutions;

export const selectAllSolutions = createSelector(
  [selectSolutions],
  (solutions) => solutions.allSolutions,
);
