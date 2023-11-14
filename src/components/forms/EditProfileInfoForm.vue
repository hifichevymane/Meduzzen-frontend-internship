<template>
  <form method="post" @submit.prevent="onSubmitUpdateUserData">
    <div v-for="key in userInfoKeys" :key="key" class="input-group mb-3">
      <span class="input-group-text" :id="key">{{ $t(`components.profile_item.${key}`) }}:</span>
      <input
        :type="getInputType(key)"
        class="form-control"
        aria-label="Sizing example input"
        :aria-describedby="key"
        v-model="userInfo[key]"
        :disabled="!isAbleToEdit"
      />
    </div>
    <div v-if="isAbleToEdit">
      <div class="input-group mb-3">
        <span class="input-group-text" id="old-password"
          >{{ $t('components.profile_item.old_password') }}:</span
        >
        <input
          type="password"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="old-password"
          v-model="oldPasswordField"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="new-password"
          >{{ $t('components.profile_item.new_password') }}:</span
        >
        <input
          type="password"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="new-password"
          v-model="newPasswordField"
        />
      </div>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">{{ $t('components.auth_form.fields.works_in') }}:</span>
      <input class="form-control" type="text" :value="companyUserWorksIn" disabled />
    </div>
    <div v-if="isAbleToEdit && isUserRatingLoaded" class="d-flex mb-3 align-items-center gap-2">
      <span class="input-group-text">{{ $t('components.profile_item.rating') }}:</span>
      <div class="d-flex gap-2">
        <svg
          v-for="star in starsCount"
          :key="star"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      </div>
    </div>
    <div v-if="isAbleToEdit" class="d-flex gap-3">
      <button type="submit" class="btn btn-success">
        {{ $t('components.profile_item.save') }}
      </button>
      <button v-if="isEmployed" @click="showConfirmLeaveCompanyModal" class="btn btn-danger">
        {{ $t('components.auth_form.button.leave_company') }}
      </button>
    </div>
  </form>
  <confirm-action-modal
    :modal-id="confirmLeaveCompanyModalId"
    @on-confirm-action="onConfirmLeaveCompanyAction"
  />
</template>

<script setup>
import ConfirmActionModal from '../modals/ConfirmActionModal.vue'

import api from '../../api'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const props = defineProps({
  profileInfo: Object
})

const store = useStore()

const oldPasswordField = ref(null)
const newPasswordField = ref(null)
const userRating = ref(null)
const isUserRatingLoaded = ref(false)

// Modal windows
const confirmLeaveCompanyModal = ref(null)
const confirmLeaveCompanyModalId = 'leaveCompanyModal'

const currentUserInfo = computed(() => store.getters['users/getCurrentUser'])

const config = computed(() => store.getters['auth/getAuthConfig'])
const isEmployed = computed(() => store.getters['users/getIsEmployed'])
const companyUserWorksIn = computed(() => store.getters['users/getCompanyUserWorksIn'])

const starsCount = computed(() => {
  return Math.floor((userRating.value / 100) * 5)
})

// Get props
const userInfo = computed(() => props.profileInfo.userInfo)
const userInfoKeys = computed(() => props.profileInfo.userInfoKeys)
const isAbleToEdit = computed(() => props.profileInfo.isAbleToEdit)

const getInputType = (key) => {
  if (key === 'email') {
    return 'email'
  } else if (key === 'password') {
    return 'password'
  } else {
    return 'text'
  }
}

// Update user func
const onSubmitUpdateUserData = async () => {
  // Destructurize the userInfo object
  const { username, first_name, last_name, email } = userInfo.value

  // Request body
  const body = {
    username,
    first_name,
    last_name,
    email
  }

  await store.dispatch('users/updateUser', body)

  if (newPasswordField.value) {
    // All request data
    const body = {
      current_password: oldPasswordField.value,
      new_password: newPasswordField.value
    }

    await store.dispatch('users/setNewPassword', body)
  }
}

const showConfirmLeaveCompanyModal = () => {
  confirmLeaveCompanyModal.value.show()
}

const onConfirmLeaveCompanyAction = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users/${currentUserInfo.value.id}/current_company/`,
      config.value
    )

    // Delete user from company members table
    await api.delete(`${import.meta.env.VITE_API_URL}/company_members/${data.id}/`, config.value)

    store.commit('users/setIsEmployed', false)
    store.commit('users/setCompanyUserWorksIn', 'Unemployed')
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  confirmLeaveCompanyModal.value = new Modal(document.getElementById(confirmLeaveCompanyModalId))

  try {
    // Get users current company
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users/${currentUserInfo.value.id}/current_company/`,
      config.value
    )

    store.commit('users/setCompanyUserWorksIn', data.company.name)
    store.commit('users/setIsEmployed', true)
  } catch (err) {
    store.commit('users/setCompanyUserWorksIn', 'Unemployed')
    store.commit('users/setIsEmployed', false) // If there is not found error
    store.commit('users/setErrorMessage', err.message)
  }

  if (isAbleToEdit.value) {
    try {
      const userRatingData = await api.get(
        `${import.meta.env.VITE_API_URL}/users/calculate_avarage_score/`,
        config.value
      )

      userRating.value = userRatingData.data.rating
      isUserRatingLoaded.value = true
    } catch (err) {
      store.commit('users/setErrorMessage', err.message)
    }
  }
})
</script>
