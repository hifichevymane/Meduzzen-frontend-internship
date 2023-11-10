export default {
  getQuizzesList(state) {
    return state.quizzesList;
  },

  getCurrentQuestion(state) {
    return state.currentQuestion;
  },

  getCurrentOption(state) {
    return state.currentOption;
  },

  getCurrentAnswer(state) {
    return state.currentAnswer;
  },

  getIsCreateOptionModalActive(state) {
    return state.isCreateOptionModalActive;
  },

  getIsCreateAnswerModalActive(state) {
    return state.isCreateAnswerModalActive;
  }
};