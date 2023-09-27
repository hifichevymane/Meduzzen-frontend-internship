<template>
  <navbar-item />
  <main-container>
    <h1 class="text-center mb-4">Sign up</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <!-- Sign In form -->
        <auth-form :fields="fields" button="Sign up" />
      </div>
    </div>
  </main-container>
</template>

<script setup>
import AuthForm from '../components/forms/AuthForm.vue'
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'

// All sign up form fields
const fields = [
  { id: 0, label: 'First name', type: 'text', inputId: 'firstName' },
  { id: 1, label: 'Last name', type: 'text', inputId: 'lastName' },
  { id: 2, label: 'Email adress', type: 'email', inputId: 'email' },
  { id: 3, label: 'Password', type: 'password', inputId: 'password1' },
  { id: 4, label: 'Repeat the password', type: 'password', inputId: 'password2' },
  { id: 5, label: 'Remember me', type: 'checkbox', inputId: 'rememberMe' }
]
</script>
