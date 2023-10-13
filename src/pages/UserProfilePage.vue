<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.user_profile_page.heading') }}</h1>
    <!-- Our User's data -->
    <div class="container-fluid d-flex justify-content-center">
      <div class="row border border-2 rounded border-primary w-75 p-5">
        <div class="col-lg-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="username"
              >{{ $t('components.profile_item.username') }}:</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="username"
              v-model="userInfo.username"
              :disabled="!isAbleToEdit"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="first-name"
              >{{ $t('components.profile_item.first_name') }}:</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="first-name"
              v-model="userInfo.first_name"
              :disabled="!isAbleToEdit"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="last-name"
              >{{ $t('components.profile_item.last_name') }}:</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="last-name"
              v-model="userInfo.last_name"
              :disabled="!isAbleToEdit"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="email"
              >{{ $t('components.profile_item.email') }}:</span
            >
            <input
              type="email"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="email"
              v-model="userInfo.email"
              :disabled="!isAbleToEdit"
            />
          </div>
          <div v-if="isAbleToEdit" class="input-group mb-3">
            <span class="input-group-text" id="old-password"
              >{{ $t('components.profile_item.old_password') }}:</span
            >
            <input
              type="password"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="old-password"
              v-model="oldPasswordField"
              :disabled="!isAbleToEdit"
            />
          </div>
          <div v-if="isAbleToEdit" class="input-group mb-3">
            <span class="input-group-text" id="new-password"
              >{{ $t('components.profile_item.new_password') }}:</span
            >
            <input
              type="password"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="new-password"
              v-model="newPasswordField"
              :disabled="!isAbleToEdit"
            />
          </div>
          <button v-if="isAbleToEdit" @click="updateUserData" class="btn btn-success">
            {{ $t('components.profile_item.save') }}
          </button>
        </div>
        <div class="col-lg-6 col-md-12 m-auto text-center">
          <img :src="userInfo.image_path" class="w-50" alt="profile-pic" />
          <div v-if="isAbleToEdit">
            <!-- Change profile pic section -->
            <button @click="showChangeAvatarModal" class="btn btn-success d-block m-auto mt-3">
              {{ $t('components.profile_item.change_avatar') }}
            </button>
            <!-- Delete user -->
            <button @click="showDeleteUserModal" class="btn btn-danger d-block m-auto mt-3">
              {{ $t('components.profile_item.delete') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal window to change profile avatar -->
    <modal-window type="changeAvatar" :modalId="changeAvatarModalWindowId" />
    <!-- Modal window to delete the user -->
    <modal-window type="deleteUser" :modalId="deleteUserModalWindowId" />
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import ModalWindow from '../components/ModalWindow.vue'
import { Modal } from 'bootstrap'

import api from '../api'

import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

// Vuex store
const store = useStore()
const route = useRoute()

// All user's info
const userInfo = ref({})
const oldPasswordField = ref(null)
const newPasswordField = ref(null)

// Modal windows for deleting and changing profile avatar
const changeAvatarModalWindow = ref(null)
const changeAvatarModalWindowId = 'changeAvatar'
const deleteUserModalWindow = ref(null)
const deleteUserModalWindowId = 'deleteUser'

const currentUserInfo = computed(() => store.getters['users/getCurrentUser'])
const loggedUser = computed(() => store.getters['auth/getUser'])

// Check if user is able to change data
const isAbleToEdit = computed(() => {
  return currentUserInfo.value.id === loggedUser.value.id
})

onMounted(async () => {
  changeAvatarModalWindow.value = new Modal(document.getElementById(changeAvatarModalWindowId))
  deleteUserModalWindow.value = new Modal(document.getElementById(deleteUserModalWindowId))
  // Authorization
  const config = store.state.auth.authConfig

  // Get user id from url
  const userId = route.params.id

  const errorText = 'There was an error trying to load user. Try again'

  // GET request to get user info
  try {
    const { data } = await api.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, config)

    // Asing user info from response
    userInfo.value = data

    store.commit('users/setCurrentUser', data)
  } catch (err) {
    store.commit('users/setErrorMessage', errorText)
  }
})

// Reset all data
onBeforeUnmount(() => {
  store.commit('users/setCurrentUser', {})
})

// Update user func
const updateUserData = async () => {
  // Destructurize the userInfo object
  const { username, first_name, last_name, email } = userInfo.value

  // Request body
  const body = {
    username,
    first_name,
    last_name,
    email
  }

  await store.dispatch('users/updateUser', body)

  if (newPasswordField.value) {
    // All request data
    const body = {
      current_password: oldPasswordField.value,
      new_password: newPasswordField.value
    }

    await store.dispatch('users/setNewPassword', body)
  }
}

// Show modal to change profile avatar
const showChangeAvatarModal = () => {
  changeAvatarModalWindow.value.show()
}

// Show modal to delete the user
const showDeleteUserModal = () => {
  deleteUserModalWindow.value.show()
}
</script>

<style>
.col-lg-12.d-flex p {
  margin-right: 0.5em;
}
</style>
