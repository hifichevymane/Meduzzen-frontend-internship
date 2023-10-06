<template>
  <form-field>
    <label for="username" class="form-label">{{
      $t(`components.auth_form.fields.${label}`)
    }}</label>
    <input
      v-model="usernameField"
      @input="getUsername"
      type="text"
      class="form-control"
      id="username"
    />
  </form-field>
</template>

<script setup>
import FormField from './FormField.vue'
import { ref } from 'vue'

defineProps(['label'])
const emit = defineEmits(['getUsername'])

const usernameField = ref('')

// Get username to use it in Parent component
const getUsername = () => {
  emit('getUsername', usernameField.value)
}
</script>
