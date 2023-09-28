<template>
  <form class="col-lg-4">
    <!-- Fields -->
    <form-field
      v-for="field in fields"
      :key="field.id"
      :label="$t(`components.auth_form.fields.${field.label}`)"
      :type="field.type"
      :id="field.inputId"
    />
    <!-- Button -->
    <button type="submit" class="btn btn-primary">
      {{ $t(`components.auth_form.button.${button}`) }}
    </button>
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
