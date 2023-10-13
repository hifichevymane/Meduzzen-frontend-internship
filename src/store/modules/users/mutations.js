// Users mutations
export default {
  setUsersList(state, data) {
    state.usersList = [...data]
  },

  setCurrentUser(state, data) {
    state.currentUser = { ...data }
  },

  setErrorMessage(state, message) {
    state.errorMessage = message
  }
}