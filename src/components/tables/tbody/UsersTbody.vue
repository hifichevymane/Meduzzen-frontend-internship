<template>
  <tbody>
    <tr v-for="item in dataList" :key="item.id">
      <td>{{ item.company.name }}</td>
      <td>{{ $t(`components.tables.status.${item.status}`) }}</td>
      <td v-if="isMyJoinRequestsTable">
        <div v-if="item.status === 'pending'" class="d-flex gap-3">
          <button
            @click="showConfirmAcceptDeclineJoinRequestModal(item, 'accepted')"
            class="btn btn-success"
          >
            {{ $t('components.tables.buttons.accept') }}
          </button>
          <button
            @click="showConfirmAcceptDeclineJoinRequestModal(item, 'declined')"
            class="btn btn-danger"
          >
            {{ $t('components.tables.buttons.decline') }}
          </button>
        </div>
      </td>
      <td v-else>
        <button
          v-if="item.status === 'pending'"
          @click="showConfirmCancelRequestModal(item)"
          class="btn btn-danger"
        >
          {{ $t('components.tables.buttons.cancel') }}
        </button>
      </td>
    </tr>
  </tbody>
  <!-- confirmAcceptDeclineJoinRequestModal -->
  <confirm-action-modal
    v-if="isMyJoinRequestsTable"
    :modal-id="confirmAcceptDeclineJoinRequestModalId"
    @on-confirm-action="onConfirmAcceptDeclineRequest"
  />
  <!-- confirmCancelRequestModal -->
  <confirm-action-modal
    v-else
    :modal-id="confirmCancelRequestModalId"
    @on-confirm-action="onConfirmCancelRequest"
  />
</template>

<script setup>
import ConfirmActionModal from '../../modals/ConfirmActionModal.vue'

import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const props = defineProps(['tableType', 'dataList'])

const store = useStore()

const dataList = computed(() => props.dataList)
const currentRequest = ref(null)
const currentJoinRequestStatus = ref(null)

// Modal Windows
const confirmAcceptDeclineJoinRequestModal = ref(null)
const confirmAcceptDeclineJoinRequestModalId = 'confirmAcceptDeclineRequest'
const confirmCancelRequestModal = ref(null)
const confirmCancelRequestModalId = 'confirmCancelRequestgfdfgfdgfd'

const tableType = computed(() => props.tableType)
const isMyJoinRequestsTable = computed(() => tableType.value === 'my_join_requests')

const showConfirmAcceptDeclineJoinRequestModal = (item, status) => {
  confirmAcceptDeclineJoinRequestModal.value.show()
  currentRequest.value = item
  currentJoinRequestStatus.value = status
}

const showConfirmCancelRequestModal = (item) => {
  confirmCancelRequestModal.value.show()
  currentRequest.value = item
}

const onConfirmCancelRequest = async () => {
  await store.dispatch('users/cancelUserRequest', currentRequest.value.id)
  currentRequest.value.status = 'canceled'
}

const onConfirmAcceptDeclineRequest = async () => {
  const body = {
    status: currentJoinRequestStatus.value
  }

  await store.dispatch('users/acceptDeclineJoinRequest', {
    body,
    requestId: currentRequest.value.id
  })

  currentRequest.value.status = body.status
  if (body.status === 'accepted') {
    store.commit('users/setCompanyUserWorksIn', currentRequest.value.company.name)
    store.commit('users/setIsEmployed', true)
  }
}

onMounted(async () => {
  if (isMyJoinRequestsTable.value) {
    confirmAcceptDeclineJoinRequestModal.value = new Modal(
      document.getElementById(confirmAcceptDeclineJoinRequestModalId)
    )
  } else {
    confirmCancelRequestModal.value = new Modal(
      document.getElementById(confirmCancelRequestModalId)
    )
  }
})
</script>
