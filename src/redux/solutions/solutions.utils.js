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
