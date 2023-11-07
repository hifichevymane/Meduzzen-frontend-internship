<template>
  <p v-if="type === 'options'">Options:</p>
  <p v-else>Answers:</p>
  <button
    v-if="type === 'options'"
    @click="showCreateOptionModal"
    type="button"
    class="btn btn-primary"
  >
    Add new option
  </button>
  <button v-else @click="showCreateOptionModal" type="button" class="btn btn-primary">
    Add new answer
  </button>
  <ol v-if="type === 'options'">
    <li v-for="option in currentQuestion.options" :key="option.id" class="mt-2">
      <div class="d-flex justify-content-between border-bottom align-items-center">
        {{ option.text }}
        <button @click="deleteOption(option)" type="button" class="btn btn-danger my-2">
          Delete the option
        </button>
      </div>
    </li>
  </ol>
  <ol v-else>
    <li v-for="option in currentQuestion.answer" :key="option.id" class="mt-2">
      <div class="d-flex justify-content-between border-bottom align-items-center">
        {{ option.text }}
        <button @click="deleteOption(option)" type="button" class="btn btn-danger my-2">
          Delete the answer
        </button>
      </div>
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['currentQuestion', 'type', 'isAbleToEditQuiz'])
const emit = defineEmits(['onCreateOption', 'onDeleteOption'])

const type = computed(() => props.type)
const currentQuestion = computed(() => props.currentQuestion)

const showCreateOptionModal = () => {
  emit('onCreateOption')
}

const deleteOption = (option) => {
  emit('onDeleteOption', option)
}
</script>
