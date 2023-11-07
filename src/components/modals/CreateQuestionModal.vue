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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new question</h1>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onCreateNewQuestion">
            <div class="input-group mb-3">
              <span class="input-group-text">Text: </span>
              <input v-model="questionText" type="text" class="form-control" />
            </div>
            <h5>Options:</h5>
            <button @click="addNewOption" type="button" class="btn btn-primary mb-4">
              Add new option
            </button>
            <ol>
              <li v-for="option in optionsList" :key="option">
                <div class="input-group mb-3">
                  <input v-model="option.text" type="text" class="form-control" />
                </div>
              </li>
            </ol>
            <h5>Answers:</h5>
            <div v-for="option in optionsList" :key="option" class="form-check">
              <input
                class="form-check-input"
                v-model="option.isAnswer"
                type="checkbox"
                :id="option.text"
              />
              <label class="form-check-label" :for="option.text">{{ option.text }}</label>
            </div>
            <div class="d-flex gap-2 justify-content-end mt-4">
              <button
                @click="clearForm"
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
                Create a question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import api from '../../api'

defineProps(['modalId'])
const emit = defineEmits(['onPushNewQuestion'])

const store = useStore()

const optionsList = ref([])
const questionText = ref(null)

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentUser = computed(() => store.getters['users/getCurrentUser'])

const optionListIds = computed(() => {
  return optionsList.value.map((option) => option.id)
})

const answerOptionsIds = computed(() => {
  return optionsList.value.filter((option) => option.isAnswer).map((option) => option.id)
})

const addNewOption = () => {
  optionsList.value.push({ text: '', isAnswer: false, id: null })
}

const clearForm = () => {
  optionsList.value = []
}

const createNewAnswerOption = async (option) => {
  const body = {
    text: option.text
  }

  try {
    const { data } = await api.post(
      `${import.meta.env.VITE_API_URL}/answer_options/`,
      body,
      config.value
    )

    option.id = data.id
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const onCreateNewQuestion = async () => {
  for (const option of optionsList.value) {
    await createNewAnswerOption(option)
  }

  const body = {
    text: questionText.value,
    options: optionListIds.value,
    answer: answerOptionsIds.value
  }

  try {
    const { data } = await api.post(
      `${import.meta.env.VITE_API_URL}/questions/`,
      body,
      config.value
    )

    const { text, options } = body

    const newQuestion = {
      text,
      options,
      id: data.id,
      creator: currentUser.value,
      answer: optionsList.value.filter((option) => option.isAnswer)
    }

    emit('onPushNewQuestion', newQuestion)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}
</script>
