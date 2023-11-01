<template>
  <div class="row border border-2 rounded border-primary w-75 my-5 p-3">
    <h2 class="text-center mb-3">{{ $t('components.tables.company_members.heading') }}</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">{{ $t('components.tables.cols.username') }}</th>
          <th scope="col">{{ $t('components.tables.cols.first_name') }}</th>
          <th scope="col">{{ $t('components.tables.cols.last_name') }}</th>
          <th scope="col">{{ $t('components.tables.cols.role') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in companyMembersList" :key="member.id">
          <td>{{ member.user.username }}</td>
          <td>{{ member.user.first_name }}</td>
          <td>{{ member.user.last_name }}</td>
          <td>
            <select v-model="member.role" class="form-select" :disabled="!isAbleToEditCompany">
              <option :selected="member.role === 'member'" value="member">
                {{ $t('components.tables.company_members.roles.member') }}
              </option>
              <option :selected="member.role === 'admin'" value="admin">
                {{ $t('components.tables.company_members.roles.admin') }}
              </option>
            </select>
          </td>
          <td>
            <div v-if="isAbleToEditCompany" class="d-flex gap-2">
              <button @click="showConfirmAppointRoleModal(member)" class="btn btn-primary">
                {{ $t('components.tables.buttons.assign_role') }}
              </button>
              <button @click="showConfirmExcludeModal(member)" class="btn btn-danger">
                {{ $t('components.tables.buttons.exclude') }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <confirm-action-modal
    :modal-id="confirmExcludeModalId"
    @on-confirm-action="onConfirmExcludeAction"
  />
  <confirm-action-modal
    :modal-id="confirmAppointRoleModalId"
    @on-confirm-action="onConfirmAppointRoleAction"
  />
</template>

<script setup>
import ConfirmActionModal from '../modals/ConfirmActionModal.vue'

import api from '../../api'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap'

const props = defineProps(['isAbleToEditCompany'])

const store = useStore()

const companyMembersList = ref(null)
const currentMember = ref(null)

// Modal windows
const confirmExcludeModal = ref(null)
const confirmExcludeModalId = 'excludeUserModal'
const confirmAppointRoleModal = ref(null)
const confirmAppointRoleModalId = 'appointMemberRole'

const config = computed(() => store.getters['auth/getAuthConfig'])

const isAbleToEditCompany = computed(() => props.isAbleToEditCompany)

const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])

const showConfirmExcludeModal = (member) => {
  confirmExcludeModal.value.show()
  currentMember.value = member
}

const onConfirmExcludeAction = async () => {
  try {
    await api.delete(
      `${import.meta.env.VITE_API_URL}/company_members/${currentMember.value.id}/`,
      config.value
    )

    companyMembersList.value = companyMembersList.value.filter((member) => {
      return member != currentMember.value
    })
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const showConfirmAppointRoleModal = (member) => {
  confirmAppointRoleModal.value.show()
  currentMember.value = member
}

const onConfirmAppointRoleAction = async () => {
  const body = {
    role: currentMember.value.role
  }

  try {
    await api.patch(
      `${import.meta.env.VITE_API_URL}/company_members/${currentMember.value.id}/`,
      body,
      config.value
    )
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  confirmExcludeModal.value = new Modal(document.getElementById(confirmExcludeModalId))
  confirmAppointRoleModal.value = new Modal(document.getElementById(confirmAppointRoleModalId))

  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_members/${currentCompany.value.id}/members_list/`,
      config.value
    )

    companyMembersList.value = data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
