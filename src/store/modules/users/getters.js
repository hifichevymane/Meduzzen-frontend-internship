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

  getIsCompanyMember(state) {
    return state.isCompanyMember;
  },

  getIsCompanyOwner(state) {
    return state.isCompanyOwner;
  },

  getIsCompanyAdmin(state) {
    return state.isCompanyAdmin;
  },

  getCompanyUserWorksIn(state) {
    return state.companyUserWorksIn;
  },

  getIsEmployed(state) {
    return state.isEmployed;
  },
}