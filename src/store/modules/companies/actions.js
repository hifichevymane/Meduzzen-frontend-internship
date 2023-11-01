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
};