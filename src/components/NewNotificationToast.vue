<template>
  <div class="toast-container position-fixed p-3 bottom-0 end-0">
    <div
      :id="newNotificationToastId"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-autohide="false"
    >
      <div class="toast-header">
        <strong class="me-auto">{{ $t('components.new_notification_toast.heading') }}</strong>
        <button
          @click="hideNewNotificationToast"
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        />
      </div>
      <div class="toast-body">{{ $t('components.new_notification_toast.body') }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'bootstrap'

const store = useStore()

const newNotificationToast = ref(null)
const newNotificationToastId = 'newNotificationToast'

const isNewNotificationToastActive = computed(
  () => store.getters['notifications/getIsNewNotificationToastActive']
)

const hideNewNotificationToast = () => {
  store.commit('notifications/setIsNewNotificationToastActive', false)
  newNotificationToast.value.hide()
}

onMounted(() => {
  newNotificationToast.value = new Toast(document.getElementById(newNotificationToastId))
})

watch(isNewNotificationToastActive, (newValue) => {
  if (newValue) {
    newNotificationToast.value.show()
  }
})

onBeforeUnmount(() => {
  store.commit('notifications/setIsNewNotificationToastActive', false)
})
</script>
