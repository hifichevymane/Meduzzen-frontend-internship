<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.company_profile_page.heading') }}</h1>
    <div class="container-fluid d-flex justify-content-center">
      <div class="row border border-2 rounded border-primary w-50 p-5">
        <div class="col-lg-12">
          <!-- Company info -->
          <div v-for="key in companyInfoKeys" :key="key" class="input-group mb-3">
            <span class="input-group-text" :id="key"
              >{{ $t(`components.profile_item.${key}`) }}:</span
            >
            <textarea
              v-if="key === 'description'"
              class="form-control"
              aria-label="With textarea"
              v-model="companyInfo[key]"
              :disabled="!isAbleToEditCompany"
            ></textarea>
            <input
              v-else
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              :aria-describedby="key"
              v-model="companyInfo[key]"
              :disabled="!isAbleToEditCompany || key === 'SEO'"
            />
          </div>
          <div v-if="isAbleToEditCompany" class="input-group mb-3">
            <!-- Visibility options -->
            <span class="input-group-text">{{ $t('components.profile_item.visibility') }}:</span>
            <select v-model="visibilityField" class="form-select" aria-label="Select visibility">
              <option :selected="visibilityField.value === 'visible'" value="visible">
                {{ $t('components.select_item.visible') }}
              </option>
              <option :selected="visibilityField.value === 'hidden'" value="hidden">
                {{ $t('components.select_item.hidden') }}
              </option>
            </select>
          </div>
          <div v-if="isAbleToEditCompany" class="col-lg-12">
            <!-- Edit actions -->
            <div class="row justify-content-center">
              <div class="col-lg-6 d-flex justify-content-center">
                <button @click.prevent="updateCompany" class="btn btn-success">
                  {{ $t('components.profile_item.save') }}
                </button>
              </div>
              <div class="col-lg-6 d-flex justify-content-center">
                <button @click="showDeleteCompanyModal" class="btn btn-danger">
                  Delete the company
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal window -->
    <modal-window type="deleteCompany" :modalId="deleteCompanyModalId" />
  </main-container>
</template>

<script setup>
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'
import ModalWindow from '../components/ModalWindow.vue'
import { Modal } from 'bootstrap'

import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import api from '../api'

const store = useStore()
const route = useRoute()

// Current company info
const companyInfo = ref({})
const visibilityField = ref(null)
// Modal window for delete company
const deleteCompanyModal = ref(null)
const deleteCompanyModalId = 'deleteCompany'

// Company info keys to iterate in v-for
const companyInfoKeys = computed(() => {
  return Object.keys(companyInfo.value)
})

const loggedUser = computed(() => store.getters['auth/getUser'])

const isAbleToEditCompany = computed(() => {
  return companyInfo.value.SEO === loggedUser.value.username
})

onMounted(async () => {
  deleteCompanyModal.value = new Modal(document.getElementById(deleteCompanyModalId))
  const config = store.state.auth.authConfig

  const companyId = route.params.id

  // Get current company
  try {
    const company = await api.get(`${import.meta.env.VITE_API_URL}/companies/${companyId}/`, config)

    // Set current company data
    const { name, description, owner, visibility } = company.data

    // Get company SEO by owner_id
    const SEO = await api.get(`${import.meta.env.VITE_API_URL}/users/${owner}/`, config)

    companyInfo.value = {
      name,
      description,
      SEO: SEO.data.username
    }

    visibilityField.value = visibility

    store.commit('companies/setCurrentCompany', company.data)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})

const updateCompany = async () => {
  const body = {
    ...companyInfo.value
  }

  body.visibility = visibilityField.value
  // PATCH request to update the company
  await store.dispatch('companies/updateCompany', body)
}

const showDeleteCompanyModal = () => {
  deleteCompanyModal.value.show()
}
</script>
