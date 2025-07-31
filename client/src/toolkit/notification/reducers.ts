import notificationSlice from "./notificationSlice";
import latestNotificationSlice from "./latestNotificationSlice";

export const notificationReducers = {
  notifications: notificationSlice,
  latestNotifications: latestNotificationSlice,
};
