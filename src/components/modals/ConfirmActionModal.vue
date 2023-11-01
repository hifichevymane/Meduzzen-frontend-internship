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
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.confirm_modal.heading') }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ $t('components.confirm_modal.body') }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            {{ $t('components.confirm_modal.buttons.close') }}
          </button>
          <button
            @click="onConfirmAction"
            type="button"
            class="btn btn-success"
            data-bs-dismiss="modal"
          >
            {{ $t('components.confirm_modal.buttons.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['modalId'])

const emit = defineEmits(['onConfirmAction'])

const onConfirmAction = () => {
  emit('onConfirmAction')
}
</script>
