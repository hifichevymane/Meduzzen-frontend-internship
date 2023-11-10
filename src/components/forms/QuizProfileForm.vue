<template>
  <form @submit.prevent="onSubmitUpdateQuiz">
    <div class="input-group mb-3">
      <span class="input-group-text">{{ $t('components.quiz_profile_form.title') }}: </span>
      <input
        v-model="quizInfo.title"
        type="text"
        class="form-control"
        :disabled="!isAbleToEditQuiz"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">{{ $t('components.quiz_profile_form.description') }}: </span>
      <textarea
        v-model="quizInfo.description"
        class="form-control"
        cols="20"
        :disabled="!isAbleToEditQuiz"
      ></textarea>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">{{ $t('components.quiz_profile_form.frequency') }}: </span>
      <input v-model="quizInfo.frequency" type="number" class="form-control" disabled />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">{{ $t('components.quiz_profile_form.creator') }}: </span>
      <input :value="creatorName" type="text" class="form-control" disabled />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">{{ $t('components.quiz_profile_form.company') }}: </span>
      <input :value="currentCompany.name" type="text" class="form-control" disabled />
    </div>
    <button v-if="isAbleToEditQuiz" type="button" @click="deleteQuiz" class="btn btn-danger mt-3">
      {{ $t('components.quiz_profile_form.buttons.delete_quiz') }}
    </button>
    <!-- Questions list -->
    <template v-if="isAbleToEditQuiz">
      <quiz-questions-list
        :questions-list="questionsList"
        :is-able-to-edit-quiz="isAbleToEditQuiz"
        @on-create-question="showCreateQuestionModal"
        @on-delete-question="deleteQuestion"
      />
      <button type="submit" class="btn btn-success mt-3">
        {{ $t('components.quiz_profile_form.buttons.save_quiz') }}
      </button>
    </template>
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
import CreateQuestionModal from '../modals/quizzes/CreateQuestionModal.vue'
import CreateOptionModal from '../modals/quizzes/CreateOptionModal.vue'
import QuizQuestionsList from '../lists/QuizQuestionsList.vue'

import api from '../../api'
import { ref, onMounted, computed, watch } from 'vue'
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
const currentQuestion = computed(() => store.getters['quizzes/getCurrentQuestion'])
const currentOptionsList = computed(() => currentQuestion.value.options)

const isCreateOptionModalActive = computed(
  () => store.getters['quizzes/getIsCreateOptionModalActive']
)
const isCreateAnswerModalActive = computed(() => {
  return store.getters['quizzes/getIsCreateAnswerModalActive']
})

const isAbleToEditQuiz = computed(() => isCompanyOwner.value || isCompanyAdmin.value)

// Emits
const onPushNewQuestion = (value) => {
  questionsList.value.push(value)
}

const onPushNewOption = (value) => {
  store.commit('quizzes/pushNewOption', value)
}

const onPushNewAnswer = (value) => {
  store.commit('quizzes/pushNewAnswer', value)
}

const deleteQuiz = async () => {
  await store.dispatch('quizzes/deleteQuiz', quizId)
  // Go to the previous page
  router.go(-1)
}

const deleteQuestion = (selectedQuestionId) => {
  questionsList.value = questionsList.value.filter((question) => question.id !== selectedQuestionId)
}

const onSubmitUpdateQuiz = async () => {
  const { title, description } = quizInfo.value
  const body = {
    title,
    description,
    questions: questionsList.value.map((question) => question.id),
    company: currentCompany.value.id
  }

  await store.dispatch('quizzes/updateQuiz', { body, quizId })
}

const showCreateQuestionModal = () => {
  createQuestionModal.value.show()
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

watch(
  () => isCreateOptionModalActive.value,
  () => {
    createOptionModal.value.show()
  }
)

watch(
  () => isCreateAnswerModalActive.value,
  () => {
    createAnswerModal.value.show()
  }
)
</script>
