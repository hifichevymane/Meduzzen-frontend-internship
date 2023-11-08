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
            {{ $t('components.invite_user_modal.heading') }}
          </h1>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="sendInviteToUser" method="post">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">{{
                $t('components.invite_user_modal.user')
              }}</label>
              <select
                v-model="selectedUser"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="default" selected>
                  {{ $t('components.invite_user_modal.select') }}
                </option>
                <option v-for="user in usersList" :key="user.id" :value="user.id">
                  {{ user.username }}
                </option>
              </select>
            </div>
            <div class="mb-3 d-flex justify-content-end gap-2">
              <button class="btn btn-danger" data-bs-dismiss="modal">
                {{ $t('components.modal_window.close_button') }}
              </button>
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">
                {{ $t('components.invite_user_modal.buttons.send_invite') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import api from '../../../api'

const props = defineProps(['modalId'])
const emit = defineEmits(['pushNewInvite'])

const store = useStore()

const usersList = ref(null)
const selectedUser = ref('default')

const config = computed(() => store.getters['auth/getAuthConfig'])

const modalId = computed(() => props.modalId)

const currentCompany = computed(() => store.getters['companies/getCurrentCompany'])

const sendInviteToUser = async () => {
  const body = {
    company: currentCompany.value.id,
    user: selectedUser.value
  }

  try {
    const companyInvite = await api.post(
      `${import.meta.env.VITE_API_URL}/company_invites/`,
      body,
      config.value
    )

    // Get company invite with all user's aditional data
    const { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/company_invites/${companyInvite.data.id}/`,
      config.value
    )

    emit('pushNewInvite', data)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message, { root: true })
  }
}

onMounted(async () => {
  try {
    // Get all users
    const { data } = await api.get(`${import.meta.env.VITE_API_URL}/users/`, config.value)
    usersList.value = data.results
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>
