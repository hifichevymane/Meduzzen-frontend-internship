<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Notifications list</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <p v-for="notification in notificationsList" :key="notification">{{ notification }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  modalId: {
    type: String,
    required: true
  }
})

const notificationsWebSocketURL = 'ws://localhost:8000/ws/notifications/'
const notificationsWebSocket = ref(null)
const notificationsList = ref([])

onMounted(() => {
  notificationsWebSocket.value = new WebSocket(notificationsWebSocketURL)
  notificationsWebSocket.value.onmessage = (e) => {
    const data = JSON.parse(e.data)
    console.log('data: ', data)
    notificationsList.value.push(data)
  }
})
</script>
