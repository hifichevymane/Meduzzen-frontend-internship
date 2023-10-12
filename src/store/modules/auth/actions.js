import api from "../../../api";

// Auth actions
export default {
  // Get auth user
  async getAuthUser(ctx, access) {
    // JWT Auth headers
    const config = {
      headers: {
        'Authorization': `Bearer ${access}`,
      }
    };

    // GET request
    const userData = await api
      .get(`${import.meta.env.VITE_API_URL}/auth/users/me/`, config)
      .catch((err) => { console.log(err); });

    // Set data
    ctx.commit('setUserData', userData.data)
  },

  // Login action
  async login(ctx, body) {
    // POST request to get access token
    const loginRes = await api
      .post(`${import.meta.env.VITE_API_URL}/auth/jwt/create/`, body)
      .catch((err) => {
        console.log(err)
      });

    // Wait to dispatch getAuthUser action
    await ctx.dispatch('getAuthUser', loginRes.data.access);

    // Set isAuthenticated = true
    ctx.commit('setIsAuthenticated', true)
    ctx.commit('setAccessLocalStorage', loginRes.data.access);
  },

  // Sign up action
  async signUp(ctx, body) {
    const userData = await api
      .post(`${import.meta.env.VITE_API_URL}/auth/users/`, body)
      .catch((err) => {
        console.log(err)
      });

    // Set user data in store
    ctx.commit('setUserData', userData.data);

    // Body for login
    const loginBody = {
      // email: emailField.value,
      username: body.username,
      password: body.password
    };

    // When sign up automaticaly login
    await ctx.dispatch('login', loginBody);
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