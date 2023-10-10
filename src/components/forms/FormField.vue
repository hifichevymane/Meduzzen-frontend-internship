<template>
  <div class="mb-3" :class="{ 'form-check': type === 'checkbox' }">
    <label :for="id" :class="type === 'checkbox' ? 'form-check-label' : 'form-label'">{{
      label
    }}</label>
    <input
      v-if="type === 'email'"
      v-model="emailField"
      @input="validateEmail"
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': !isValidEmail.value }"
      :id="id"
    />
    <input
      v-else-if="type === 'password'"
      v-model="passwordField"
      @input="$emit('getPassword', passwordField.value)"
      :type="type"
      class="form-control"
      :id="id"
    />
    <input
      v-else-if="id === 'password-repeat'"
      v-model="passwordRepeatField"
      @input="$emit('getRepeatPassword', passwordRepeatField)"
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': !isPasswordRepeated.value }"
      :id="id"
    />
    <input
      v-else
      :type="type"
      :class="type === 'checkbox' ? 'form-check-input' : 'form-control'"
      :id="id"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Form field props
defineProps({
  label: String,
  type: String,
  id: String
})

const emailField = ref('')
const isValidEmail = ref(true)

const passwordField = ref('')
const passwordRepeatField = ref('')
const isPasswordRepeated = ref(true)

// Email validation function
const validateEmail = () => {
  // regular expresion
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  // Compare email field value and regex
  if (emailPattern.test(emailField.value)) {
    isValidEmail.value = true
  } else {
    isValidEmail.value = false
  }
}
</script>
