<script setup>
import { RouterView } from 'vue-router';
import Nav from "@/components/Nav.vue";


const showToast = () => {
  $toast.success('This is a success toast!');
};
</script>

<template>

<button @click="showToast">Show Toast</button>
  <Nav />

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
