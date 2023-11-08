<template>
  <div class="row border border-2 rounded border-primary w-75 my-5 p-3">
    <h2 class="text-center mb-3">{{ $t(`components.tables.${tableType}.heading`) }}</h2>
    <div v-if="tableType === 'company_invites'" class="col-lg-12 align-items-center">
      <button @click="showInviteUserModal" class="d-flex btn btn-primary my-3">
        {{ $t(`components.tables.${tableType}.buttons.invite_user`) }}
      </button>
    </div>
    <div v-else-if="tableType === 'my_requests_to_companies'" class="col-lg-12 align-items-center">
      <button @click="showSendRequestToCompanyModal" class="d-flex btn btn-primary my-3">
        {{ $t(`components.tables.${tableType}.buttons.send_request`) }}
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="col in cols" :key="col" scope="col">
            {{ $t(`components.tables.cols.${col}`) }}
          </th>
          <th></th>
        </tr>
      </thead>
      <users-tbody v-if="isUserProfileTable" :data-list="dataList" :table-type="tableType" />
      <companies-tbody
        v-else
        :table-type="tableType"
        :is-able-to-edit-company="isAbleToEditCompany"
        :data-list="dataList"
        @on-exclude-user="onExcludeUser"
        @on-delete-admin="onDeleteAdmin"
      />
    </table>
  </div>
  <create-request-to-company-modal
    v-if="tableType === 'my_requests_to_companies'"
    :modal-id="sendRequestToCompanyModalId"
    @push-new-request-to-company="pushNewRequestToCompany"
  />
  <invite-user-modal
    v-if="tableType === 'company_invites'"
    :modal-id="inviteUserModalId"
    @push-new-invite="pushNewInvite"
  />
</template>

<script setup>
import InviteUserModal from '../modals/InviteUserModal.vue'
import UsersTbody from './tbody/UsersTbody.vue'
import CompaniesTbody from './tbody/CompaniesTbody.vue'
import CreateRequestToCompanyModal from '../modals/CreateRequestToCompanyModal.vue'

import api from '../../api'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const props = defineProps(['tableType', 'cols', 'isAbleToEditCompany'])

const store = useStore()
const route = useRoute()

const dataList = ref(null)

// Modal windows
const sendRequestToCompanyModal = ref(null)
const sendRequestToCompanyModalId = 'sendRequestToCompanyModal'
const inviteUserModal = ref(null)
const inviteUserModalId = 'inviteUserModal'

const tableType = computed(() => props.tableType)
const cols = computed(() => props.cols)
const isAbleToEditCompany = computed(() => props.isAbleToEditCompany)

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])
// Check if this user profile page
const isUserProfileTable = computed(() => route.path.includes('users'))

// Emits
const pushNewInvite = (value) => {
  dataList.value.push(value)
}

const onExcludeUser = (memberId) => {
  dataList.value = dataList.value.find((member) => member.id !== memberId)
}

const onDeleteAdmin = (adminId) => {
  dataList.value = dataList.value.filter((admin) => admin.id !== adminId)
}

const showSendRequestToCompanyModal = () => {
  sendRequestToCompanyModal.value.show()
}

const showInviteUserModal = () => {
  inviteUserModal.value.show()
}

const pushNewRequestToCompany = (value) => {
  dataList.value.push(value)
}

const getMyJoinRequests = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_invites/me`,
      config.value
    )

    dataList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getMyRequestsToCompanies = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users_requests/me`,
      config.value
    )

    dataList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getMembersList = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_members/${currentCompany.value.id}/members_list/`,
      config.value
    )

    dataList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getCompanyInvites = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_invites/${currentCompany.value.id}/invited_users/`,
      config.value
    )

    dataList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getUsersRequests = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users_requests/${currentCompany.value.id}/join_requests/`,
      config.value
    )

    dataList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getCompanyAdmins = async () => {
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_members/${currentCompany.value.id}/admin_list/`,
      config.value
    )

    dataList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  if (tableType.value === 'my_requests_to_companies') {
    sendRequestToCompanyModal.value = new Modal(
      document.getElementById(sendRequestToCompanyModalId)
    )
    await getMyRequestsToCompanies()
  } else if (tableType.value === 'my_join_requests') {
    await getMyJoinRequests()
  } else if (tableType.value === 'company_invites') {
    inviteUserModal.value = new Modal(document.getElementById(inviteUserModalId))
    await getCompanyInvites()
  } else if (tableType.value === 'company_members') {
    await getMembersList()
  } else if (tableType.value === 'users_requests') {
    await getUsersRequests()
  } else {
    await getCompanyAdmins()
  }
})
</script>
