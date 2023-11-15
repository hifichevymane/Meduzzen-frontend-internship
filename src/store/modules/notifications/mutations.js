export default {
  setNotificationsList(state, data) {
    state.notificationsList = [...data];
  },

  pushNewNotification(state, value) {
    state.notificationsList.push(value);
  },

  deleteNotificationFromList(state, notificationId) {
    state.notificationsList = state.notificationsList.filter(
      (notification) => notification.id !== notificationId
    )
  },

  setIsNewNotificationToastActive(state, value) {
    state.isNewNotificationToastActive = value;
  },
}