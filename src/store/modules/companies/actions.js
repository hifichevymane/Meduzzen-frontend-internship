import api from "../../../api";

export default {
  async updateCompany(ctx, requestData) {
    const config = ctx.rootState.auth.authConfig;

    const companyId = ctx.getters.getCurrentCompany.id;

    try {
      const { data } = await api
        .patch(`${import.meta.env.VITE_API_URL}/companies/${companyId}/`, requestData, config);
      ctx.commit('setCurrentCompany', data);
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  },

  async deleteCompany(ctx) {
    const config = ctx.rootState.auth.authConfig

    const companyId = ctx.getters.getCurrentCompany.id;

    try {
      await api.delete(`${import.meta.env.VITE_API_URL}/companies/${companyId}/`, config);
      ctx.commit('setCurrentCompany', {});
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  },

  async createCompany(ctx, body) {
    const config = ctx.rootState.auth.authConfig

    try {
      api.post(`${import.meta.env.VITE_API_URL}/companies/`, body, config);
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  },

  async sendInviteToUser(ctx, body) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.post(`${import.meta.env.VITE_API_URL}/company_invites/`, body, config);
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  },

  async appointMemberRole(ctx, { body, memberId }) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.patch(
        `${import.meta.env.VITE_API_URL}/company_members/${memberId}/`,
        body,
        config
      );
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
      console.log(err);
    }
  },

  async excludeMember(ctx, memberId) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.delete(
        `${import.meta.env.VITE_API_URL}/company_members/${memberId}/`,
        config
      );
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true })
    }
  },

  async revokeCompanyInvite(ctx, companyInviteId) {
    const config = ctx.rootState.auth.authConfig;
    const body = {
      status: 'revoked'
    }

    try {
      await api.patch(
        `${import.meta.env.VITE_API_URL}/company_invites/${companyInviteId}/`,
        body,
        config
      )
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  },

  async acceptRejectUserRequest(ctx, { body, userRequestId }) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.patch(
        `${import.meta.env.VITE_API_URL}/users_requests/${userRequestId}/`,
        body,
        config
      );
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  }
};