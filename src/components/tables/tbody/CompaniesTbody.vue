<template>
  <tbody>
    <tr v-for="item in dataList" :key="item.id">
      <td>{{ item.user.username }}</td>
      <td>{{ item.user.first_name }}</td>
      <td>{{ item.user.last_name }}</td>

      <td v-if="tableType === 'company_members'">
        <select v-model="item.role" class="form-select" :disabled="!isAbleToEditCompany">
          <option :selected="item.role === 'member'" value="member">
            {{ $t('components.tables.company_members.roles.member') }}
          </option>
          <option :selected="item.role === 'admin'" value="admin">
            {{ $t('components.tables.company_members.roles.admin') }}
          </option>
        </select>
      </td>
      <td v-else>{{ $t(`components.tables.status.${item.status}`) }}</td>

      <td v-if="tableType === 'company_invites'">
        <button
          v-if="item.status == 'pending'"
          @click="showConfirmRevokeRequestModal(item)"
          class="btn btn-danger"
        >
          {{ $t('components.tables.buttons.revoke') }}
        </button>
      </td>
      <td v-else-if="tableType === 'users_requests'">
        <div v-if="item.status === 'pending'" class="d-flex gap-3">
          <button
            @click="showConfirmAcceptRejectUserRequestModal(item, 'accepted')"
            class="btn btn-success"
          >
            {{ $t('components.tables.buttons.accept') }}
          </button>
          <button
            @click="showConfirmAcceptRejectUserRequestModal(item, 'rejected')"
            class="btn btn-danger"
          >
            {{ $t('components.tables.buttons.reject') }}
          </button>
        </div>
      </td>
      <td v-else>
        <div v-if="isAbleToEditCompany" class="d-flex gap-2">
          <button @click="showConfirmAppointRoleModal(item)" class="btn btn-primary">
            {{ $t('components.tables.buttons.assign_role') }}
          </button>
          <button @click="showConfirmExcludeModal(item)" class="btn btn-danger">
            {{ $t('components.tables.buttons.exclude') }}
          </button>
        </div>
      </td>
    </tr>
  </tbody>
  <div v-if="tableType === 'company_members'">
    <confirm-action-modal
      :modal-id="confirmAppointRoleModalId"
      @on-confirm-action="onConfirmAppointRoleAction"
    />
    <confirm-action-modal
      :modal-id="confirmExcludeMemberModalId"
      @on-confirm-action="onConfirmExcludeMemberAction"
    />
  </div>
  <confirm-action-modal
    v-else-if="tableType === 'company_invites'"
    :modal-id="confirmRevokeRequestModalId"
    @on-confirm-action="onConfirmRevokeRequestAction"
  />
  <confirm-action-modal
    v-else
    :modal-id="confirmAcceptRejectUserRequestModalId"
    @on-confirm-action="onConfirmAcceptRejectRequest"
  />
</template>

<script setup>
import ConfirmActionModal from '../../modals/ConfirmActionModal.vue'

import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const props = defineProps(['tableType', 'isAbleToEditCompany', 'dataList'])
const emit = defineEmits(['onExcludeUser'])

const store = useStore()

const dataList = computed(() => props.dataList)
const currentItem = ref(null) // Keep track of current record in table
const currentRequestStatus = ref(null)

// Modal windows
const confirmRevokeRequestModal = ref(null)
const confirmRevokeRequestModalId = 'revokeRequestModal'
const confirmAcceptRejectUserRequestModal = ref(null)
const confirmAcceptRejectUserRequestModalId = 'acceptRejectModal'
const confirmAppointRoleModal = ref(null)
const confirmAppointRoleModalId = 'appointRoleModal'
const confirmExcludeMemberModal = ref(null)
const confirmExcludeMemberModalId = 'excludeMemeberModal'

const tableType = computed(() => props.tableType)
const isAbleToEditCompany = computed(() => props.isAbleToEditCompany)

const showConfirmRevokeRequestModal = (item) => {
  confirmRevokeRequestModal.value.show()
  currentItem.value = item
}

const showConfirmAppointRoleModal = (item) => {
  confirmAppointRoleModal.value.show()
  currentItem.value = item
}

const showConfirmAcceptRejectUserRequestModal = (item, status) => {
  confirmAcceptRejectUserRequestModal.value.show()
  currentItem.value = item
  currentRequestStatus.value = status
}

const showConfirmExcludeModal = (item) => {
  confirmExcludeMemberModal.value.show()
  currentItem.value = item
}

const onConfirmAppointRoleAction = async () => {
  const body = {
    role: currentItem.value.role
  }

  await store.dispatch('companies/appointMemberRole', { body, memberId: currentItem.value.id })
}

const onConfirmExcludeMemberAction = async () => {
  await store.dispatch('companies/excludeMember', currentItem.value.id)
  emit('onExcludeUser', currentItem.value.id)
}

const onConfirmRevokeRequestAction = async () => {
  await store.dispatch('companies/revokeCompanyInvite', currentItem.value.id)
  currentItem.value.status = 'revoked'
}

const onConfirmAcceptRejectRequest = async () => {
  const body = {
    status: currentRequestStatus.value
  }

  await store.dispatch('companies/acceptRejectUserRequest', {
    body,
    userRequestId: currentItem.value.id
  })

  currentItem.value.status = currentRequestStatus.value
}

onMounted(async () => {
  if (tableType.value === 'company_members') {
    confirmAppointRoleModal.value = new Modal(document.getElementById(confirmAppointRoleModalId))
    confirmExcludeMemberModal.value = new Modal(
      document.getElementById(confirmExcludeMemberModalId)
    )
  } else if (tableType.value === 'company_invites') {
    confirmRevokeRequestModal.value = new Modal(
      document.getElementById(confirmRevokeRequestModalId)
    )
  } else {
    confirmAcceptRejectUserRequestModal.value = new Modal(
      document.getElementById(confirmAcceptRejectUserRequestModalId)
    )
  }
})
</script>
