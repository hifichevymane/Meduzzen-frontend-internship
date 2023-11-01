<template>
  <div class="row border border-2 rounded border-primary w-75 mb-5 p-3">
    <h2 class="text-center mb-4">{{ $t('components.tables.my_requests_to_companies.heading') }}</h2>
    <button @click="showCreateRequestToCompanyModal" class="d-flex w-25 btn btn-primary">
      {{ $t('components.tables.my_requests_to_companies.buttons.send_request') }}
    </button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('components.tables.cols.company') }}</th>
          <th scope="col">{{ $t('components.tables.cols.status') }}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requestsToCompaniesList" :key="request.id">
          <th>{{ request.company.name }}</th>
          <td>{{ $t(`components.tables.status.${request.status}`) }}</td>
          <td v-if="request.status === 'pending'">
            <button @click="showConfirmCancelRequestModal(request)" class="btn btn-danger">
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <create-request-to-company-modal
    :modal-id="createRequestToCompanyModalId"
    @push-new-request-to-company="pushNewRequestToCompany"
  />
  <confirm-action-modal
    :modal-id="confirmCancelRequestModalId"
    @on-confirm-action="onConfirmCancelRequestAction"
  />
</template>

<script setup>
import CreateRequestToCompanyModal from '../modals/CreateRequestToCompanyModal.vue'
import ConfirmActionModal from '../modals/ConfirmActionModal.vue'

import api from '../../api'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const store = useStore()

const requestsToCompaniesList = ref(null)
const currentRequest = ref(null)

// Modal windows
const createRequestToCompanyModal = ref(null)
const createRequestToCompanyModalId = 'createRequestToCompanyModal'
const confirmCancelRequestModal = ref(null)
const confirmCancelRequestModalId = 'cancelRequestToCompany'

const config = computed(() => store.getters['auth/getAuthConfig'])

const showCreateRequestToCompanyModal = () => {
  createRequestToCompanyModal.value.show()
}

const showConfirmCancelRequestModal = (request) => {
  confirmCancelRequestModal.value.show()
  currentRequest.value = request
}

const pushNewRequestToCompany = (value) => {
  requestsToCompaniesList.value.push(value)
}

const onConfirmCancelRequestAction = async () => {
  const body = {
    status: 'canceled'
  }

  try {
    // PATCH request to set request status to canceled
    await api.patch(
      `${import.meta.env.VITE_API_URL}/users_requests/${currentRequest.value.id}/`,
      body,
      config.value
    )

    currentRequest.value.status = body.status
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  createRequestToCompanyModal.value = new Modal(
    document.getElementById(createRequestToCompanyModalId)
  )
  confirmCancelRequestModal.value = new Modal(document.getElementById(confirmCancelRequestModalId))

  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users_requests/me`,
      config.value
    )

    requestsToCompaniesList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
