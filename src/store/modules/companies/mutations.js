export default {
  setCompaniesList(state, data) {
    state.companiesList = [...data];
  },

  setCurrentCompany(state, data) {
    state.currentCompany = { ...data };
  },

  setCompanyMembersList(state, data) {
    state.companyMembersList = [...data];
  },
};