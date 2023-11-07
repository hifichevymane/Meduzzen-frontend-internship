import api from '../../../api'

// Users actions
export default {
  // Update user function
  async updateUser(ctx, updatedData) {
    // Authorization
    const config = ctx.rootState.auth.authConfig;

    // PATCH request to the server
    try {
      const { data } = await api
        .patch(`${import.meta.env.VITE_API_URL}/auth/users/me/`, updatedData, config);
      ctx.commit('auth/setUserData', data, { root: true });
    } catch (err) {
      ctx.commit('setErrorMessage', err.message);
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

    // PATCH request to change image
    try {
      await api.patch(`${import.meta.env.VITE_API_URL}/users/${userId}/`, formData, config);
    } catch (err) {
      ctx.commit('setErrorMessage', err.message);
    }
  },

  async setNewPassword(ctx, data) {
    // Authorization
    const config = ctx.rootState.auth.authConfig;

    // POST request
    try {
      await api.post(`${import.meta.env.VITE_API_URL}/auth/users/set_password/`, data, config);
    } catch (err) {
      ctx.commit('setErrorMessage', err.message);
    }
  },

  async deleteTheUser(ctx) {
    // Authorization
    const config = ctx.rootState.auth.authConfig;

    // Get current id
    const userId = ctx.getters.getCurrentUser.id;

    // DELETE request
    try {
      await api.delete(`${import.meta.env.VITE_API_URL}/users/${userId}/`, config)
    } catch (err) {
      ctx.commit('setErrorMessage', err.message)
    }

    ctx.commit('auth/setIsAuthenticated', false, { root: true });
  },

  // Accept or decline join request to company
  async acceptDeclineJoinRequest(ctx, { body, requestId }) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.patch(
        `${import.meta.env.VITE_API_URL}/company_invites/${requestId}/`,
        body,
        config
      );
    } catch (err) {
      ctx.commit('setErrorMessage', err.message)
    }
  },

  async cancelUserRequest(ctx, requestId) {
    const config = ctx.rootState.auth.authConfig;

    const body = {
      status: 'canceled'
    };

    try {
      await api.patch(
        `${import.meta.env.VITE_API_URL}/users_requests/${requestId}/`,
        body,
        config
      );
    } catch (err) {
      ctx.commit('setErrorMessage', err.message)
    }
  },
}