import { EnquiriesActionTypes } from './enquiries.types';

export const setEnquiries = (enquiries) => ({
  type: EnquiriesActionTypes.SET_ENQUIRIES,
  payload: enquiries,
});

export const toggleAnsweredState = (payload) => ({
  type: EnquiriesActionTypes.TOGGLE_ANSWERED,
  payload,
});
