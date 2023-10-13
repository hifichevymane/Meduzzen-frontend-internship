// Auth state
export default function state() {
  return {
    // If access token in Local storage = isAuthenticated == true
    isAuthenticated: localStorage.getItem('access') !== null,
    // Auth config for JWT authentication
    authConfig: {},
    // User info
    user: {
      id: '',
      email: '',
      username: '',
      first_name: '',
      last_name: ''
    },
  }
}