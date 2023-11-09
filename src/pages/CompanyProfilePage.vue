<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.company_profile_page.heading') }}</h1>
    <div class="container-fluid d-flex flex-column align-items-center">
      <div class="row border border-2 rounded border-primary w-50 p-5">
        <div class="col-lg-12">
          <!-- Company info -->
          <edit-company-profile-form :is-able-to-edit-company="isAbleToEditCompany" />
        </div>
      </div>
      <table-item
        :is-able-to-edit-company="isAbleToEditCompany"
        :cols="companyMembersTableCols"
        table-type="company_members"
      />
      <table-item
        v-if="isAbleToEditCompany"
        :cols="companyAdminsTableCols"
        table-type="company_admins"
      />
      <table-item
        v-if="isAbleToEditCompany"
        :cols="companyInvitesTableCols"
        table-type="company_invites"
      />
      <table-item
        v-if="isAbleToEditCompany"
        :cols="companyInvitesTableCols"
        table-type="users_requests"
      />
    </div>
  </main-container>
</template>

<script setup>
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'
import EditCompanyProfileForm from '../components/forms/EditCompanyProfileForm.vue'
import TableItem from '../components/tables/TableItem.vue'

import api from '../api'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const companyMembersTableCols = ['username', 'first_name', 'last_name', 'role']
const companyInvitesTableCols = ['username', 'first_name', 'last_name', 'status']
const companyAdminsTableCols = ['username', 'first_name', 'last_name']

const companyMembersList = ref(null)
const companyInvitesList = ref(null)
const usersRequestsList = ref(null)

const config = computed(() => store.getters['auth/getAuthConfig'])
const loggedUser = computed(() => store.getters['auth/getUser'])
const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])

const isAbleToEditCompany = computed(() => {
  return currentCompany.value.owner.id === loggedUser.value.id
})

onMounted(async () => {
  try {
    // Get all company members
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_members/${currentCompany.value.id}/members_list/`,
      config.value
    )

    companyMembersList.value = data

    // Get all company invites
    const companyInvitesData = await api.get(
      `${import.meta.env.VITE_API_URL}/company_invites/${currentCompany.value.id}/invited_users/`,
      config.value
    )

    companyInvitesList.value = companyInvitesData.data

    // Get all users' requests to companies
    const usersRequestsData = await api.get(
      `${import.meta.env.VITE_API_URL}/users_requests/${currentCompany.value.id}/join_requests/`,
      config.value
    )

    usersRequestsList.value = usersRequestsData.data
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
