import api from '../../../api'

// Users actions
export default {
  // Update user function
  async updateUser(ctx, data) {
    // Authorization
    const config = ctx.rootState.auth.authConfig

    // PATCH request to the server
    const response = await api
      .patch(`${import.meta.env.VITE_API_URL}/auth/users/me/`, data, config)
      .catch((err) => console.log(err))

    ctx.commit('auth/setUserData', response.data, { root: true })
  },

  // Set new profile pic
  async setProfilePic(ctx, formData) {
    // Authorization
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    }

    // Get current user id
    const userId = ctx.getters.getCurrentUser.id

    // PATCH request to change image
    await api
      .patch(`${import.meta.env.VITE_API_URL}/users/${userId}/`, formData, config)
      .catch((err) => console.log(err))
  },

  async setNewPassword(ctx, data) {
    // Authorization
    const config = ctx.rootState.auth.authConfig

    // POST request
    await api
      .post(`${import.meta.env.VITE_API_URL}/auth/users/set_password/`, data, config)
      .catch((err) => console.log(err));
  },

  async deleteTheUser(ctx) {
    // Authorization
    const config = ctx.rootState.auth.authConfig

    // Get current id
    const userId = ctx.getters.getCurrentUser.id

    // DELETE request
    await api
      .delete(`${import.meta.env.VITE_API_URL}/users/${userId}/`, config)
      .catch((err) => console.log(err))

    ctx.commit('auth/setIsAuthenticated', false, { root: true })
  }
}