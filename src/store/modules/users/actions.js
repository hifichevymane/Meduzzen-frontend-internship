import api from '../../../api'

// Users actions
export default {
  // Update user function
  async updateUser(ctx, updatedData) {
    // Authorization
    const config = ctx.rootState.auth.authConfig;

    const errorText = 'There was an error trying change the user data. Try again';

    // PATCH request to the server
    try {
      const { data } = await api
        .patch(`${import.meta.env.VITE_API_URL}/auth/users/me/`, updatedData, config);
      ctx.commit('auth/setUserData', data, { root: true });
    } catch (err) {
      ctx.commit('setErrorMessage', errorText);
    }
  },

  // Set new profile pic
  async setProfilePic(ctx, formData) {
    // Authorization
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    };

    // Get current user id
    const userId = ctx.getters.getCurrentUser.id;
    const errorText = 'There was an error trying to change profile pic, try again';

    // PATCH request to change image
    await api
      .patch(`${import.meta.env.VITE_API_URL}/users/${userId}/`, formData, config)
      .catch(() => ctx.commit('setErrorMessage', errorText));
  },

  async setNewPassword(ctx, data) {
    // Authorization
    const config = ctx.rootState.auth.authConfig;

    const errorText = 'There was an error trying to change the passsword, try again';

    // POST request
    await api
      .post(`${import.meta.env.VITE_API_URL}/auth/users/set_password/`, data, config)
      .catch(() => ctx.commit('setErrorMessage', errorText));
  },

  async deleteTheUser(ctx) {
    // Authorization
    const config = ctx.rootState.auth.authConfig;

    // Get current id
    const userId = ctx.getters.getCurrentUser.id;
    const errorText = 'There was an error trying to delete the user, try again';

    // DELETE request
    await api
      .delete(`${import.meta.env.VITE_API_URL}/users/${userId}/`, config)
      .catch(() => ctx.commit('setErrorMessage', errorText));

    ctx.commit('auth/setIsAuthenticated', false, { root: true });
  }
}