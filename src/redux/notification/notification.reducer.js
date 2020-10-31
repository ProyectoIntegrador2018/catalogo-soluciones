import { NotificationActionTypes } from './notification.types';

const INITIAL_STATE = {
  severity: 'info',
  message: 'jbankjinklj',
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationActionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      }
    default:
      return state;
  }
};

export default notificationReducer;