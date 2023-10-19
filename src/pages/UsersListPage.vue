<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-3">{{ $t('pages.users_list_page.heading') }}</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center px-5">
        <!-- All the users -->
        <h3 v-if="!users" class="text-center">
          {{ $t('pages.users_list_page.error_message') }}
        </h3>
        <user-card v-else v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import UserCard from '../components/UserCard.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import api from '../api'

// Vuex store
const store = useStore()

// Users list
const users = ref([])

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
    users.value = null
    store.commit('users/setErrorMessage', err.message)
  }
})
</script>

<style>
.card-info {
  display: flex;
}
</style>
