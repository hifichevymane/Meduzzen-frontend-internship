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
  },

  setIsCompanyMember(state, value) {
    state.isCompanyMember = value;
  },

  setIsCompanyOwner(state, value) {
    state.isCompanyOwner = value;
  },

  setIsCompanyAdmin(state, value) {
    state.isCompanyAdmin = value;
  },
}