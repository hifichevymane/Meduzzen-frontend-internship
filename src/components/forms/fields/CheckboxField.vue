<template>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="checkbox" />
    <label for="checkbox" class="form-check-label">{{
      $t(`components.auth_form.fields.${label}`)
    }}</label>
  </div>
</template>

<script setup>
defineProps(['label'])
</script>
