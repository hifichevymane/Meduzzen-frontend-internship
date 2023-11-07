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

  async deleteOption(ctx, optionId) {
    const config = ctx.rootState.auth.authConfig;

    try {
      await api.delete(
        `${import.meta.env.VITE_API_URL}/answer_options/${optionId}/`,
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