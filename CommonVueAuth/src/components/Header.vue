<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { useAuthStore } from '../stores/authStore';
import router from '../router';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

const dropdownOpen = ref(false)
const { isOpen } = useSidebar()

const Logout = async () => {
    authStore.clearAuthDetails();
    await router.push("/login");
  }

</script>

<template>
  <header
    class="flex items-center justify-between px-5 py-3 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden mr-6"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <h4 class="text-xl font-medium text-gray-700 capitalize mb-0">
        {{$route.name}}
    </h4>
    </div>
    
    <div class="flex items-center">
      <div class="relative">
        <button
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <img
            class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar"
          >
        </button>

        <div
          v-show="dropdownOpen"
          class="fixed inset-0 z-10 w-full h-full"
          @click="dropdownOpen = false"
        />

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div v-show="dropdownOpen" class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl" >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" >Profile</a>
            <RouterLink to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"> Settings </RouterLink>

            <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" @click="Logout" > Log out </a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
