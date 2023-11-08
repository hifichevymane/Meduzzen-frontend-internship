<template>
  <header>
    <nav class="navbar navbar-expand-xl p-4 bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Access managment</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <!-- Left part of the navbar -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">{{
                $t('components.navbar.links.home')
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">{{
                $t('components.navbar.links.about')
              }}</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <!-- If user authenticated -->
              <router-link class="nav-link" to="/companies">{{
                $t('components.navbar.links.companies')
              }}</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <router-link class="nav-link" to="/users">{{
                $t('components.navbar.links.users')
              }}</router-link>
            </li>
          </ul>
          <!-- Right part of the navbar -->
          <ul class="navbar-nav ms-auto">
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link class="nav-link" to="/sign-up">{{
                $t('components.navbar.links.sign_up')
              }}</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link class="nav-link" to="/login">{{
                $t('components.navbar.links.login')
              }}</router-link>
            </li>
            <div v-if="isAuthenticated" class="d-flex align-items-center">
              <li class="nav-item d-flex flex-column text-light">
                <!-- If user authenticated -->
                <p class="mb-1">{{ userInfo.first_name }},</p>
                <p class="m-0">{{ userInfo.email }}</p>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{ name: 'UserProfile', params: { id: userInfo.id } }"
                  >{{ $t('components.navbar.links.user_profile') }}</router-link
                >
              </li>
            </div>
          </ul>
          <div class="d-flex gap-2 align-items-center">
            <button
              v-if="isAuthenticated"
              @click="logout"
              type="button"
              class="btn btn-danger w-75"
            >
              {{ $t('components.navbar.links.logout') }}
            </button>
            <!-- Select language -->
            <select-item />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import SelectItem from './SelectItem.vue'

import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// Get from Vuex store information if user is authenticated
const isAuthenticated = computed(() => {
  return store.getters['auth/getIsAuthenticated']
})

const userInfo = computed(() => {
  return store.getters['auth/getUser']
})

// Logout function
const logout = () => {
  // Clear user data
  store.commit('auth/setUserData', {})
  // Set isAuthenticated state
  store.commit('auth/setIsAuthenticated', false)
  localStorage.removeItem('access')
  router.push('/') // Reload page
}
</script>
