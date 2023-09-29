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
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

// Get the Vuex store
const store = useStore()

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
  axios
    .get(import.meta.env.VITE_API_URL)
    .then((res) => (this.healthCheck = res.data))
    .catch(() => {
      // If there is any connection problem
      console.log('API connection has not been estabilished')
    })
})
</script>
