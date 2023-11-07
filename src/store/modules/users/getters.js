// Users getters
export default {
  getUsersList(state) {
    return state.usersList;
  },

  getCurrentUser(state) {
    return state.currentUser;
  },

  getErrorMessage(state) {
    return state.errorMessage;
  },

  getCompanyUserWorksIn(state) {
    return state.companyUserWorksIn;
  },

  getIsEmployed(state) {
    return state.isEmployed;
  },
}