<template>
  <div class="col-lg-3 col-md-6 mb-3">
    <div class="card w-100">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text">
          {{ description }}
        </p>
        <a :href="url" class="btn btn-primary">Check the company</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Props for card
  props: {
    name: String,
    description: String,
    url: String
  }
}
</script>

<style>
.card-img-top {
  width: 15em;
}
</style>
