<template>
  <form-field>
    <label for="email" class="form-label">{{ $t(`components.auth_form.fields.${label}`) }}</label>
    <input
      v-model="emailField"
      @input="validateEmail"
      type="email"
      class="form-control"
      :class="{ 'is-invalid': !isValidEmail }"
      id="email"
    />
  </form-field>
</template>

<script setup>
import FormField from './FormField.vue'
import { ref } from 'vue'

defineProps(['label'])
const emit = defineEmits(['getEmail'])

const emailField = ref('')
const isValidEmail = ref(true)

// Email validation function
const validateEmail = () => {
  // regular expresion
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  // Compare email field value and regex
  if (emailPattern.test(emailField.value)) {
    isValidEmail.value = true
    // Send value of email in Parent component
    emit('getEmail', emailField.value)
  } else {
    isValidEmail.value = false
  }
}
</script>
