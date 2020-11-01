export const matchOrganization = (solutions, organization) => {
  for (var i in solutions) {
    if (solutions[i].organizationID === organization.id) {
      solutions[i].organization = organization.orgName;
      solutions[i].imageUrl = organization.logo;
      solutions[i].email = organization.email;
    }
  }
  return solutions;
};

export const approveSolution = (solutions, solutionId) => {
  for (const i in solutions) {
    if (solutions[i].id === solutionId) {
      solutions[i].approved = true;
      // Slice needed to trigger change detection.
      return solutions.slice();
    }
  }
  return solutions;
};
