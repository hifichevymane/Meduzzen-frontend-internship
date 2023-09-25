<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center">Log in</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <!-- Login form -->
        <auth-form :fields="fields" button="Login" />
      </div>
    </div>
  </main-container>
</template>

<script>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import AuthForm from '../components/forms/AuthForm.vue'

export default {
  components: {
    NavbarItem,
    MainContainer,
    AuthForm
  },

  data() {
    return {
      // All login fields
      fields: [
        { id: 0, label: 'Email', type: 'email', inputId: 'email' },
        { id: 1, label: 'Password', type: 'password', inputId: 'password' },
        { id: 2, label: 'Remember me', type: 'checkbox', inputId: 'rememberMe' }
      ]
    }
  }
}
</script>
