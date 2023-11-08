<template>
  <select class="form-select h-50" aria-label="Select" @change="changeLanguage">
    <option :selected="selectedLocale === 'en'" value="en">
      {{ $t('components.select_item.en') }}
    </option>
    <option :selected="selectedLocale === 'ua'" value="ua">
      {{ $t('components.select_item.ua') }}
    </option>
  </select>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

// Get current locale
const { t, locale } = useI18n({ useScope: 'global' })

// Track selected locale to do changes in UI
let selectedLocale = locale.value

// Change language function
const changeLanguage = (event) => {
  selectedLocale = event.target.value // Get current locale

  // Change the locale
  if (selectedLocale === 'en') {
    locale.value = 'en'
  } else {
    locale.value = 'ua'
  }

  // Save language in local storage
  localStorage.setItem('lang', locale.value)
}
</script>
