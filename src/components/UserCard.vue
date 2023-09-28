<template>
  <div class="col-lg-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ username }}</h5>
        <div class="card-info mb-1 gap-1">
          <h6 class="fw-bold">{{ $t('components.user_card.first_name') }}:</h6>
          <h6>{{ firstName }}</h6>
        </div>
        <div class="card-info mb-1 gap-1">
          <h6 class="fw-bold">{{ $t('components.user_card.last_name') }}:</h6>
          <h6>{{ lastName }}</h6>
        </div>
        <div class="card-info mb-1 gap-1">
          <h6 class="fw-bold">{{ $t('components.user_card.email') }}:</h6>
          <h6>{{ email }}</h6>
        </div>
        <a href="#" class="btn btn-primary">{{ $t('components.user_card.button') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// All the card component props
defineProps({
  username: String,
  firstName: String,
  lastName: String,
  email: String
})
</script>
