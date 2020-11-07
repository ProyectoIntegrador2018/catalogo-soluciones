export const matchOrganizationsWithSolutions = (solutions, organizations) => {
  for (var i in solutions) {
    for (var j in organizations) {
      if (solutions[i].organizationID === organizations[j].id) {
        solutions[i].organization = organizations[j].orgName;
        solutions[i].imageUrl = organizations[j].logo;
        solutions[i].email = organizations[j].email;
        break;
      }
    }
  }
  return solutions.slice();
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
