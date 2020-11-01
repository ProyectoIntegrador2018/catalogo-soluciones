import { NotificationActionTypes } from './notification.types';

export const setNotification = (notification) => ({
  type: NotificationActionTypes.SET_NOTIFICATION,
  payload: notification
});