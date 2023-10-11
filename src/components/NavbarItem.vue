<template>
  <header>
    <nav class="navbar navbar-expand-xl p-4 bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Access managment</a>
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
              <a class="nav-link" href="/">{{ $t('components.navbar.links.home') }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">{{ $t('components.navbar.links.about') }}</a>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <!-- If user authenticated -->
              <a class="nav-link" href="/companies">{{
                $t('components.navbar.links.companies')
              }}</a>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <a class="nav-link" href="/users">{{ $t('components.navbar.links.users') }}</a>
            </li>
          </ul>
          <!-- Right part of the navbar -->
          <ul class="navbar-nav ms-auto">
            <li v-if="!isAuthenticated" class="nav-item">
              <a class="nav-link" href="/sign-up">{{ $t('components.navbar.links.sign_up') }}</a>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <a class="nav-link" href="/login">{{ $t('components.navbar.links.login') }}</a>
            </li>
            <div v-if="isAuthenticated" class="nav-item d-flex flex-column text-light">
              <!-- If user authenticated -->
              <p class="mb-1">{{ userInfo.first_name }},</p>
              <p class="m-0">{{ userInfo.email }}</p>
            </div>
            <li v-if="isAuthenticated" class="nav-item">
              <!-- If user authenticated -->
              <a class="nav-link" href="/companies/1">{{
                $t('components.navbar.links.company_profile')
              }}</a>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <a class="nav-link" :href="`/users/${userInfo.id}`">{{
                $t('components.navbar.links.user_profile')
              }}</a>
            </li>
          </ul>
          <button v-if="isAuthenticated" @click="logout" type="button" class="btn btn-danger">
            {{ $t('components.navbar.links.logout') }}
          </button>
          <!-- Select language -->
          <select-item />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import SelectItem from './SelectItem.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

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
  location.reload() // Reload page
}
</script>
