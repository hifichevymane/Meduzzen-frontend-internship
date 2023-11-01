<template>
  <div class="row border border-2 rounded border-primary w-75 my-5 p-3">
    <h2 class="text-center mb-2">{{ $t('components.tables.company_invites.heading') }}</h2>
    <div class="col-lg-12 align-items-center">
      <button @click="showInviteUserModal" class="d-flex btn btn-primary my-3">
        {{ $t('components.tables.company_invites.buttons.invite_user') }}
      </button>
    </div>
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
        <tr v-for="invite in companyInvites" :key="invite.id">
          <td>{{ invite.user.username }}</td>
          <td>{{ invite.user.first_name }}</td>
          <td>{{ invite.user.last_name }}</td>
          <td>{{ $t(`components.tables.status.${invite.status}`) }}</td>
          <td>
            <button
              v-if="invite.status == 'pending'"
              @click="showConfirmModal(invite)"
              class="btn btn-danger"
            >
              {{ $t('components.tables.buttons.revoke') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <invite-user-modal :modal-id="inviteUserModalId" @push-new-invite="pushNewInvite" />
  <confirm-action-modal :modal-id="confirmModalId" @on-confirm-action="onConfirmAction" />
</template>

<script setup>
import InviteUserModal from '../modals/InviteUserModal.vue'
import ConfirmActionModal from '../modals/ConfirmActionModal.vue'

import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'
import api from '../../api'

const store = useStore()

const companyInvites = ref(null)
const currentCompanyInvite = ref(null) // Track current company invite to change

const inviteUserModal = ref(null)
const inviteUserModalId = 'inviteUser'
const confirmModal = ref(null)
const confirmModalId = 'revokeInvite'

const config = computed(() => store.getters['auth/getAuthConfig'])

const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])

const showInviteUserModal = () => {
  inviteUserModal.value.show()
}

const pushNewInvite = (value) => {
  companyInvites.value.push(value)
}

const showConfirmModal = (companyInvite) => {
  confirmModal.value.show()
  currentCompanyInvite.value = companyInvite
}

// Change status property to 'revoked'
const onConfirmAction = async () => {
  const body = {
    status: 'revoked'
  }

  // PATCH request to update the status of the invite
  try {
    const { data } = await api.patch(
      `${import.meta.env.VITE_API_URL}/company_invites/${currentCompanyInvite.value.id}/`,
      body,
      config.value
    )

    currentCompanyInvite.value.status = data.status
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  inviteUserModal.value = new Modal(document.getElementById(inviteUserModalId))
  confirmModal.value = new Modal(document.getElementById(confirmModalId))

  try {
    // Get all company invites
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_invites/${currentCompany.value.id}/invited_users/`,
      config.value
    )

    companyInvites.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
