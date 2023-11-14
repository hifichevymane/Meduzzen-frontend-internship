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
        <create-company-modal @add-new-company="addNewCompany" />
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
    <pagination-item
      :page-count="pageCount"
      :current-page="currentPage"
      :next-page="nextPage"
      :previous-page="previousPage"
      @on-change-page="onChangePage"
      @to-previous-page="toPreviousPage"
      @to-next-page="toNextPage"
    />
    <new-notification-toast />
  </main-container>
</template>

<script setup>
import CompanyCard from '../components/CompanyCard.vue'
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'
import CreateCompanyModal from '../components/modals/companies/CreateCompanyModal.vue'
import PaginationItem from '../components/PaginationItem.vue'
import NewNotificationToast from '../components/NewNotificationToast.vue'

import { Modal } from 'bootstrap'
import { onMounted, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

import api from '../api'

const store = useStore()

// Companies list
const companies = ref(null)
const createCompanyModal = ref(null)
const isCompanyListLoaded = ref(true)
const pageCount = ref(null)
const currentPage = ref(1)
const nextPage = ref(null)
const previousPage = ref(null)

const errorMessage = computed(() => {
  return store.getters['users/getErrorMessage']
})
const pageSize = computed(() => store.getters['getPageSize'])

const showCreateCompanyModal = () => {
  createCompanyModal.value.show()
}

const addNewCompany = (newCompany) => {
  companies.value.push(newCompany)
}

// Pagination functions
const onChangePage = (page) => {
  currentPage.value = page
}

const toPreviousPage = () => {
  currentPage.value -= 1
}

const toNextPage = () => {
  currentPage.value += 1
}

const getCompaniesList = async () => {
  const config = store.state.auth.authConfig

  // Get companies list
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/companies/?page=${currentPage.value}`,
      config
    )

    companies.value = data.results
    store.commit('companies/setCompaniesList', data.results)

    pageCount.value = Math.ceil(data.count / pageSize.value)
    nextPage.value = data.next
    previousPage.value = data.previous
  } catch (err) {
    isCompanyListLoaded.value = false
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  createCompanyModal.value = new Modal(document.getElementById('createCompanyModal'))
  await getCompaniesList()
})

// When current page is changed -> GET request to retrieve companies
watch(
  () => currentPage.value,
  async () => await getCompaniesList()
)
</script>
