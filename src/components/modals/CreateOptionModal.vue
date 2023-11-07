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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmitOption">
            <div v-if="type === 'options'" class="input-group mb-3">
              <span class="input-group-text">Text:</span>
              <input v-model="optionText" type="text" class="form-control" />
            </div>
            <div v-else class="input-group mb-3">
              <span class="input-group-text">Answer:</span>
              <select v-model="selectedAnswer" class="form-select">
                <option value="default" selected>Chose the answer</option>
                <option v-for="answer in answersList" :key="answer.id" :value="answer">
                  {{ answer.text }}
                </option>
              </select>
            </div>
            <div class="d-flex gap-3 justify-content-end">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">
                Add new option
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '../../api'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const props = defineProps(['modalId', 'type', 'answersList'])
const emit = defineEmits(['onPushNewOption', 'onPushNewAnswer'])

const store = useStore()

const optionText = ref(null)
const selectedAnswer = ref('default')

const modalId = computed(() => props.modalId)
const type = computed(() => props.type)
const answersList = computed(() => props.answersList)

const config = computed(() => store.getters['auth/getAuthConfig'])

const onSubmitOption = async () => {
  try {
    if (type.value === 'options') {
      const body = {
        text: optionText.value
      }
      const { data } = await api.post(
        `${import.meta.env.VITE_API_URL}/answer_options/`,
        body,
        config.value
      )

      emit('onPushNewOption', data)
    } else {
      emit('onPushNewAnswer', selectedAnswer.value)
    }
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}
</script>
