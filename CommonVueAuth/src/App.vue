<script setup>
import { RouterView } from 'vue-router';
import Nav from "@/components/Nav.vue";

import { useAuthStore } from './stores/authStore';

const authStore = new useAuthStore();
</script>

<template>
  
<main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
  
  <template v-if="authStore.isLoggedIn">

<Nav />
</template>
  <div class="p-6">
  <RouterView />
</div>
  </main>

</template>

<style scoped>

</style>
