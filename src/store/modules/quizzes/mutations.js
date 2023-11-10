export default {
  setQuizzesList(state, data) {
    state.quizzesList = [...data];
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

  setIsCreateOptionModalActive(state, value) {
    state.isCreateOptionModalActive = value;
  },

  setIsCreateAnswerModalActive(state, value) {
    state.isCreateAnswerModalActive = value;
  },
};