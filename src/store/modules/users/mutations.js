// Users mutations
export default {
  setUsersList(state, data) {
    state.usersList = [...data];
  },

  setCurrentUser(state, data) {
    state.currentUser = { ...data };
  },

  setErrorMessage(state, message) {
    state.errorMessage = message;
  },

  setCompanyUserWorksIn(state, value) {
    state.companyUserWorksIn = value;
  },

  setIsEmployed(state, value) {
    state.isEmployed = value;
  },
}