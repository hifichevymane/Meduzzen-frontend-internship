<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.create_request_modal.heading') }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmitSendNewRequestToCompany" method="post">
            <select v-model="selectedCompany" class="form-select mb-3">
              <option selected value="default">
                {{ $t('components.create_request_modal.select') }}
              </option>
              <option v-for="company in companiesList" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                {{ $t('components.modal_window.close_button') }}
              </button>
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">
                {{ $t('components.create_request_modal.send_request') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '../../api'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['modalId'])
const emit = defineEmits(['pushNewRequestToCompany'])

const store = useStore()

const selectedCompany = ref('default')

const config = computed(() => store.getters['auth/getAuthConfig'])

const modalId = computed(() => props.modalId)

const companiesList = computed(() => store.getters['companies/getCompaniesList'])

const onSubmitSendNewRequestToCompany = async () => {
  const body = {
    company: selectedCompany.value
  }

  try {
    const newRequest = await api.post(
      `${import.meta.env.VITE_API_URL}/users_requests/`,
      body,
      config.value
    )

    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/users_requests/${newRequest.data.id}/`,
      config.value
    )

    emit('pushNewRequestToCompany', data)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}
</script>
