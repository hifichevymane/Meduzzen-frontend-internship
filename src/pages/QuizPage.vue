<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center">{{ $t('pages.quiz_profile_page.heading') }}</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-6 border border-2 rounded border-primary p-5 my-3">
          <quiz-profile-form />
        </div>
      </div>
    </div>
    <new-notification-toast />
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import QuizProfileForm from '../components/forms/QuizProfileForm.vue'
import NewNotificationToast from '../components/NewNotificationToast.vue'
</script>
