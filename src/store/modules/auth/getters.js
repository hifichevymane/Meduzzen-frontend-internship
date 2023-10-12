// Auth getters
export default {
  // Get user data
  getUser(state) {
    return state.user;
  },

  // Get user auth state
  getIsAuthenticated(state) {
    return state.isAuthenticated;
  },

  getAuthConfig(state) {
    return state.authConfig;
  },
}