<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.user_profile_page.heading') }}</h1>
    <!-- Our User's data -->
    <div class="container-fluid d-flex flex-column align-items-center">
      <div class="row border border-2 rounded border-primary w-75 p-5">
        <div class="col-lg-6">
          <edit-profile-info-form :profile-info="editProfileInfoFormProps" />
        </div>
        <div class="col-lg-6 col-md-12 m-auto text-center">
          <img :src="profilePic" class="w-50" alt="profile-pic" />
          <div v-if="isAbleToEdit">
            <!-- Change profile pic section -->
            <button @click="showChangeAvatarModal" class="btn btn-success d-block m-auto mt-3">
              {{ $t('components.profile_item.change_avatar') }}
            </button>
            <!-- Delete user -->
            <button @click="showDeleteUserModal" class="btn btn-danger d-block m-auto mt-3">
              {{ $t('components.profile_item.delete') }}
            </button>
            <export-data v-if="isAbleToEdit" @on-export-data="exportQuizResults" />
          </div>
        </div>
      </div>
      <user-analytics v-if="isAbleToEdit" />
      <table-item
        v-if="isAbleToEdit"
        :cols="myRequestsToCompaniesTableCols"
        table-type="my_join_requests"
      />
      <table-item
        v-if="isAbleToEdit"
        :cols="myRequestsToCompaniesTableCols"
        table-type="my_requests_to_companies"
      />
    </div>
    <!-- Modal window to change profile avatar -->
    <modal-window
      type="changeAvatar"
      :modalId="changeAvatarModalWindowId"
      @hide-change-avatar-modal="hideChangeAvatarModal"
    />
    <!-- Modal window to delete the user -->
    <modal-window
      type="deleteUser"
      :modalId="deleteUserModalWindowId"
      @hide-delete-user-modal="hideDeleteUserModal"
    />
    <new-notification-toast />
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import ModalWindow from '../components/modals/ModalWindow.vue'
import EditProfileInfoForm from '../components/forms/EditProfileInfoForm.vue'
import TableItem from '../components/tables/TableItem.vue'
import NewNotificationToast from '../components/NewNotificationToast.vue'
import ExportData from '../components/ExportData.vue'
import UserAnalytics from '../components/UserAnalytics.vue'

import { Modal } from 'bootstrap'
import api from '../api'
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import exportData from '@/utils/export_data.js'

// Vuex store
const store = useStore()
const route = useRoute()

const myRequestsToCompaniesTableCols = ['company', 'status']

// All user's info
const userInfo = ref({})
const profilePic = ref(null)

// Modal windows for deleting and changing profile avatar
const changeAvatarModalWindow = ref(null)
const changeAvatarModalWindowId = 'changeAvatar'
const deleteUserModalWindow = ref(null)
const deleteUserModalWindowId = 'deleteUser'

const config = computed(() => store.getters['auth/getAuthConfig'])
const currentUserInfo = computed(() => store.getters['users/getCurrentUser'])
const loggedUser = computed(() => store.getters['auth/getUser'])

const editProfileInfoFormProps = computed(() => {
  return {
    userInfo: userInfo.value,
    userInfoKeys: userInfoKeys.value,
    isAbleToEdit: isAbleToEdit.value
  }
})

// Check if user is able to change data
const isAbleToEdit = computed(() => {
  return currentUserInfo.value.id === loggedUser.value.id
})

// User info keys to iterate in v-for
const userInfoKeys = computed(() => {
  return Object.keys(userInfo.value)
})

// Show modal to change profile avatar
const showChangeAvatarModal = () => {
  changeAvatarModalWindow.value.show()
}

const hideChangeAvatarModal = () => {
  changeAvatarModalWindow.value.hide()
}

// Show modal to delete the user
const showDeleteUserModal = () => {
  deleteUserModalWindow.value.show()
}

const hideDeleteUserModal = () => {
  deleteUserModalWindow.value.hide()
}

const exportQuizResults = async (exportFileType) => {
  try {
    let { data } = await api.get(
      `${import.meta.env.VITE_API_URL}/quiz_results/export_data/?user=${
        currentUserInfo.value.id
      }&file_type=${exportFileType}`,
      config.value
    )

    exportData(data, exportFileType)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

const getCurrentUserData = async () => {
  // Get user id from url
  const userId = route.params.id

  // GET request to get user info
  try {
    const { data } = await api.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, config.value)

    // Asing user info from response
    const { username, email, first_name, last_name } = data
    const { image_path } = data
    userInfo.value = { username, email, first_name, last_name }
    profilePic.value = image_path

    store.commit('users/setCurrentUser', data)
  } catch (err) {
    store.commit('users/setErrorMessage', err.message)
  }
}

onMounted(async () => {
  changeAvatarModalWindow.value = new Modal(document.getElementById(changeAvatarModalWindowId))
  deleteUserModalWindow.value = new Modal(document.getElementById(deleteUserModalWindowId))
  await getCurrentUserData()
})

// Reset all data
onBeforeUnmount(() => {
  store.commit('users/setCurrentUser', {})
})
</script>

<style>
.col-lg-12.d-flex p {
  margin-right: 0.5em;
}
</style>
