<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.analytics.company_analytics_heading') }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <!-- All users average score -->
          <h2 class="text-center">
            {{ $t('components.analytics.all_users_average_scores_heading') }}
          </h2>
          <select-date-input
            :from-date-value="fromDateAllUsersAnalytics"
            :to-date-value="toDateAllUsersAnalytics"
            @on-check-analytics="checkAllUsersAnalytics"
            @on-change-from-date-value="onChangeAllUsersFromDateValue"
            @on-change-to-date-value="onChangeToAllUsersDateValue"
          />
          <!-- All users analytics chart -->
          <bar
            v-if="isAllUsersAnalyticsDataLoaded"
            :id="allUsersAnalyticsCanvasId"
            :data="allUsersAnalyticsCanvasData"
          />
          <!-- Selected user analytics -->
          <div class="text-center mt-5">
            <h2>{{ $t('components.analytics.selected_user_analytics_heading') }}</h2>
            <select
              v-model="selectedMember"
              @change="onChangeMember"
              class="form-select form-select-lg w-50 m-auto"
              name="selectMember"
              id="selectMemberId"
            >
              <option value="default" selected>
                {{ $t('components.analytics.select_field_default') }}
              </option>
              <option
                v-for="member in currentCompanyMembersList"
                :key="member.id"
                :value="member.user.id"
              >
                {{ member.user.username }}
              </option>
            </select>
          </div>
          <select-date-input
            :from-date-value="fromDateSelectedUserAnalytics"
            :to-date-value="toDateSelectedUserAnalytics"
            @on-check-analytics="checkSelectedMemberAnalytics"
            @on-change-from-date-value="onChangeFromSelectedMemberDateValue"
            @on-change-to-date-value="onChangeToSelectedMemberDateValue"
          />
          <!-- Selected member analytics chart -->
          <bar
            v-if="isSelectedMemberAnalyticsDataLoaded"
            :id="selectedMemberAnalyticsCanvasId"
            :data="selectedMemberAnalyticsCanvasData"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectDateInput from '../../SelectDateInput.vue'

import api from '../../../api'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

defineProps(['modalId'])

const store = useStore()
const i18n = useI18n()

const selectedMember = ref('default')
const allUsersAnalyticsData = ref([])
const isAllUsersAnalyticsDataLoaded = ref(false)
const selectedMemberAnalyticsData = ref([])
const isSelectedMemberAnalyticsDataLoaded = ref(false)

const fromDateAllUsersAnalytics = ref(null)
const toDateAllUsersAnalytics = ref(null)

const fromDateSelectedUserAnalytics = ref(null)
const toDateSelectedUserAnalytics = ref(null)

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentCompanyMembersList = computed(() => store.getters['companies/getCompanyMembersList'])

// All users analytics canvas
const allUsersAnalyticsCanvasId = 'allUsersAnalyticsCanvas'
const allUsersAnalyticsDataScores = computed(() => {
  return allUsersAnalyticsData.value.map((data) => data.average_score)
})

const allUsersAnalyticsDataUserUsernames = computed(() => {
  return allUsersAnalyticsData.value.map((data) => data.username)
})
// Use computed to easily update data in chart
const allUsersAnalyticsCanvasData = computed(() => {
  return {
    labels: allUsersAnalyticsDataUserUsernames.value,
    datasets: [
      {
        label: i18n.t('components.analytics.average_score_chart_label'),
        data: allUsersAnalyticsDataScores.value
      }
    ]
  }
})

// Selected member analytics canvas
const selectedMemberAnalyticsCanvasId = 'selectedMemberAnalyticsCanvas'
const selectedMemberAnalyticsDataScores = computed(() => {
  return selectedMemberAnalyticsData.value.map((quiz) => quiz.average_score)
})

const selectedMemberAnalyticsDataTitles = computed(() => {
  return selectedMemberAnalyticsData.value.map((quiz) => quiz.title)
})

const selectedMemberAnalyticsCanvasData = computed(() => {
  return {
    labels: selectedMemberAnalyticsDataTitles.value,
    datasets: [
      {
        label: i18n.t('components.analytics.average_score_chart_label'),
        data: selectedMemberAnalyticsDataScores.value
      }
    ]
  }
})

// Emits
const onChangeAllUsersFromDateValue = (value) => {
  fromDateAllUsersAnalytics.value = value
}

const onChangeToAllUsersDateValue = (value) => {
  toDateAllUsersAnalytics.value = value
}

const onChangeFromSelectedMemberDateValue = (value) => {
  fromDateSelectedUserAnalytics.value = value
}

const onChangeToSelectedMemberDateValue = (value) => {
  toDateSelectedUserAnalytics.value = value
}

const getAllUsersAnalyticsData = async () => {
  try {
    const body = {
      start_date: fromDateAllUsersAnalytics.value,
      end_date: toDateAllUsersAnalytics.value
    }

    const { data } = await api.post(
      `${import.meta.env.VITE_API_URL}/users/analytics/`,
      body,
      config.value
    )

    allUsersAnalyticsData.value = data
    isAllUsersAnalyticsDataLoaded.value = true
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getSelectedMemberAnalytics = async () => {
  try {
    const body = {
      start_date: fromDateSelectedUserAnalytics.value,
      end_date: toDateSelectedUserAnalytics.value
    }

    const { data } = await api.post(
      `${import.meta.env.VITE_API_URL}/quizzes/${selectedMember.value}/selected_user_analytics/`,
      body,
      config.value
    )

    selectedMemberAnalyticsData.value = data
    isSelectedMemberAnalyticsDataLoaded.value = true
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const checkAllUsersAnalytics = async () => {
  await getAllUsersAnalyticsData()
}

const checkSelectedMemberAnalytics = async () => {
  await getSelectedMemberAnalytics()
}
</script>
