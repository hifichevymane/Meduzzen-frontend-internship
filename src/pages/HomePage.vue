<template>
  <navbar-item />

  <main-container>
    <div class="container-fluid text-center">
      <h1>Meduzzen Frontend Intership</h1>
      <p>Hello, this is a Meduzzen Frontent Intership project!</p>
      <h2>{{ healthCheck }}</h2>
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
    .catch((err) => {
      // If there is any connection problem
      console.log(err)
      healthCheck.value = 'API connection has not been estabilished'
    })
})
</script>
