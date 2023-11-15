<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.notifications_modal.notifications_list_heading') }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <h4>{{ $t('components.notifications_modal.unread_notifications_heading') }}:</h4>
          <div
            class="card mb-3"
            v-for="notification in unreadNotificationsList"
            :key="notification.id"
          >
            <div class="card-body">
              <p>{{ notification.text }}</p>
              <div class="d-flex gap-3">
                <button @click="markNotificationAsRead(notification)" class="btn btn-success">
                  {{ $t('components.notifications_modal.buttons.mark_as_read') }}
                </button>
                <button @click="deleteNotification(notification.id)" class="btn btn-danger">
                  {{ $t('components.notifications_modal.buttons.delete_notification') }}
                </button>
              </div>
            </div>
          </div>
          <h4>{{ $t('components.notifications_modal.read_notifications_heading') }}:</h4>
          <div
            class="card mb-3"
            v-for="notification in readNotificationsList"
            :key="notification.id"
          >
            <div class="card-body">
              <p>{{ notification.text }}</p>
              <button @click="deleteNotification(notification.id)" class="btn btn-danger">
                {{ $t('components.notifications_modal.buttons.delete_notification') }}
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">
            {{ $t('components.modal_window.close_button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

defineProps({
  modalId: {
    type: String,
    required: true
  }
})

const store = useStore()

const notificationsWebSocketURL = `ws://localhost:8000/ws/notifications/?token=${localStorage.getItem(
  'access'
)}`
const notificationsWebSocket = ref(null)

const notificationsList = computed(() => store.getters['notifications/getNotificationsList'])
const unreadNotificationsList = computed(() => {
  return notificationsList.value.filter((notification) => notification.status === 'unread')
})
const readNotificationsList = computed(() => {
  return notificationsList.value.filter((notification) => notification.status === 'read')
})

const markNotificationAsRead = (notification) => {
  const data = {
    id: notification.id,
    status: 'read',
    type: 'mark_read'
  }

  notificationsWebSocket.value.send(JSON.stringify(data))
  notification.status = 'read'
}

const deleteNotification = (id) => {
  const data = {
    id, // Notification id
    type: 'delete_notification'
  }

  notificationsWebSocket.value.send(JSON.stringify(data))
  // Delete notification from the list
  store.commit('notifications/deleteNotificationFromList', id)
}

onMounted(() => {
  store.commit('notifications/setNotificationsList', [])
  notificationsWebSocket.value = new WebSocket(notificationsWebSocketURL)

  notificationsWebSocket.value.onmessage = (e) => {
    const data = JSON.parse(e.data)
    store.commit('notifications/pushNewNotification', data.payload)

    // When new notifications were sent - display new notification toast
    if (data.payload.type !== 'init_notifications')
      store.commit('notifications/setIsNewNotificationToastActive', true)
  }
})
</script>
