<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.create_quiz_modal.heading') }}
          </h1>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmitCreateQuiz">
            <div class="mb-3">
              <label for="quizTitle" class="form-label"
                >{{ $t('components.create_quiz_modal.title') }}:
              </label>
              <input v-model="titleField" type="text" class="form-control" id="quizTitle" />
            </div>
            <div class="mb-3">
              <label for="quizDescription" class="form-label"
                >{{ $t('components.create_quiz_modal.description') }}:
              </label>
              <textarea
                v-model="descriptionField"
                class="form-control"
                :placeholder="$t('components.create_quiz_modal.description_placeholder')"
                id="quizDescription"
                cols="20"
              ></textarea>
            </div>
            <div class="d-flex gap-2 justify-content-end">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                {{ $t('components.create_quiz_modal.buttons.close') }}
              </button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                {{ $t('components.create_quiz_modal.buttons.submit') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '../../../api'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

defineProps(['modalId'])

const router = useRouter()
const store = useStore()

const questionsList = ref(null)
const titleField = ref(null)
const descriptionField = ref(null)

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])

const onSubmitCreateQuiz = async () => {
  const body = {
    company: currentCompany.value.id,
    title: titleField.value,
    description: descriptionField.value,
    questions: []
  }

  try {
    const { data } = await api.post(`${import.meta.env.VITE_API_URL}/quizzes/`, body, config.value)

    const companyQuizzes = await api.get(
      `${import.meta.env.VITE_API_URL}/quizzes/${currentCompany.value.id}/company_quizzes/`,
      config.value
    )

    store.commit('quizzes/setQuizzesList', companyQuizzes.data)
    router.push({ name: 'QuizPage', params: { id: data.id } }) // Redirect to created quizz
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  try {
    const { data } = await api.get(`${import.meta.env.VITE_API_URL}/questions/`, config.value)

    questionsList.value = data.results
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
