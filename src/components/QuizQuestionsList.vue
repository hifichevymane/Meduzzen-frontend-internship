<template>
  <h5 class="mt-3">Questions:</h5>
  <div class="d-flex gap-3">
    <button type="button" @click="showCreateQuestionModal" class="btn btn-primary mb-3">
      Add new question
    </button>
  </div>
  <div class="accordion">
    <div v-for="question in questionsList" :key="question.id" class="accordion-item">
      <h2 class="accordion-header">
        <button
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
            <span class="input-group-text">Text:</span>
            <input
              class="form-control"
              v-model="question.text"
              type="text"
              :disabled="!isAbleToEditQuiz"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Creator:</span>
            <input class="form-control" :value="question.creator.username" type="text" disabled />
          </div>
          <quiz-options-answers-list
            type="options"
            :current-question="question"
            :is-able-to-edit-quiz="isAbleToEditQuiz"
            @on-create-option="showCreateOptionModal(question)"
            @on-delete-option="deleteOption"
          />
          <quiz-options-answers-list
            type="answers"
            :current-question="question"
            :is-able-to-edit-quiz="isAbleToEditQuiz"
            @on-create-option="showCreateAnswerModal(question)"
            @on-delete-option="deleteAnswer"
          />
          <div class="d-flex gap-3">
            <button @click="saveQuestion(question)" type="button" class="btn btn-success">
              Save the question
            </button>
            <button @click="deleteQuestion(question)" type="button" class="btn btn-danger">
              Delete question
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QuizOptionsAnswersList from '../components/QuizOptionsAnswersList.vue'

import api from '../api'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['questionsList', 'isAbleToEditQuiz'])
const emit = defineEmits([
  'onCreateOption',
  'onDeleteOption',
  'onCreateQuestion',
  'onDeleteQuestion',
  'onCreateAnswer',
  'onDeleteAnswer'
])

const store = useStore()

const currentQuestion = ref(null)

const questionsList = computed(() => props.questionsList)
const isAbleToEditQuiz = computed(() => props.isAbleToEditQuiz)

const config = computed(() => store.getters['auth/getAuthConfig'])

const showCreateOptionModal = (question) => {
  emit('onCreateOption', question)
}

const deleteOption = (option) => {
  emit('onDeleteOption', option)
}

const showCreateAnswerModal = (option) => {
  emit('onCreateAnswer', option)
}

const deleteAnswer = (option) => {
  emit('onDeleteAnswer', option)
}

const showCreateQuestionModal = (data) => {
  emit('onCreateQuestion', data)
}

const saveQuestion = async (question) => {
  currentQuestion.value = question

  const body = {
    text: currentQuestion.value.text,
    options: currentQuestion.value.options.map((option) => option.id),
    answer: currentQuestion.value.answer.map((option) => option.id)
  }

  try {
    await api.patch(`${import.meta.env.VITE_API_URL}/questions/${question.id}/`, body, config.value)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
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
