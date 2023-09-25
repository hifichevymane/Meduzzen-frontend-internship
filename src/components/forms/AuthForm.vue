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

<script>
import FormField from './FormField.vue'

export default {
  components: {
    FormField
  },

  props: {
    fields: Array,
    button: String
  }
}
</script>
