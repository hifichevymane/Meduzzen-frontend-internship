<template>
  <div class="col-lg-4 col-md-5 mb-5">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text">
          {{ description }}
        </p>
        <a :href="`companies/${id}`" class="btn btn-primary">{{
          $t('components.company_card.button')
        }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// All the company card component props
defineProps({
  name: String,
  description: String,
  id: Number
})
</script>

<style>
.card-img-top {
  width: 15em;
}
</style>
