export default {
  setQuizzesList(state, data) {
    state.quizzesList = [...data];
  },

  setCurrentQuiz(state, data) {
    state.currentQuiz = { ...data };
  },

  setCurrentQuestion(state, data) {
    state.currentQuestion = { ...data };
  },

  pushNewOption(state, value) {
    state.currentQuestion.options.push(value);
  },

  deleteOption(state, optionId) {
    state.currentQuestion.answer = state.currentQuestion.answer.filter(
      (answer) => answer.id !== optionId
    );
    state.currentQuestion.options = state.currentQuestion.options.filter(
      (option) => option.id !== optionId
    )
  },

  pushNewAnswer(state, value) {
    state.currentQuestion.answer.push(value);
  },

  deleteAnswer(state, answerId) {
    state.currentQuestion.answer = state.currentQuestion.answer.filter(
      (answer) => answer.id !== answerId
    );
  },

  setCurrentOption(state, data) {
    state.currentOption = { ...data };
  },

  setCurrentAnswer(state, data) {
    state.currentAnswer = { ...data };
  },

  setCurrentQuizResult(state, data) {
    state.currentQuizResult = { ...data };
  },

  setCurrentQuizResultStatus(state, status) {
    state.currentQuizResult.status = status
  },

  setCurrentQuizQuestionsList(state, data) {
    state.currentQuizQuestionsList = [...data];
  },

  setCurrentQuestionIndex(state, value) {
    state.currentQuestionIndex = value;
  },

  incrementCurrentQuestionIndex(state) {
    state.currentQuestionIndex = state.currentQuestionIndex + 1;
  },

  setCurrentQuestionId(state, value) {
    state.currentQuestionId = value
  },

  setIsCreateOptionModalActive(state, value) {
    state.isCreateOptionModalActive = value;
  },

  setIsCreateAnswerModalActive(state, value) {
    state.isCreateAnswerModalActive = value;
  },

  setIsUserTakingQuiz(state, value) {
    state.isUserTakingQuiz = value;
  },
};