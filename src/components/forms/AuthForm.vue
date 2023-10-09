<template>
  <form class="col-lg-4">
    <!-- Fields -->
    <first-name-field
      v-if="location.path === '/sign-up'"
      @get-first-name="getFirstName"
      :label="fields.firstNameLabel"
    />
    <last-name-field
      v-if="location.path === '/sign-up'"
      @get-last-name="getLastName"
      :label="fields.lastNameLabel"
    />
    <email-field
      v-if="location.path === '/sign-up'"
      @get-email="getEmail"
      :label="fields.emailLabel"
    />
    <username-field @get-username="getUsername" :label="fields.usernameLabel" />
    <password-field @get-password="getPassword" :label="fields.passwordLabel" />
    <password-repeat-field
      v-if="location.path === '/sign-up'"
      @get-password-repeat="getPasswordRepeat"
      :label="fields.passwordRepeatLabel"
      :isPasswordValid="isPasswordValid"
    />
    <checkbox-field :label="fields.checkboxLabel" />
    <!-- Button -->
    <button
      v-if="location.path === '/login'"
      @click.prevent="login"
      type="submit"
      class="btn btn-primary"
    >
      {{ $t('components.auth_form.button.login') }}
    </button>
    <button
      v-if="location.path === '/sign-up'"
      @click.prevent="signUp"
      type="submit"
      class="btn btn-primary"
    >
      {{ $t('components.auth_form.button.sign_up') }}
    </button>
    <button
      v-if="location.path === '/sign-up'"
      @click="signUpWithGoogle"
      type="button"
      class="btn btn-danger d-block mt-3"
    >
      {{ $t('components.auth_form.button.sign_up_google') }}
    </button>
  </form>
</template>

<script setup>
import EmailField from './fields/EmailField.vue'
import UsernameField from './fields/UsernameField.vue'
import FirstNameField from './fields/FirstNameField.vue'
import LastNameField from './fields/LastNameField.vue'
import PasswordField from './fields/PasswordField.vue'
import PasswordRepeatField from './fields/PasswordRepeatField.vue'
import CheckboxField from './fields/CheckboxField.vue'

import { ref, computed } from 'vue'
import api from '../../api'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore() // Vuex store
const location = useRoute() // Get current path

// Sign Up form fields labels
const fields = {
  usernameLabel: 'Username',
  emailLabel: 'Email',
  firstNameLabel: 'First name',
  lastNameLabel: 'Last name',
  passwordLabel: 'Password',
  passwordRepeatLabel: 'Repeat the password',
  checkboxLabel: 'Remember me'
}

const firstNameField = ref('')
const lastNameField = ref('')
const emailField = ref('')
const usernameField = ref('')
const passwordField = ref('')
const passwordRepeatField = ref('')

// Get first name from children component
const getFirstName = (value) => {
  firstNameField.value = value
}

// Get last name from children component
const getLastName = (value) => {
  lastNameField.value = value
}

// Get username from children component
const getUsername = (value) => {
  usernameField.value = value
}

// Get email from children component
const getEmail = (value) => {
  emailField.value = value
}

// Get password from children component
const getPassword = (value) => {
  passwordField.value = value
}

// Get password repeat from children component
const getPasswordRepeat = (value) => {
  passwordRepeatField.value = value
}

// If passwords are simmilar
const isPasswordValid = computed(() => {
  return passwordField.value === passwordRepeatField.value
})

// Login function
const login = () => {
  const body = {
    username: usernameField.value,
    password: passwordField.value
  }
  // Login action from store
  store.dispatch('auth/login', body)
}

// Sign up func
const signUp = async () => {
  const body = {
    email: emailField.value,
    username: usernameField.value,
    first_name: firstNameField.value,
    last_name: lastNameField.value,
    password: passwordField.value
  }

  // Sign up action from store
  store.dispatch('auth/signUp', body)
}

// Sign up with Google (DOESN'T WORK CORRECTLY)
const signUpWithGoogle = async () => {
  const res = await api.get(
    `${import.meta.env.VITE_API_URL}auth/o/google-oauth2/?redirect_uri=http://localhost:5173`
  )

  window.location.replace(res.data.authorization_url)
}
</script>
