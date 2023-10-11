// Users mutations
export default {
  setUsersList(state, data) {
    state.usersList = [...data]
  },

  setCurrentUser(state, data) {
    state.currentUser = { ...data }
  }
}