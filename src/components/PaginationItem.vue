<template>
  <nav v-if="pageCount > 1" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <button v-if="previousPage" @click="toPreviousPage" class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <button @click="changePage(page)" class="page-link">{{ page }}</button>
      </li>
      <li class="page-item">
        <button v-if="nextPage" @click="toNextPage" class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['pageCount', 'currentPage', 'nextPage', 'previousPage'])
const emit = defineEmits(['onChangePage', 'toNextPage', 'toPreviousPage'])

const pageCount = computed(() => props.pageCount)
const currentPage = computed(() => props.currentPage)
const nextPage = computed(() => props.nextPage)
const previousPage = computed(() => props.previousPage)

const changePage = (page) => {
  emit('onChangePage', page)
}

const toPreviousPage = () => {
  emit('toPreviousPage')
}

const toNextPage = () => {
  emit('toNextPage')
}
</script>
