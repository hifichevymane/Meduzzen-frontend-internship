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
            <template v-if="type === 'options'">
              {{ $t('components.create_option_modal.options.heading') }}
            </template>
            <template v-else>
              {{ $t('components.create_option_modal.answer.heading') }}
            </template>
          </h1>
          <button
            @click="onCloseModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmitOption">
            <div class="input-group mb-3">
              <template v-if="type === 'options'">
                <span class="input-group-text">
                  {{ $t('components.create_option_modal.options.text') }}:
                </span>
                <input v-model="optionText" type="text" class="form-control" />
              </template>
              <template v-else>
                <span class="input-group-text">
                  {{ $t('components.create_option_modal.answer.text') }}:
                </span>
                <select v-model="selectedAnswer" class="form-select">
                  <option value="default" selected>
                    {{ $t('components.create_option_modal.answer.default_select') }}
                  </option>
                  <option v-for="answer in answersList" :key="answer.id" :value="answer">
                    {{ answer.text }}
                  </option>
                </select>
              </template>
            </div>
            <div class="d-flex gap-3 justify-content-end">
              <button
                @click="onCloseModal"
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                {{ $t('components.create_option_modal.buttons.close') }}
              </button>
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">
                <template v-if="type === 'options'">
                  {{ $t('components.create_option_modal.buttons.add_option') }}
                </template>
                <template v-else>
                  {{ $t('components.create_option_modal.buttons.add_answer') }}
                </template>
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
import { useStore } from 'vuex'
import { computed, ref, onBeforeUnmount } from 'vue'

const props = defineProps(['modalId', 'type', 'answersList'])
const emit = defineEmits(['onPushNewOption', 'onPushNewAnswer'])

const store = useStore()

const optionText = ref(null)
const selectedAnswer = ref('default')

const modalId = computed(() => props.modalId)
const type = computed(() => props.type)
const answersList = computed(() => props.answersList)

const config = computed(() => store.getters['auth/getAuthConfig'])

const onCloseModal = () => {
  store.commit('quizzes/setIsCreateOptionModalActive', false)
  store.commit('quizzes/setIsCreateAnswerModalActive', false)
}

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

      // Push new option in options arr
      emit('onPushNewOption', data)
    } else {
      emit('onPushNewAnswer', selectedAnswer.value)
    }
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }

  store.commit('quizzes/setIsCreateOptionModalActive', false)
  store.commit('quizzes/setIsCreateAnswerModalActive', false)
}

onBeforeUnmount(() => {
  store.commit('quizzes/setIsCreateOptionModalActive', false)
  store.commit('quizzes/setIsCreateAnswerModalActive', false)
})
</script>
