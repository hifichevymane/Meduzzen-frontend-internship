<template>
  <div
    class="modal fade"
    id="createCompanyModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.create_company_modal.create_company_button') }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="company-name" class="form-label fw-semibold">{{
              $t('components.profile_item.name')
            }}</label>
            <input
              type="text"
              class="form-control"
              id="company-name"
              :placeholder="$t('components.create_company_modal.company_name_placeholder')"
              v-model="companyInfo.name"
            />
          </div>
          <div class="mb-3">
            <label for="company-description" class="form-label fw-semibold">{{
              $t('components.profile_item.description')
            }}</label>
            <textarea
              class="form-control"
              id="company-description"
              rows="3"
              :placeholder="$t('components.create_company_modal.company_description_placeholder')"
              v-model="companyInfo.description"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="company-visibility" class="form-label fw-semibold">{{
              $t('components.profile_item.visibility')
            }}</label>
            <select
              v-model="companyInfo.visibility"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected value="visible">{{ $t('components.select_item.visible') }}</option>
              <option value="hidden">{{ $t('components.select_item.hidden') }}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            {{ $t('components.modal_window.close_button') }}
          </button>
          <button
            @click.prevent="createCompany"
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
          >
            {{ $t('components.create_company_modal.create_company_button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import api from '../api'

const emit = defineEmits(['addNewCompany'])

const store = useStore()

// Company creation info
const companyInfo = ref({
  name: '',
  description: '',
  visibility: 'visible'
})

const createCompany = async () => {
  const body = { ...companyInfo.value }
  const config = store.state.auth.authConfig

  try {
    const { data } = await api.post(`${import.meta.env.VITE_API_URL}/companies/`, body, config)

    // Push a new company in companies array
    emit('addNewCompany', data)
    // Clear the form fields
    companyInfo.value = { name: '', description: '', visibility: 'visible' }
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}
</script>
