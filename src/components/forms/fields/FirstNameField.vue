<template>
  <form-field>
    <label for="firstName" class="form-label">{{
      $t(`components.auth_form.fields.${label}`)
    }}</label>
    <input
      v-model="firstNameField"
      @input="getFirstName"
      type="text"
      class="form-control"
      id="firstName"
    />
  </form-field>
</template>

<script setup>
import FormField from './FormField.vue'
import { ref } from 'vue'

defineProps(['label'])
const emit = defineEmits(['getFirstName'])

const firstNameField = ref('')

// Get first name to use it in Parent component
const getFirstName = () => {
  emit('getFirstName', firstNameField.value)
}
</script>
