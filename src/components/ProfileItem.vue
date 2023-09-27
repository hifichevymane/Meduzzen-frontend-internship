<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="row border border-2 rounded border-primary w-50 p-5">
      <div class="col-lg-6">
        <div v-for="field in info" :key="field.id" class="col-lg-12 d-flex">
          <p class="fw-bold">{{ $t(`components.profile_item.${field.label}`) }}:</p>
          <p>{{ field.value }}</p>
        </div>
      </div>
      <div class="col-lg-6 d-flex justify-content-end">
        <img src="../assets/img/profile-pic.webp" class="w-50 d-flex" alt="profile-pic" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Profile item component props
defineProps({
  info: Array
})
</script>

<style>
.col-lg-12.d-flex p {
  margin-right: 0.5em;
}
</style>
