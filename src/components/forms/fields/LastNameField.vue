<template>
  <form-field>
    <label for="lastName" class="form-label">{{
      $t(`components.auth_form.fields.${label}`)
    }}</label>
    <input
      v-model="lastNameField"
      @input="getLastName"
      type="text"
      class="form-control"
      id="lastName"
    />
  </form-field>
</template>

<script setup>
import FormField from './FormField.vue'
import { ref } from 'vue'

defineProps(['label'])
const emit = defineEmits(['getLastName'])

const lastNameField = ref('')

// Get last name to use it in Parent component
const getLastName = () => {
  emit('getLastName', lastNameField.value)
}
</script>
