// Auth state
export default function state() {
  return {
    // If access token in Local storage = isAuthenticated == true
    isAuthenticated: localStorage.getItem('access') !== null,
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