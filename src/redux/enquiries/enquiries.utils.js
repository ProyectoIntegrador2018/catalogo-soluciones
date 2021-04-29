
export const toggleEnquiryState = (enquiries, payload) => {
  const {id, answered} = payload;
  for (const i in enquiries) {
    if (enquiries[i].id === id) {
      enquiries[i] = {...enquiries[i], answered}
      // Slice needed to trigger change detection.
      return enquiries.slice();
    }
  }

  return enquiries;
};
