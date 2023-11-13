export default {
  setCompaniesList(state, data) {
    state.companiesList = [...data];
  },

  setCurrentCompany(state, data) {
    state.currentCompany = { ...data };
  },

  setCompanyMembers(state, data) {
    state.companyMembers = [...data];
  },
};