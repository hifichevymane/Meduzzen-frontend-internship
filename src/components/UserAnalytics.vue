<template>
  <div class="row border border-2 rounded border-primary w-75 my-5 p-3">
    <h2 class="text-center">{{ $t('components.analytics.user_analytics_heading') }}</h2>
    <div class="col-lg-12 mt-5">
      <h4 class="text-center">{{ $t('components.analytics.average_scores_heading') }}</h4>
      <select-date-input
        :from-date-value="fromDateUserAnalytics"
        :to-date-value="toDateUserAnalytics"
        @on-change-from-date-value="onChangeFromDateValue"
        @on-change-to-date-value="onChangeToDateValue"
        @on-check-analytics="onCheckAnalytics"
      />
      <bar
        v-if="isAnalyticsLoaded"
        :id="userAnalyticsBarId"
        :data="userAnalyticsBarData"
        :options="userAnalyticsBarOptions"
      />
    </div>
    <div class="col-lg-12 mt-5">
      <h4 class="text-center">{{ $t('components.analytics.last_taken_quiz_time_heading') }}</h4>
      <last-quiz-completion-time-analytics
        :bar-data="lastQuizCompletionTimeAnalyticsBarData"
        @on-get-analytics-data="getCurrentUserLastQuizCompletionTimes"
      />
    </div>
  </div>
</template>

<script setup>
import SelectDateInput from './SelectDateInput.vue'
import LastQuizCompletionTimeAnalytics from './LastQuizCompletionTimeAnalytics.vue'

import api from '../api'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
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

const store = useStore()
const i18n = useI18n()

const fromDateUserAnalytics = ref(null)
const toDateUserAnalytics = ref(null)
const isAnalyticsLoaded = ref(false)

const currentUser = computed(() => store.getters['users/getCurrentUser'])
const config = computed(() => store.getters['auth/getAuthConfig'])

// User Quizzes Analytics chart
const userAnalyticsBarId = 'userAnalyticsBar'
const userAnalyticsDatasetsData = ref([])
const userAnalyticsDatasetsDataAverages = computed(() => {
  return userAnalyticsDatasetsData.value.map((quiz) => quiz.average_score)
})
const userAnalyticsDatasetsDataQuizTitles = computed(() => {
  return userAnalyticsDatasetsData.value.map((quiz) => quiz.title)
})

const userAnalyticsBarData = computed(() => {
  return {
    labels: userAnalyticsDatasetsDataQuizTitles.value,
    datasets: [
      {
        label: i18n.t('components.analytics.average_score_chart_label'),
        data: userAnalyticsDatasetsDataAverages.value
      }
    ]
  }
})

const userAnalyticsBarOptions = {
  resposinve: true
}

// Last Quiz Taken Time Analytics
const lastQuizCompletionTimeAnalyticsDatasetData = ref([])
const lastQuizCompletionTimeAnalyticsDatasetDataQuizzes = computed(() => {
  return lastQuizCompletionTimeAnalyticsDatasetData.value.map((quiz) => quiz.title)
})
const lastQuizCompletionTimeAnalyticsDatasetDataTime = computed(() => {
  return lastQuizCompletionTimeAnalyticsDatasetData.value.map((quiz) => quiz.last_taken_quiz_time)
})

const lastQuizCompletionTimeAnalyticsBarData = computed(() => {
  return {
    labels: lastQuizCompletionTimeAnalyticsDatasetDataQuizzes.value,
    datasets: [
      {
        label: i18n.t('components.analytics.last_taken_quiz_time_chart_label'),
        data: lastQuizCompletionTimeAnalyticsDatasetDataTime.value
      }
    ]
  }
})

const getUserAnalyticsDatasetsData = async () => {
  try {
    const body = {
      start_date: fromDateUserAnalytics.value,
      end_date: toDateUserAnalytics.value
    }

    const { data } = await api.post(
      `${import.meta.env.VITE_API_URL}/quizzes/${currentUser.value.id}/selected_user_analytics/`,
      body,
      config.value
    )

    userAnalyticsDatasetsData.value = data
    isAnalyticsLoaded.value = true
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getCurrentUserLastQuizCompletionTimes = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users/${
        currentUser.value.id
      }/last_quizzes_completion_times/`,
      config.value
    )

    lastQuizCompletionTimeAnalyticsDatasetData.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

// Emits
const onChangeFromDateValue = (value) => {
  fromDateUserAnalytics.value = value
}

const onChangeToDateValue = (value) => {
  toDateUserAnalytics.value = value
}

const onCheckAnalytics = async () => {
  await getUserAnalyticsDatasetsData()
}
</script>
