<script setup>
import { closeModal, confirmModal } from '@kolirt/vue-modal';

const props = defineProps({
    title: {
        type : string,
        required: true
    }
});
</script>

<template>
  <SimpleModal :title="props.title" size="sm">
    <template #body>
      <p>Modal 2</p>
    </template>

    <template #footer>
      <button @click="closeModal()" class="btn btn-danger">Close</button>
      <button @click="confirmModal({ test: 'modal2' })" class="btn btn-success">Confirm</button>
    </template>
  </SimpleModal>
</template>

<style scoped></style>