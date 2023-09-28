<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.company_profile_page.heading') }}</h1>
    <profile-item :info="info" />
  </main-container>
</template>

<script setup>
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'
import ProfileItem from '../components/ProfileItem.vue'

// All company's info
const info = [
  { id: 0, label: 'Company name', value: 'Apple' },
  { id: 1, label: 'SEO', value: 'Tim Cook' },
  { id: 2, label: 'Net worth', value: '1000000 $' }
]
</script>
