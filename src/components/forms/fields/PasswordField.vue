<template>
  <form-field>
    <label for="password" class="form-label">{{
      $t(`components.auth_form.fields.${label}`)
    }}</label>
    <input
      v-model="passwordField"
      @input="getPassword"
      type="password"
      class="form-control"
      id="password"
    />
  </form-field>
</template>

<script setup>
import FormField from './FormField.vue'
import { ref } from 'vue'

defineProps(['label'])
const emit = defineEmits(['getPassword'])

const passwordField = ref('')

// Get password to use it in Parent component
const getPassword = () => {
  emit('getPassword', passwordField.value)
}
</script>
