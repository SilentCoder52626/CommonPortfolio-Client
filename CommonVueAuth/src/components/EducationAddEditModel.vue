<script setup>
import { closeModal, confirmModal } from '@kolirt/vue-modal';
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    }
});

const OnSave = () => {
  confirmModal({ name: 'SimpleModal' });
}
</script>

<template>
  <SimpleModal :title="props.title" size="sm">

    <pre>props: {{ props }}</pre>
    <p>Modal 2</p>


    <template #footer>
      <button @click="OnSave" class="text-sm text-white bg-green-500 px-3 py-1 rounded-md" title="Edit">
                <fa icon="save" /> Save
            </button>
            <button @click="closeModal()" class="text-sm text-white bg-red-500 px-3 py-1 rounded-md pl-2" title="Cancel">
                <fa icon="times" /> Cancel
            </button>
    </template>
  </SimpleModal>
</template>

<style scoped></style>