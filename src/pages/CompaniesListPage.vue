<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.companies_list_page.heading') }}</h1>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center px-5">
        <company-card
          v-for="company in companies"
          :key="company.id"
          :name="company.name"
          :description="company.desc"
          :url="company.url"
        />
      </div>
    </div>
  </main-container>
</template>

<script setup>
import CompanyCard from '../components/CompanyCard.vue'
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'

// Companies list
const companies = [
  {
    id: 0,
    name: 'Apple',
    desc: 'With supporting text below as a natural lead-in to additional content.',
    url: '/'
  },
  {
    id: 1,
    name: 'Google',
    desc: 'With supporting text below as a natural lead-in to additional content.',
    url: '/'
  },
  {
    id: 2,
    name: 'Meduzzen',
    desc: 'With supporting text below as a natural lead-in to additional content.',
    url: '/'
  }
]
</script>
