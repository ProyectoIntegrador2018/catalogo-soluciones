import { createSelector } from 'reselect';

const notif = (state) => state.notification;

export const selectNotification = createSelector(
  [notif],
  (notification) => notification,
);