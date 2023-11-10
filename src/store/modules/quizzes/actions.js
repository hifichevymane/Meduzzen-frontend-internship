import api from '../../../api'

export default {
  async deleteQuiz(ctx, quizId) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.delete(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/`, config.value);
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  },

  async deleteOption(ctx) {
    const config = ctx.rootState.auth.authConfig;
    const currentOption = ctx.getters['getCurrentOption']

    try {
      await api.delete(
        `${import.meta.env.VITE_API_URL}/answer_options/${currentOption.id}/`,
        config
      );
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  },

  async updateQuiz(ctx, { body, quizId }) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.patch(`${import.meta.env.VITE_API_URL}/quizzes/${quizId}/`, body, config);
    } catch (err) {
      ctx.commit('users/setErrorMessage', err.message, { root: true });
    }
  }
};