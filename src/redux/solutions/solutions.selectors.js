import { createSelector } from 'reselect';

const selectSolutions = (state) => state.solutions;
const selectUser = (state) => state.user;

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

const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser,
);

export const selectUserSolutions = createSelector(
  [selectAllSolutions, selectCurrentUser],
  (solutions, user) =>
    solutions
      ? solutions.filter((solution) => solution.organizationID === user.id)
      : null,
);
