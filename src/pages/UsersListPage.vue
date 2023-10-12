<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-3">{{ $t('pages.users_list_page.heading') }}</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center px-5">
        <!-- All the users -->
        <user-card
          v-for="user in users"
          :key="user.id"
          :username="user.username"
          :firstName="user.first_name"
          :lastName="user.last_name"
          :email="user.email"
          :url="user.id"
        />
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
  const response = await api
    .get(`${import.meta.env.VITE_API_URL}/users/`, config)
    .catch((err) => console.log(err))

  // Asing users.value all users
  users.value = response.data.results

  // Save users list in Vuex
  store.commit('users/setUsersList', users.value)
})
</script>

<style>
.card-info {
  display: flex;
}
</style>
