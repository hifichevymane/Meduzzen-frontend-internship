<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-3">{{ $t('pages.users_list_page.heading') }}</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center px-5">
        <!-- All the users -->
        <h3 v-if="!isUsersListLoaded" class="text-center">
          {{ errorMessage }}
        </h3>
        <user-card v-else v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
    <new-notification-toast />
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import UserCard from '../components/UserCard.vue'
import NewNotificationToast from '../components/NewNotificationToast.vue'

import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import api from '../api'

// Vuex store
const store = useStore()

// Users list
const users = ref([])
const isUsersListLoaded = ref(true)

const errorMessage = computed(() => {
  return store.getters['users/getErrorMessage']
})

onMounted(async () => {
  // Authorization
  const config = store.state.auth.authConfig

  // GET request to get users
  try {
    const { data } = await api.get(`${import.meta.env.VITE_API_URL}/users/`, config)

    // Asing users.value all users
    users.value = data.results

    // Save users list in Vuex
    store.commit('users/setUsersList', users.value)
  } catch (err) {
    isUsersListLoaded.value = false
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>

<style>
.card-info {
  display: flex;
}
</style>
