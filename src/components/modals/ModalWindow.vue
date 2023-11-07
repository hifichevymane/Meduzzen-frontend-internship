<template>
  <!-- Modal -->
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
          <h1 v-if="isChangeAvatarAction" class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.modal_window.change_avatar_heading') }}
          </h1>
          <h1 v-else-if="isDeleteCompanyAction" class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.modal_window.delete_company_heading') }}
          </h1>
          <h1 v-else class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.modal_window.delete_user_heading') }}
          </h1>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-if="isChangeAvatarAction" class="modal-body">
          <input
            class="form-control w-50 m-auto mt-4"
            type="file"
            ref="fileField"
            accept="image/*"
          />
        </div>
        <div v-else class="modal-body">
          {{ $t('components.modal_window.delete_body') }}
        </div>
        <div class="modal-footer">
          <button
            class="btn"
            :class="isChangeAvatarAction ? 'btn-danger' : 'btn-success'"
            data-bs-dismiss="modal"
          >
            {{ $t('components.modal_window.close_button') }}
          </button>
          <button v-if="isChangeAvatarAction" @click="changeProfilePic" class="btn btn-success">
            {{ $t('components.modal_window.save_button') }}
          </button>
          <button v-else-if="isDeleteCompanyAction" @click="deleteCompany" class="btn btn-danger">
            {{ $t('components.modal_window.delete_company_button') }}
          </button>
          <button v-else @click="deleteTheUser" class="btn btn-danger">
            {{ $t('components.modal_window.delete_user_button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const props = defineProps({
  type: String, // Type of modal
  modalId: String
})

const emit = defineEmits(['hideDeleteCompanyModal', 'hideDeleteUserModal', 'hideChangeAvatarModal'])

// Vuex store
const store = useStore()
const router = useRouter()

const fileField = ref()

const isChangeAvatarAction = computed(() => props.type === 'changeAvatar')
const isDeleteCompanyAction = computed(() => props.type === 'deleteCompany')

// Change profile pic func
const changeProfilePic = async () => {
  // Forming a new form data to send to the server
  const formData = new FormData()
  formData.append('image_path', fileField.value.files[0])

  // Set profile pic
  await store.dispatch('users/setProfilePic', formData)
  emit('hideChangeAvatarModal')
  router.go() // Reload the page
}

// Delete user func
const deleteTheUser = async () => {
  await store.dispatch('users/deleteTheUser')
  localStorage.removeItem('access')

  emit('hideDeleteUserModal')
  router.push('/') // Redirect to home page
}

const deleteCompany = async () => {
  await store.dispatch('companies/deleteCompany')
  emit('hideDeleteCompanyModal')
  router.push('/companies') // Redirect to'companies' page
}
</script>

<style>
.modal-content {
  color: rgba(0, 0, 0, 0.792);
}
</style>
