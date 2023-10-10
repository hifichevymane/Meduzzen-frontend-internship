// Auth mutations
export default {
  // Set user data
  setUserData(state, data) {
    state.user = { ...data };
  },

  // Set access token in local storage
  setAccessLocalStorage(state, access) {
    localStorage.setItem('access', access);
    // Redirect to home page
    window.location.href = '/';
  },

  // Set isAuthenticated state
  setIsAuthenticated(state, value) {
    state.isAuthenticated = value;
  }
}