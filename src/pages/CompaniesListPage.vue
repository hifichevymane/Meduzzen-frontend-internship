<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.companies_list_page.heading') }}</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center px-5">
        <div class="col-lg-12 d-flex justify-content-center mb-4">
          <button @click="showCreateCompanyModal" class="btn btn-primary">
            {{ $t('components.create_company_modal.create_company_button') }}
          </button>
        </div>
        <create-company-modal @addNewCompany="addNewCompany" />
        <h3 class="text-center" v-if="!isCompanyListLoaded">{{ errorMessage }}</h3>
        <company-card
          v-else
          v-for="company in companies"
          :key="company.id"
          :name="company.name"
          :description="company.description"
          :id="company.id"
        />
      </div>
    </div>
  </main-container>
</template>

<script setup>
import CompanyCard from '../components/CompanyCard.vue'
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'
import CreateCompanyModal from '../components/CreateCompanyModal.vue'
import { Modal } from 'bootstrap'

import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

import api from '../api'

const store = useStore()

// Companies list
const companies = ref(null)
const createCompanyModal = ref(null)
const isCompanyListLoaded = ref(true)

const errorMessage = computed(() => {
  return store.getters['users/getErrorMessage']
})

onMounted(async () => {
  createCompanyModal.value = new Modal(document.getElementById('createCompanyModal'))

  const config = store.state.auth.authConfig

  // Get companies list
  try {
    const { data } = await api.get(`${import.meta.env.VITE_API_URL}/companies/`, config)

    companies.value = data.results
    store.commit('companies/setCompaniesList', data.results)
  } catch (err) {
    isCompanyListLoaded.value = false
    store.commit('users/setErrorMessage', err.message)
  }
})

const showCreateCompanyModal = () => {
  createCompanyModal.value.show()
}

const addNewCompany = (newCompany) => {
  companies.value.push(newCompany)
}
</script>
