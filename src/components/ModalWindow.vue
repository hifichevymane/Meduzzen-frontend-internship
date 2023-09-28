<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ $t('components.modal_window.heading') }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ $t('components.modal_window.body') }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            {{ $t('components.modal_window.close_button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-content {
  color: rgba(255, 255, 255, 0.792);
}
</style>
