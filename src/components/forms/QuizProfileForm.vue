<template>
  <form @submit.prevent="onSubmitUpdateQuiz">
    <div class="input-group mb-3">
      <span class="input-group-text">Title: </span>
      <input
        v-model="quizInfo.title"
        type="text"
        class="form-control"
        :disabled="!isAbleToEditQuiz"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Description: </span>
      <textarea
        v-model="quizInfo.description"
        class="form-control"
        cols="20"
        :disabled="!isAbleToEditQuiz"
      ></textarea>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Frequency: </span>
      <input v-model="quizInfo.frequency" type="number" class="form-control" disabled />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Creator: </span>
      <input :value="creatorName" type="text" class="form-control" disabled />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Company: </span>
      <input :value="currentCompany.name" type="text" class="form-control" disabled />
    </div>
    <button v-if="isAbleToEditQuiz" type="button" @click="deleteQuiz" class="btn btn-danger mt-3">
      Delete the quiz
    </button>
    <quiz-questions-list
      v-if="isAbleToEditQuiz"
      :questions-list="questionsList"
      :is-able-to-edit-quiz="isAbleToEditQuiz"
      @on-create-option="showCreateOptionModal"
      @on-delete-option="deleteOption"
      @on-create-answer="showCreateAnswerModal"
      @on-delete-answer="deleteAnswer"
      @on-create-question="showCreateQuestionModal"
      @on-delete-question="deleteQuestion"
    />
    <button v-if="isAbleToEditQuiz" type="submit" class="btn btn-success mt-3">Save changes</button>
  </form>
  <create-question-modal
    :modal-id="createQuestionModalId"
    @on-push-new-question="onPushNewQuestion"
  />
  <create-option-modal
    type="options"
    :modal-id="createOptionModalId"
    @on-push-new-option="onPushNewOption"
  />
  <create-option-modal
    type="answers"
    :modal-id="createAnswerModalId"
    :answers-list="currentOptionsList"
    @on-push-new-answer="onPushNewAnswer"
  />
</template>

<script setup>
import CreateQuestionModal from '../modals/CreateQuestionModal.vue'
import CreateOptionModal from '../modals/CreateOptionModal.vue'
import QuizQuestionsList from '../QuizQuestionsList.vue'

import api from '../../api'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Modal } from 'bootstrap'

const router = useRouter()
const route = useRoute()
const store = useStore()

const quizId = route.params.id

const quizInfo = ref({})
const questionsList = ref(null)
const creatorName = ref(null)
const currentQuestion = ref(null)
const currentOptionsList = ref(null)

// Modal windows
const createQuestionModal = ref(null)
const createQuestionModalId = 'createQuestionModal'
const createOptionModal = ref(null)
const createOptionModalId = 'createOptionModalId'
const createAnswerModal = ref(null)
const createAnswerModalId = 'createAnswerModal'

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])
const isCompanyOwner = computed(() => store.getters['users/getIsCompanyOwner'])
const isCompanyAdmin = computed(() => store.getters['users/getIsCompanyAdmin'])

const isAbleToEditQuiz = computed(() => isCompanyOwner.value || isCompanyAdmin.value)

// Emits
const onPushNewQuestion = (value) => {
  questionsList.value.push(value)
}

const onPushNewOption = (value) => {
  currentQuestion.value.options.push(value)
}

const onPushNewAnswer = (value) => {
  currentQuestion.value.answer.push(value)
}

const deleteQuiz = async () => {
  await store.dispatch('quizzes/deleteQuiz', quizId)
  // Go to the previous page
  router.go(-1)
}

const deleteOption = async (selectedOption) => {
  await store.dispatch('quizzes/deleteOption', selectedOption.id)
  // Delete option from options array of question object
  currentQuestion.value.answer = currentQuestion.value.answer.filter(
    (answer) => answer.id !== selectedOption.id
  )
  currentQuestion.value.options = currentQuestion.value.options.filter(
    (option) => option.id !== selectedOption.id
  )
}

const deleteAnswer = (selectedAnswer) => {
  // Delete current option from answers list
  currentQuestion.value.answer = currentQuestion.value.answer.filter(
    (answer) => answer.id !== selectedAnswer.id
  )
}

const deleteQuestion = (selectedQuestionId) => {
  questionsList.value = questionsList.value.filter((question) => question.id !== selectedQuestionId)
}

const onSubmitUpdateQuiz = async () => {
  console.log(questionsList.value)

  const { title, description } = quizInfo.value
  const body = {
    title,
    description,
    questions: questionsList.value.map((question) => question.id),
    company: currentCompany.value.id
  }

  console.log(body)
  await store.dispatch('quizzes/updateQuiz', { body, quizId })
}

const showCreateQuestionModal = () => {
  createQuestionModal.value.show()
}

const showCreateOptionModal = (question) => {
  currentQuestion.value = question
  createOptionModal.value.show()
}

const showCreateAnswerModal = (question) => {
  currentQuestion.value = question
  currentOptionsList.value = question.options
  createAnswerModal.value.show()
}

onMounted(async () => {
  createQuestionModal.value = new Modal(document.getElementById(createQuestionModalId))
  createOptionModal.value = new Modal(document.getElementById(createOptionModalId))
  createAnswerModal.value = new Modal(document.getElementById(createAnswerModalId))

  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/quizzes/${quizId}/`,
      config.value
    )

    quizInfo.value = data
    creatorName.value = data.creator.username
    questionsList.value = data.questions
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
