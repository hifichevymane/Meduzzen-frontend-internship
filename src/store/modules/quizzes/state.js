export default function state() {
  return {
    quizzesList: [],
    currrentQuiz: {},
    currentQuestion: {},
    currentQuestionId: null,
    currentOption: {},
    currentAnswer: {},
    currentQuizResult: {},
    currentQuizQuestionsList: [],
    currentQuestionIndex: null,
    isCreateOptionModalActive: null,
    isCreateAnswerModalActive: null,
    isUserTakingQuiz: false,
  }
};
