<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center">{{ $t('pages.login_page.heading') }}</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <!-- Login form -->
        <auth-form />
      </div>
    </div>
  </main-container>
</template>

<script setup>
import AuthForm from '../components/forms/AuthForm.vue'
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
</script>
