import api from "../../../api";

// Auth actions
export default {
  // Get auth user
  async getAuthUser(ctx, access) {
    // JWT Auth headers
    ctx.commit('setAuthConfig', access);

    const errorMessage = 'There was an error getting user. Try again'

    // GET request
    try {
      const { data } = await api
        .get(`${import.meta.env.VITE_API_URL}/auth/users/me/`, ctx.state.authConfig);
      // Set data
      ctx.commit('setUserData', data);
    } catch (err) {
      ctx.commit('users/setErrorMessage', errorMessage, { root: true })
    }
  },

  // Login action
  async login(ctx, body) {

    const errorMessage = 'There was an error logging user. Try again'

    // POST request to get access token
    try {
      const { data } = await api
        .post(`${import.meta.env.VITE_API_URL}/auth/jwt/create/`, body);

      // Wait to dispatch getAuthUser action
      await ctx.dispatch('getAuthUser', data.access);
      // Set isAuthenticated = true
      ctx.commit('setIsAuthenticated', true)
      ctx.commit('setAccessLocalStorage', data.access);
    } catch (err) {
      ctx.commit('users/setErrorMessage', errorMessage, { root: true })
    }
  },

  // Sign up action
  async signUp(ctx, body) {

    const errorMessage = 'There was an error. Try again'

    // POST request
    try {
      const { data } = await api
        .post(`${import.meta.env.VITE_API_URL}/auth/users/`, body);
      // Set user data in store
      ctx.commit('setUserData', data);

      // Body for login
      const loginBody = {
        // email: emailField.value,
        username: body.username,
        password: body.password
      };

      // When sign up automaticaly login
      await ctx.dispatch('login', loginBody);
    } catch (err) {
      ctx.commit('users/setErrorMessage', errorMessage, { root: true })
    }
  },

  // googleAuthenticate action (DOESN'T WORK PROPERLY)
  async googleAuthenticate(ctx, state, code) {
    if (state && code && !localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const details = {
        state,
        code
      }
      const formBody = Object.keys(details)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
        .join('&')
      try {
        const res = await api.post(
          `${import.meta.env.VITE_API_URL}/auth/o/google-oauth2/?${formBody}`,
          config
        )
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}