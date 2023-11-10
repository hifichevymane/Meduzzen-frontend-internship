<template>
  <navbar-item />

  <main-container>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <!-- Questions count -->
        <p class="text-center mt-3 fw-bold">
          {{ currentQuestionIndex + 1 }} / {{ currentQuiz.questions.length }}
        </p>
        <form
          v-if="currentQuestion"
          class="col-lg-6"
          method="post"
          @submit.prevent="onSubmitAnswer"
        >
          <h3>{{ currentQuestion.text }}</h3>
          <p class="fw-semibold">{{ $t('pages.quiz_undergo_page.answer_options') }}:</p>
          <ul class="list-group">
            <li class="list-group-item" v-for="option in currentQuestion.options" :key="option.id">
              <div class="form-check">
                <input
                  class="form-check-input"
                  v-model="currentAnswer"
                  :type="currentQuestion.answer.length > 1 ? 'checkbox' : 'radio'"
                  :id="option.id"
                  :value="option.id"
                />
                <label class="form-check-label" :for="option.id">{{ option.text }}</label>
              </div>
            </li>
          </ul>
          <button v-if="isUserAnswered" type="submit" class="btn btn-primary mt-3">
            <template v-if="!isLastQuestion">
              {{ $t('pages.quiz_undergo_page.buttons.answer') }}
            </template>
            <template v-else> {{ $t('pages.quiz_undergo_page.buttons.finish_quiz') }} </template>
          </button>
        </form>
      </div>
    </div>
  </main-container>
</template>

<script setup>
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'

import api from '../api'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'

const store = useStore()
const router = useRouter()

const currentQuestion = ref(null)
const currentAnswer = ref([])

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentQuiz = computed(() => store.getters['quizzes/getCurrentQuiz'])
const currentQuizResult = computed(() => store.getters['quizzes/getCurrentQuizResult'])
// Keep the track of index of the question in questions list
const currentQuestionIndex = computed(() => store.getters['quizzes/getCurrentQuestionIndex'])
const currentQuestionId = computed(() => store.getters['quizzes/getCurrentQuestionId'])

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === currentQuiz.value.questions.length - 1
})
const isUserAnswerArray = computed(() => currentAnswer.value instanceof Array)

const isUserAnswered = computed(() => {
  if (isUserAnswerArray.value) {
    return currentAnswer.value.length > 0
  } else {
    return currentAnswer.value
  }
})

// To properly calculate quiz scores we have to sort answers list
const sortedAnswerList = computed(() => {
  if (isUserAnswerArray.value) {
    return currentAnswer.value.slice().sort((num1, num2) => num1 - num2)
  } else {
    return [currentAnswer.value].sort((num1, num2) => num1 - num2)
  }
})

const getQuestionData = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/questions/${currentQuestionId.value}`,
      config.value
    )

    currentQuestion.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const onSubmitAnswer = async () => {
  const body = {
    quiz: currentQuiz.value.id,
    question: currentQuestion.value.id,
    answer: sortedAnswerList.value,
    quiz_result: currentQuizResult.value.id
  }

  try {
    await api.post(`${import.meta.env.VITE_API_URL}/users_answers/`, body, config.value)
    // Increase question index number by 1
    store.commit('quizzes/incrementCurrentQuestionIndex')
    store.commit(
      'quizzes/setCurrentQuestionId',
      // Get question id by question index in questions list
      currentQuiz.value.questions[currentQuestionIndex.value].id
    )

    // Clear current answer value
    currentAnswer.value = []
    await getQuestionData()
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }

  if (!isLastQuestion.value) {
    const body = {
      status: 'completed'
    }

    try {
      const { data } = await api.patch(
        `${import.meta.env.VITE_API_URL}/quiz_results/${currentQuizResult.value.id}/`,
        body,
        config.value
      )

      store.commit('quizzes/setCurrentQuizResult', data)
      store.commit('quizzes/setIsUserTakingQuiz', false)
      // Redirect to company page
      router.push({ name: 'CompanyProfile', params: { id: currentQuiz.value.company } })
    } catch (err) {
      store.commit('users/setErrorMessage')
    }
  }
}

onMounted(async () => {
  await getQuestionData()
})
</script>
