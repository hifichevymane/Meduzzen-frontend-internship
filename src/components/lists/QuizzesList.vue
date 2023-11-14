<template>
  <div class="row border border-2 rounded border-primary w-75 py-5 my-4">
    <div class="col-lg-12 mb-2">
      <h2 class="text-center">{{ $t('components.quiz_list.heading') }}</h2>
      <button
        v-if="isAbleToCreateQuiz"
        @click="showCreateModal"
        class="btn btn-primary m-auto d-block my-4"
      >
        {{ $t('components.quiz_list.buttons.create_quiz') }}
      </button>
    </div>
    <div class="col-lg-12 d-flex justify-content-center flex-wrap gap-3">
      <div v-for="quiz in quizzesList" :key="quiz.id" class="col-lg-3 col-md-5 mb-5">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ quiz.title }}</h5>
            <p class="card-text">
              {{ quiz.description }}
            </p>
            <router-link :to="{ name: 'QuizPage', params: { id: quiz.id } }" class="btn btn-primary"
              >{{ $t('components.quiz_list.links.check_quiz') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <create-quiz-modal :modal-id="createQuizModalId" />
</template>

<script setup>
import CreateQuizModal from '../modals/quizzes/CreateQuizModal.vue'

import api from '../../api'
import { ref, onMounted, computed } from 'vue'
import { Modal } from 'bootstrap'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const quizzesList = computed(() => store.getters['quizzes/getQuizzesList'])

// Modal windows
const createQuizModal = ref(null)
const createQuizModalId = 'createQuizModal'

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])
const isCompanyAdmin = computed(() => store.getters['users/getIsCompanyAdmin'])
const isCompanyOwner = computed(() => store.getters['users/getIsCompanyOwner'])
const isAbleToCreateQuiz = computed(() => isCompanyAdmin.value || isCompanyOwner.value)

const showCreateModal = () => {
  createQuizModal.value.show()
}

onMounted(async () => {
  createQuizModal.value = new Modal(document.getElementById(createQuizModalId))

  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/quizzes/${currentCompany.value.id}/company_quizzes/`,
      config.value
    )

    store.commit('quizzes/setQuizzesList', data)
  } catch (err) {
    store.commit('quizzes/setQuizzesList', [])
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
