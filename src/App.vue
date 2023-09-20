<template>
  <div class="container">
    <h1>Meduzzen Frontend Intership</h1>
    <p>Hello, this is a Meduzzen Frontent Intership project!</p>
    {{ healthCheck }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      healthCheck: {}
    }
  },
  // Testing API
  mounted() {
    // Vite .env variables https://vitejs.dev/guide/env-and-mode.html
    axios.get(import.meta.env.VITE_API_URL).then((res) => (this.healthCheck = res.data))
  }
}
</script>
