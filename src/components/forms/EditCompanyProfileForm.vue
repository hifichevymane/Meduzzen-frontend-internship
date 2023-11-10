<template>
  <form method="post" @submit.prevent="onSubmitUpdateCompany">
    <div v-for="key in companyInfoKeys" :key="key" class="input-group mb-3">
      <span class="input-group-text" :id="key">{{ $t(`components.profile_item.${key}`) }}:</span>
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
        :disabled="!isAbleToEditCompany || key === 'seo'"
      />
    </div>
    <div v-if="isAbleToEditCompany">
      <div class="input-group mb-3">
        <!-- Visibility options -->
        <span class="input-group-text">{{ $t('components.profile_item.visibility') }}:</span>
        <select v-model="visibilityField" class="form-select" aria-label="Select visibility">
          <option :selected="visibilityField === 'visible'" value="visible">
            {{ $t('components.select_item.visible') }}
          </option>
          <option :selected="visibilityField === 'hidden'" value="hidden">
            {{ $t('components.select_item.hidden') }}
          </option>
        </select>
      </div>
      <div class="col-lg-12">
        <!-- Edit actions -->
        <div class="row justify-content-center">
          <div class="col-lg-6 d-flex justify-content-center">
            <button type="submit" class="btn btn-success">
              {{ $t('components.profile_item.save') }}
            </button>
          </div>
          <div class="col-lg-6 d-flex justify-content-center">
            <button @click="showDeleteCompanyModal" class="btn btn-danger">
              {{ $t('pages.company_profile_page.buttons.delete_company') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
  <!-- Modal window -->
  <modal-window
    type="deleteCompany"
    :modalId="deleteCompanyModalId"
    @hide-delete-company-modal="hideDeleteCompanyModal"
  />
</template>

<script setup>
import ModalWindow from '../modals/ModalWindow.vue'

import api from '../../api'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps(['isAbleToEditCompany'])

const store = useStore()
const route = useRoute()

const companyInfo = ref({})
const visibilityField = ref(null)

// Modal Windows
const deleteCompanyModal = ref(null)
const deleteCompanyModalId = 'deleteCompany'

// Company info keys to iterate in v-for
const companyInfoKeys = computed(() => {
  return Object.keys(companyInfo.value)
})

const config = computed(() => store.getters['auth/getAuthConfig'])
const isAbleToEditCompany = computed(() => props.isAbleToEditCompany)

const onSubmitUpdateCompany = async () => {
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

const hideDeleteCompanyModal = () => {
  deleteCompanyModal.value.hide()
}

const getCompanyData = async () => {
  const companyId = route.params.id

  // Get current company
  try {
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/companies/${companyId}/`,
      config.value
    )

    // Set current company data
    const { name, description, owner, visibility } = data

    companyInfo.value = {
      name,
      description,
      seo: owner.username
    }

    visibilityField.value = visibility

    store.commit('companies/setCurrentCompany', data)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  deleteCompanyModal.value = new Modal(document.getElementById(deleteCompanyModalId))

  await getCompanyData()
})
</script>
