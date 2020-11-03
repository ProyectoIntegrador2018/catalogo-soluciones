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

export const editSolution = (solutions, solution) => {
  for (const i in solutions) {
    if (solutions[i].id === solution.id) {
      solutions[i].solutionName = solution.solutionName;
      solutions[i].descriptionPitch = solution.descriptionPitch;
      solutions[i].descriptionSuccess = solution.descriptionsuccess;
      solutions[i].price = solution.price;
      // Slice needed to trigger change detection.
      return solutions.slice();
    }
  }

  return solutions;
};

export const addToSolutions = (solutions, solution) => {
  solutions.push(solution);
  return solutions.slice();
};
