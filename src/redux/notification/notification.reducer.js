import { NotificationActionTypes } from './notification.types';

const INITIAL_STATE = {
  severity: 'info',
  message: '',
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationActionTypes.SET_NOTIFICATION:
      return {
        ...state,
        severity: action.payload.severity,
        message: action.payload.message,
      }
    default:
      return state;
  }
};

export default notificationReducer;