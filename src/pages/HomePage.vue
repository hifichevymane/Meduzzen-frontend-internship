<template>
  <navbar-item />

  <main-container>
    <div class="container-fluid text-center">
      <h1>Meduzzen Frontend Intership</h1>
      <p>Hello, this is a Meduzzen Frontent Intership project!</p>
      <h2 v-if="healthCheck">{{ healthCheck }}</h2>
      <h2 v-else>API connection has not been estabilished</h2>
    </div>
  </main-container>
</template>

<script>
import axios from 'axios'
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'

export default {
  components: {
    NavbarItem,
    MainContainer
  },

  data() {
    return {
      healthCheck: null
    }
  },
  // Testing API
  mounted() {
    // Vite .env variables https://vitejs.dev/guide/env-and-mode.html
    axios.get(import.meta.env.VITE_API_URL).then((res) => (this.healthCheck = res.data))
  }
}
</script>
