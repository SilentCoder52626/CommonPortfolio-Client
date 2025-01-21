<template>
  <div class="">
    <div class="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
      <div v-for="(highlight, index) in highlights" :key="index"
        class="px-4 pt-3 bg-lightGray rounded-lg shadow-sm border border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">{{ highlight.title }}</h2>
        <p class="mt-2 text-gray-600">{{ highlight.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  highlights: {
    type: Array,
    required: true
  }
})
</script>

<style scoped></style>