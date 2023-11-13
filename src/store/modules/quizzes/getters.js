export default {
  getQuizzesList(state) {
    return state.quizzesList;
  },

  getCurrentQuiz(state) {
    return state.currentQuiz;
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

  getCurrentQuizResult(state) {
    return state.currentQuizResult;
  },

  getCurrentQuizQuestionsList(state) {
    return state.currentQuizQuestionsList;
  },

  getCurrentQuestionIndex(state) {
    return state.currentQuestionIndex;
  },

  getCurrentQuestionId(state) {
    return state.currentQuestionId;
  },

  getIsCreateOptionModalActive(state) {
    return state.isCreateOptionModalActive;
  },

  getIsCreateAnswerModalActive(state) {
    return state.isCreateAnswerModalActive;
  },

  getIsUserTakingQuiz(state) {
    return state.isUserTakingQuiz;
  },
};