import { EnquiriesActionTypes } from './enquiries.types';
import {
  toggleEnquiryState,
} from './enquiries.utils';

const INITIAL_STATE = {
  enquiries: null,
};

const enquiriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EnquiriesActionTypes.SET_ENQUIRIES:
      return {
        ...state,
        enquiries: action.payload,
      };
    case EnquiriesActionTypes.TOGGLE_ANSWERED:
      return {
        ...state,
        enquiries: toggleEnquiryState(
          state.enquiries,
          action.payload,
        ),
      };
    default:
      return state;
  }
};

export default enquiriesReducer;
