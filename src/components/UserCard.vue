<template>
  <div class="col-lg-4 col-md-5 mb-5">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ username }}</h5>
        <div class="card-info mb-1 gap-1">
          <h6 class="fw-bold">{{ $t('components.user_card.first_name') }}:</h6>
          <h6>{{ user.first_name }}</h6>
        </div>
        <div class="card-info mb-1 gap-1">
          <h6 class="fw-bold">{{ $t('components.user_card.last_name') }}:</h6>
          <h6>{{ user.last_name }}</h6>
        </div>
        <div class="card-info mb-1 gap-1">
          <h6 class="fw-bold">{{ $t('components.user_card.email') }}:</h6>
          <h6>{{ user.email }}</h6>
        </div>
        <router-link
          :to="{ name: 'UserProfile', params: { id: user.id } }"
          class="btn btn-primary"
          >{{ $t('components.user_card.button') }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

// All the card component props
defineProps({
  user: Object
})
</script>
