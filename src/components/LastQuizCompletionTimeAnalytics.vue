<template>
  <div class="col-lg-12 d-block mb-3">
    <button
      @click="showLastQuizCompletionTimeAnalytics"
      class="btn d-block m-auto"
      :class="isDataLoaded ? 'btn-danger' : 'btn-primary'"
    >
      <template v-if="!isDataLoaded">{{
        $t('components.analytics.buttons.see_last_taken_quiz_times')
      }}</template>
      <template v-else>{{
        $t('components.analytics.buttons.close_last_taken_quiz_times')
      }}</template>
    </button>
    <bar
      v-if="isDataLoaded"
      :id="lastQuizCompletionTimeBarId"
      :data="barData"
      :options="lastQuizCompletionTimeBarOptions"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import 'chartjs-adapter-date-fns'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TimeScale)

const props = defineProps({
  barData: Object
})

const emit = defineEmits(['onGetAnalyticsData'])

const isDataLoaded = ref(false)

const lastQuizCompletionTimeBarId = 'lastQuizCompletionTimeBar'
const barData = computed(() => props.barData)

const lastQuizCompletionTimeBarOptions = {
  scales: {
    y: {
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          day: 'dd.MM.yyyy'
        }
      },
      min: '2023-09-01T01:00:00.000001Z',
      responsive: true
    }
  }
}

const showLastQuizCompletionTimeAnalytics = () => {
  if (!isDataLoaded.value) {
    emit('onGetAnalyticsData')
    isDataLoaded.value = true
  } else isDataLoaded.value = false
}
</script>
