<script setup >
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Footer from './Footer.vue';

import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();

</script>

<template v-if="authStore.isLoggedIn">
  <div class="flex h-screen bg-gray-100 font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto" id="main-content">
        <div class="px-5 py-4">
          <slot />
        </div>
      </main>
      <Footer/>


    </div>
    
  </div>
</template>
