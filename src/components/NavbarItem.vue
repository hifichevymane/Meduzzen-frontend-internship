<template>
  <header>
    <nav class="navbar navbar-expand-lg p-4 bg-dark" data-bs-theme="dark">
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
            <!-- <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li> -->
            <li v-for="link in leftLinks" :key="link.id" class="nav-item">
              <a class="nav-link" :href="link.url">{{ link.name }}</a>
            </li>
          </ul>
          <!-- Right part of the navbar -->
          <ul class="navbar-nav ms-auto">
            <li v-for="link in rightLinks" :key="link.id" class="nav-item">
              <a class="nav-link" :href="link.url">{{ link.name }}</a>
            </li>
          </ul>
          <!-- Modal window button -->
          <button class="btn btn-primary" @click="showModal">Show modal</button>
          <!-- Modal window -->
          <modal-window />
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import ModalWindow from './ModalWindow.vue'
import { Modal } from 'bootstrap'

export default {
  components: {
    ModalWindow
  },

  data() {
    return {
      // Modal window variable
      modalWindow: null,
      //  All the links of the left part of the navbar
      leftLinks: [
        { id: 0, name: 'Home', url: '/' },
        { id: 1, name: 'About', url: '/about' },
        { id: 2, name: 'Companies', url: '/companies' },
        { id: 3, name: 'Users', url: '/users' }
      ],
      //  All the links of the right part of the navbar
      rightLinks: [
        { id: 0, name: 'Sign up', url: '/sign-in' },
        { id: 1, name: 'Log in', url: '/login' },
        { id: 2, name: 'Company Profile', url: '/company' },
        { id: 3, name: 'User Profile', url: '/user' }
      ]
    }
  },

  methods: {
    // Showing modal window function
    showModal() {
      this.modalWindow.show()
    }
  },

  mounted() {
    // Creating the modalWindow instance when the component is mounted
    this.modalWindow = new Modal(document.getElementById('modal'))
  }
}
</script>
