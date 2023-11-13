<template>
  <h2 class="text-center my-3">{{ $t('components.export_data.heading') }}</h2>
  <!-- Additional options for export data -->
  <slot> </slot>
  <select v-model="exportDataFileType" class="form-select w-25 m-auto mb-2">
    <option value="csv" selected>CSV</option>
    <option value="json">JSON</option>
  </select>
  <button @click="exportQuizResultsData" class="btn btn-primary m-auto d-block mb-3">
    {{ $t('components.export_data.buttons.export_quiz_results') }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['onExportData'])

const exportDataFileType = ref('csv')

const exportQuizResultsData = () => {
  emit('onExportData', exportDataFileType.value)
}
</script>
