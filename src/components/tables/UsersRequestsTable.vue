<template>
  <div class="row border border-2 rounded border-primary w-75 my-5 p-3">
    <h2 class="text-center mb-4">{{ $t('components.tables.users_requests.heading') }}</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('components.tables.cols.username') }}</th>
          <th scope="col">{{ $t('components.tables.cols.first_name') }}</th>
          <th scope="col">{{ $t('components.tables.cols.last_name') }}</th>
          <th scope="col">{{ $t('components.tables.cols.status') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="userRequest in usersRequestsList" :key="userRequest.id">
          <td>{{ userRequest.user.username }}</td>
          <td>{{ userRequest.user.first_name }}</td>
          <td>{{ userRequest.user.last_name }}</td>
          <td>{{ $t(`components.tables.status.${userRequest.status}`) }}</td>
          <td>
            <div v-if="userRequest.status === 'pending'" class="d-flex gap-3">
              <button
                @click="showConfirmAcceptRejectUserRequestModal(userRequest, 'accepted')"
                class="btn btn-success"
              >
                {{ $t('components.tables.buttons.accept') }}
              </button>
              <button
                @click="showConfirmAcceptRejectUserRequestModal(userRequest, 'rejected')"
                class="btn btn-danger"
              >
                {{ $t('components.tables.buttons.reject') }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <confirm-action-modal
    :modal-id="confirmAcceptRejectUserRequestModalId"
    @on-confirm-action="onConfirmAcceptRejectUserRequestAction"
  />
</template>

<script setup>
import ConfirmActionModal from '../modals/ConfirmActionModal.vue'

import api from '../../api'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const store = useStore()

const usersRequestsList = ref(null)
// Track current user request and status to change it
const currentUserRequest = ref(null)
const currentRequestStatus = ref(null)

// Modal windows
const confirmAcceptRejectUserRequestModal = ref(null)
const confirmAcceptRejectUserRequestModalId = 'acceptRejectUserRequestModal'

// auth config
const config = computed(() => {
  return store.getters['auth/getAuthConfig']
})

const currentCompany = computed(() => {
  return store.getters['companies/getCurrentCompany']
})

const showConfirmAcceptRejectUserRequestModal = (userRequest, status) => {
  confirmAcceptRejectUserRequestModal.value.show()
  currentUserRequest.value = userRequest
  currentRequestStatus.value = status
}

const onConfirmAcceptRejectUserRequestAction = async () => {
  const body = {
    status: currentRequestStatus.value
  }

  try {
    const { data } = await api.patch(
      `${import.meta.env.VITE_API_URL}/users_requests/${currentUserRequest.value.id}/`,
      body,
      config.value
    )

    currentUserRequest.value.status = data.status

    // Add new company member if status === 'accepted'
    if (body.status === 'accepted') {
      const body = {
        company: data.company.id,
        user: data.user.id
      }

      await api.post(`${import.meta.env.VITE_API_URL}/company_members/`, body, config.value)
    }
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  confirmAcceptRejectUserRequestModal.value = new Modal(
    document.getElementById(confirmAcceptRejectUserRequestModalId)
  )

  try {
    // Get all users requests to the company
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users_requests/${currentCompany.value.id}/join_requests/`,
      config.value
    )

    usersRequestsList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
