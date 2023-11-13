<template>
  <div class="mb-3 w-25 m-auto">
    <label for="fromDate">{{ $t('components.analytics.date_fields.from') }}</label>
    <input
      v-model="fromDateValue"
      @change="onChangeFromDateValue"
      class="form-control"
      id="fromDate"
      type="date"
    />
  </div>
  <div class="mb-3 w-25 m-auto">
    <label for="toDate">{{ $t('components.analytics.date_fields.to') }}</label>
    <input
      v-model="toDateValue"
      @change="onChangeToDateValue"
      class="form-control"
      id="toDate"
      type="date"
    />
    <button @click="checkAnalytics" class="btn btn-success mt-3 m-auto">
      {{ $t('components.analytics.buttons.check_analytics') }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['fromDateValue', 'toDateValue'])
const emit = defineEmits(['onCheckAnalytics', 'onChangeFromDateValue', 'onChangeToDateValue'])

const fromDateValue = ref(props.fromDateValue)
const toDateValue = ref(props.toDateValue)

const checkAnalytics = () => {
  emit('onCheckAnalytics')
}

const onChangeFromDateValue = () => {
  emit('onChangeFromDateValue', fromDateValue.value)
}

const onChangeToDateValue = () => {
  emit('onChangeToDateValue', toDateValue.value)
}
</script>
