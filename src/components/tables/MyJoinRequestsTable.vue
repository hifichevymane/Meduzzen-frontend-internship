<template>
  <div class="row border border-2 rounded border-primary w-75 my-5 p-3">
    <h2 class="text-center">{{ $t('components.tables.my_join_requests_table.heading') }}</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('components.tables.cols.company') }}</th>
          <th scope="col">{{ $t('components.tables.cols.status') }}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="joinRequest in joinRequestsList" :key="joinRequest.id">
          <td>{{ joinRequest.company.name }}</td>
          <td>{{ $t(`components.tables.status.${joinRequest.status}`) }}</td>
          <td>
            <div v-if="joinRequest.status === 'pending'" class="d-flex gap-3">
              <button
                @click="showConfirmAcceptDeclineJoinRequestModal(joinRequest, 'accepted')"
                class="btn btn-success"
              >
                {{ $t('components.tables.my_join_requests_table.buttons.accept') }}
              </button>
              <button
                @click="showConfirmAcceptDeclineJoinRequestModal(joinRequest, 'declined')"
                class="btn btn-danger"
              >
                {{ $t('components.tables.my_join_requests_table.buttons.decline') }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <confirm-action-modal
    :modal-id="confirmAcceptDeclineJoinRequestModalId"
    @on-confirm-action="onConfirmAcceptDeclineJoinRequestAction"
  />
</template>

<script setup>
import ConfirmActionModal from '../modals/ConfirmActionModal.vue'

import { useStore } from 'vuex'
import api from '../../api'
import { ref, onMounted, computed } from 'vue'
import { Modal } from 'bootstrap'

const emit = defineEmits(['onChangeCompanyUserWorksIn', 'onChangeIsEmployed'])

const store = useStore()

const joinRequestsList = ref(null)
const currentJoinRequest = ref(null)
const currentRequestStatus = ref(null)

const confirmAcceptDeclineJoinRequestModal = ref(null)
const confirmAcceptDeclineJoinRequestModalId = 'confirmAcceptDeclineJoinRequest'

const config = computed(() => store.getters['auth/getAuthConfig'])

const onConfirmAcceptDeclineJoinRequestAction = async () => {
  const body = {
    status: currentRequestStatus.value
  }

  try {
    const { data } = await api.patch(
      `${import.meta.env.VITE_API_URL}/company_invites/${currentJoinRequest.value.id}/`,
      body,
      config.value
    )

    currentJoinRequest.value.status = body.status

    // Change companyUserWorksIn and isEmployed
    if (body.status === 'accepted') {
      emit('onChangeCompanyUserWorksIn', data.company.name)
      emit('onChangeIsEmployed', true)
    }
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const showConfirmAcceptDeclineJoinRequestModal = (joinRequest, status) => {
  confirmAcceptDeclineJoinRequestModal.value.show()
  currentJoinRequest.value = joinRequest
  currentRequestStatus.value = status
}

onMounted(async () => {
  confirmAcceptDeclineJoinRequestModal.value = new Modal(
    document.getElementById(confirmAcceptDeclineJoinRequestModalId)
  )

  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_invites/me`,
      config.value
    )

    joinRequestsList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
