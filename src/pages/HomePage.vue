<template>
  <navbar-item />

  <main-container>
    <div class="container-fluid text-center">
      <h1>Meduzzen Frontend Intership</h1>
      <p>{{ $t('pages.home_page.description') }}</p>
      <h2 v-if="healthCheck">{{ healthCheck }}</h2>
      <h2 v-else>{{ $t('pages.home_page.api_connection_error') }}</h2>
    </div>
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

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
