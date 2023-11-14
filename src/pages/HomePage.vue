<template>
  <navbar-item />

  <main-container>
    <div class="container-fluid text-center">
      <h1>Meduzzen Frontend Intership</h1>
      <p>{{ $t('pages.home_page.description') }}</p>
      <h2 v-if="healthCheck">{{ healthCheck }}</h2>
      <h2 v-else>{{ $t('pages.home_page.api_connection_error') }}</h2>
      <!-- Vuex testing -->
      <h2 class="mt-5">{{ $t('pages.home_page.vuex_testing.heading') }}</h2>
      <p>{{ testString }}</p>
      <!-- Add letter to string -->
      <button @click="addCharAtoString" class="btn btn-primary">
        {{ $t('pages.home_page.vuex_testing.add_char_button') }}
      </button>
      <!-- Delete letter from string -->
      <button @click="deleteCharFromString" class="btn btn-primary d-block m-auto mt-3">
        {{ $t('pages.home_page.vuex_testing.delete_char_button') }}
      </button>
      <!-- Reset testing string -->
      <button @click="resetTestingString" class="btn btn-primary d-block m-auto mt-3">
        {{ $t('pages.home_page.vuex_testing.reset_button') }}
      </button>
    </div>
    <new-notification-toast />
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import NewNotificationToast from '../components/NewNotificationToast.vue'

import { onMounted, ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// Importing axios instance to do API requests
import api from '../api'

// Get the Vuex store
const store = useStore()
const location = useRoute() // Get loaction url

// Get testString variable from the store
const testString = computed(() => store.state.testString)

// Add A to the testing string func
const addCharAtoString = () => {
  store.commit('addCharAtoString') // mutation
}

// Delete last char from the testing string func
const deleteCharFromString = () => {
  store.commit('deleteCharFromString') // mutation
}

// Reset testing string func
const resetTestingString = () => {
  store.dispatch('resetTestingString') // action
}

// Reactive variable healthCheck
const healthCheck = ref(null)

onMounted(() => {
  // Testing API connection
  api
    .get()
    .then((res) => (healthCheck.value = res.data))
    .catch(() => {
      // If there is any connection problem
      console.log('API connection has not been estabilished')
    })
})

// OAuth2 Google authentication func
const googleAuthenticate = async (state, code) => {
  if (state && code && !localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const details = {
      state,
      code
    }
    const formBody = Object.keys(details)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
      .join('&')
    try {
      const res = await api.post(
        `${import.meta.env.VITE_API_URL}auth/o/google-oauth2/?${formBody}`,
        config
      )
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }
}

// Check if there are any query params in url
watchEffect(async () => {
  // check query parameters in url
  const state = location.query.state
  const code = location.query.code

  if (state && code) {
    await googleAuthenticate(state, code)
  }
})
</script>
