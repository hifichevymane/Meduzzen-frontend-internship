<template>
  <p v-if="type === 'options'" class="fw-bold">
    {{ $t('components.quiz_options_answers_list.options.heading') }}:
  </p>
  <p v-else class="fw-bold">{{ $t('components.quiz_options_answers_list.answer.heading') }}:</p>
  <button
    v-if="type === 'options'"
    @click="showCreateOptionModal"
    type="button"
    class="btn btn-primary"
  >
    {{ $t('components.quiz_options_answers_list.options.buttons.add_option') }}
  </button>
  <button v-else @click="showCreateAnswerModal" type="button" class="btn btn-primary">
    {{ $t('components.quiz_options_answers_list.answer.buttons.add_answer') }}
  </button>
  <ol v-if="type === 'options'">
    <li v-for="option in currentQuestion.options" :key="option.id" class="mt-2">
      <div class="d-flex justify-content-between border-bottom align-items-center">
        {{ option.text }}
        <button @click="deleteOption(option)" type="button" class="btn btn-danger my-2">
          {{ $t('components.quiz_options_answers_list.options.buttons.delete_option') }}
        </button>
      </div>
    </li>
  </ol>
  <ol v-else>
    <li v-for="option in currentQuestion.answer" :key="option.id" class="mt-2">
      <div class="d-flex justify-content-between border-bottom align-items-center">
        {{ option.text }}
        <button @click="deleteAnswer(option)" type="button" class="btn btn-danger my-2">
          {{ $t('components.quiz_options_answers_list.answer.buttons.delete_answer') }}
        </button>
      </div>
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['currentQuestion', 'type', 'isAbleToEditQuiz'])

const store = useStore()

const type = computed(() => props.type)
const currentQuestion = computed(() => props.currentQuestion)

const showCreateOptionModal = () => {
  store.commit('quizzes/setIsCreateOptionModalActive', true)
}

const showCreateAnswerModal = () => {
  store.commit('quizzes/setIsCreateAnswerModalActive', true)
}

const deleteOption = async (option) => {
  store.commit('quizzes/setCurrentOption', option)
  await store.dispatch('quizzes/deleteOption')
  store.commit('quizzes/deleteOption', option.id)
}

const deleteAnswer = (answer) => {
  store.commit('quizzes/setCurrentAnswer', answer)
  store.commit('quizzes/deleteAnswer', answer.id)
}
</script>
