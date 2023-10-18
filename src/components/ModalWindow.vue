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
          <h1 v-else class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.modal_window.delete_user_heading') }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
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
          {{ $t('components.modal_window.delete_user_body') }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn"
            :class="isChangeAvatarAction ? 'btn-danger' : 'btn-success'"
            data-bs-dismiss="modal"
          >
            {{ $t('components.modal_window.close_button') }}
          </button>
          <button
            v-if="isChangeAvatarAction"
            @click="changeProfilePic"
            type="button"
            class="btn btn-success"
          >
            {{ $t('components.modal_window.save_button') }}
          </button>
          <button v-else @click="deleteTheUser" type="button" class="btn btn-danger">
            {{ $t('components.modal_window.delete_button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  type: String, // Type of modal
  modalId: String
})

// Vuex store
const store = useStore()

const fileField = ref()

const isChangeAvatarAction = computed(() => props.type === 'changeAvatar')

// Change profile pic func
const changeProfilePic = async () => {
  // Forming a new form data to send to the server
  const formData = new FormData()
  formData.append('image_path', fileField.value.files[0])

  // Set profile pic
  await store.dispatch('users/setProfilePic', formData)

  location.reload()
}

// Delete user func
const deleteTheUser = async () => {
  await store.dispatch('users/deleteTheUser')

  localStorage.removeItem('access')
  window.location.href = '/'
}
</script>

<style>
.modal-content {
  color: rgba(0, 0, 0, 0.792);
}
</style>
