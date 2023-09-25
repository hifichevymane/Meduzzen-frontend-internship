<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">User profile</h1>
    <!-- Our User's data -->
    <profile-item :info="info" />
  </main-container>
</template>

<script>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import ProfileItem from '../components/ProfileItem.vue'

export default {
  components: {
    NavbarItem,
    MainContainer,
    ProfileItem
  },
  data() {
    return {
      // User data
      info: [
        { id: 0, label: 'First name', value: 'name' },
        { id: 1, label: 'Last name', value: 'last name' },
        { id: 2, label: 'Email', value: 'email@email.com' }
      ]
    }
  }
}
</script>

<style>
.col-lg-12.d-flex p {
  margin-right: 0.5em;
}
</style>
