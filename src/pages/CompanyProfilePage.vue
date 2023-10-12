<template>
  <navbar-item />

  <main-container>
    <h1 class="text-center mb-4">{{ $t('pages.company_profile_page.heading') }}</h1>
    <div class="container-fluid d-flex justify-content-center">
      <div class="row border border-2 rounded border-primary w-75 p-5">
        <div class="col-lg-6">
          <div v-for="field in mockInfo" :key="field.id" class="input-group mb-3">
            <span class="input-group-text" :id="field.inputId">{{ field.label }}:</span>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              :aria-describedby="field.inputId"
              :value="field.value"
              disabled
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-12 m-auto text-center">
          <img src="../assets/img/profile-pic.webp" class="w-50" alt="profile-pic" />
        </div>
      </div>
    </div>
    <!-- Modal window -->
  </main-container>
</template>

<script setup>
import MainContainer from '../components/MainContainer.vue'
import NavbarItem from '../components/NavbarItem.vue'

// All company's info
const mockInfo = [
  { id: 0, label: 'Company name', value: 'Apple', inputId: 'company-name' },
  { id: 1, label: 'SEO', value: 'Tim Cook', inputId: 'company-SEO' },
  { id: 2, label: 'Net worth(in $)', value: '1000000', inputId: 'company-net-worth' }
]
</script>
