<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-3">Users list</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center px-5">
        <!-- All the users -->
        <user-card
          v-for="user in users"
          :key="user.id"
          :username="user.username"
          :firstName="user.firstName"
          :lastName="user.lastName"
          :email="user.email"
        />
      </div>
    </div>
  </main-container>
</template>

<script setup>
import NavbarItem from '../components/NavbarItem.vue'
import MainContainer from '../components/MainContainer.vue'
import UserCard from '../components/UserCard.vue'

// Users list
const users = [
  {
    id: 0,
    username: 'biba_228',
    firstName: 'Artur',
    lastName: 'Egorov',
    email: 'nomail@mail.com'
  },
  {
    id: 1,
    username: 'vasya_1337',
    firstName: 'Vasiliy',
    lastName: 'Richter',
    email: 'nomail@mail.com'
  },
  {
    id: 2,
    username: 'boba_228',
    firstName: 'Semen',
    lastName: 'Gagauz',
    email: 'nomail@mail.com'
  }
]
</script>

<style>
.card-info {
  display: flex;
}
</style>
