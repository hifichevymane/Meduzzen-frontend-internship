<template>
  <div class="mb-3" :class="{ 'form-check': type === 'checkbox' }">
    <label :for="inputId" :class="type === 'checkbox' ? 'form-check-label' : 'form-label'">{{
      label
    }}</label>
    <input
      :type="type"
      :class="type === 'checkbox' ? 'form-check-input' : 'form-control'"
      :inputId="inputId"
    />
  </div>
</template>

<script setup>
// Form field props
defineProps({
  label: String,
  type: String,
  inputId: String
})
</script>
