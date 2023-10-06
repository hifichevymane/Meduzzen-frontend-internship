<template>
  <form-field>
    <label for="passwordRepeat" class="form-label">{{
      $t(`components.auth_form.fields.${label}`)
    }}</label>
    <input
      v-model="passwordRepeatField"
      @input="getPasswordRepeat"
      type="password"
      class="form-control"
      :class="{ 'is-invalid': !props.isPasswordValid }"
      id="passwordRepeat"
    />
  </form-field>
</template>

<script setup>
import FormField from './FormField.vue'
import { ref } from 'vue'

const props = defineProps(['label', 'isPasswordValid'])
const emit = defineEmits(['getPasswordRepeat'])

const passwordRepeatField = ref('')

// Send password to parent component to use it in Parent component
const getPasswordRepeat = () => {
  emit('getPasswordRepeat', passwordRepeatField.value)
}
</script>
