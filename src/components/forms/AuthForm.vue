<template>
  <form class="col-lg-4">
    <form-field
      v-for="field in fields"
      :key="field.id"
      :label="field.label"
      :type="field.type"
      :id="field.inputId"
    />
    <button type="submit" class="btn btn-primary">{{ button }}</button>
  </form>
</template>

<script setup>
import FormField from './FormField.vue'

// Auth form props
defineProps({
  fields: Array,
  button: String
})
</script>
