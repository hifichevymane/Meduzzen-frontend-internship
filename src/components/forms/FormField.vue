<template>
  <div class="mb-3" :class="{ 'form-check': type === 'checkbox' }">
    <label :for="inputId" :class="isCheckboxLabel">{{ label }}</label>
    <input :type="type" :class="isCheckboxInput" :inputId="inputId" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    inputId: String
  },

  computed: {
    // If type of input is checkbox
    isCheckboxInput() {
      if (this.type === 'checkbox') {
        return 'form-check-input'
      } else {
        return 'form-control'
      }
    },

    isCheckboxLabel() {
      if (this.type === 'checkbox') {
        return 'form-check-label'
      } else {
        return 'form-label'
      }
    }
  }
}
</script>
