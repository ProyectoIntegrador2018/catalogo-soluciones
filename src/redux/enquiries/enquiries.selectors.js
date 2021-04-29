import { createSelector } from 'reselect';

const selectEnquiries = (state) => state.enquiries;
const selectUser = (state) => state.user;

export const selectAllEnquiries = createSelector(
  [selectEnquiries],
  (enquiries) => enquiries.enquiries,
);

const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser,
);

export const selectMyOrganizationEnquiries = createSelector(
  [selectAllEnquiries, selectCurrentUser],
  (enquiries, user) =>
    enquiries
      ? enquiries.filter((enquiry) => enquiry.organizationID === user.id)
      : [],
);
