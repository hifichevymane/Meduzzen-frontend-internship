<template>
  <h5 class="mt-3">{{ $t('components.quiz_questions_list.heading') }}:</h5>
  <div class="d-flex gap-3">
    <button type="button" @click="showCreateQuestionModal" class="btn btn-primary mb-3">
      {{ $t('components.quiz_questions_list.buttons.add_question') }}
    </button>
  </div>
  <div class="accordion">
    <div v-for="question in questionsList" :key="question.id" class="accordion-item">
      <h2 class="accordion-header">
        <button
          @click="setCurrentQuestion(question)"
          type="button"
          class="accordion-button collapsed"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapse${question.id}`"
          aria-expanded="false"
          :aria-controls="`collapse${question.id}`"
        >
          {{ question.text }}
        </button>
      </h2>
      <div
        :id="`collapse${question.id}`"
        class="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="input-group mb-3">
            <span class="input-group-text"
              >{{ $t('components.quiz_questions_list.fields.text') }}:
            </span>
            <input
              class="form-control"
              v-model="question.text"
              type="text"
              :disabled="!isAbleToEditQuiz"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"
              >{{ $t('components.quiz_questions_list.fields.creator') }}:
            </span>
            <input class="form-control" :value="question.creator.username" type="text" disabled />
          </div>
          <quiz-options-answers-list
            type="options"
            :current-question="currentQuestion"
            :is-able-to-edit-quiz="isAbleToEditQuiz"
          />
          <quiz-options-answers-list
            type="answers"
            :current-question="currentQuestion"
            :is-able-to-edit-quiz="isAbleToEditQuiz"
          />
          <p v-if="!isValidated" class="fw-bold mb-3">
            {{ $t('components.quiz_questions_list.validation_error') }}
          </p>
          <div class="d-flex gap-3">
            <button @click="saveQuestion(question)" type="button" class="btn btn-success">
              {{ $t('components.quiz_questions_list.buttons.save_question') }}
            </button>
            <button @click="deleteQuestion(question)" type="button" class="btn btn-danger">
              {{ $t('components.quiz_questions_list.buttons.delete_question') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QuizOptionsAnswersList from './QuizOptionsAnswersList.vue'

import api from '../../api'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['questionsList', 'isAbleToEditQuiz'])
const emit = defineEmits(['onCreateQuestion', 'onDeleteQuestion'])

const store = useStore()

const isValidated = ref(true)

const questionsList = computed(() => props.questionsList)
const isAbleToEditQuiz = computed(() => props.isAbleToEditQuiz)

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentQuestion = computed(() => store.getters['quizzes/getCurrentQuestion'])

const showCreateQuestionModal = (data) => {
  emit('onCreateQuestion', data)
}

const saveQuestion = async (question) => {
  if (currentQuestion.value.options.length > 1 && currentQuestion.value.answer.length > 0) {
    isValidated.value = true

    const body = {
      text: currentQuestion.value.text,
      options: currentQuestion.value.options.map((option) => option.id),
      answer: currentQuestion.value.answer.map((option) => option.id)
    }

    try {
      await api.patch(
        `${import.meta.env.VITE_API_URL}/questions/${question.id}/`,
        body,
        config.value
      )
    } catch (err) {
      store.commit('users/setErrorMessage', err.message)
    }
  } else {
    isValidated.value = false
    return
  }
}

const setCurrentQuestion = (question) => {
  store.commit('quizzes/setCurrentQuestion', question)
}

const deleteQuestion = async (question) => {
  try {
    await api.delete(`${import.meta.env.VITE_API_URL}/questions/${question.id}/`, config.value)

    emit('onDeleteQuestion', question.id)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}
</script>
