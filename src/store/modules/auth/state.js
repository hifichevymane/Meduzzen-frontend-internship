// Auth state
export default function state() {
  return {
    // If access token in Local storage = isAuthenticated == true
    isAuthenticated: localStorage.getItem('access') !== null,
    // User info
    user: {
      email: '',
      username: '',
      firstName: '',
      lastName: ''
    },
  }
}