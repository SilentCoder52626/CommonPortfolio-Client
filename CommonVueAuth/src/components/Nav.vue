<template>
    <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
       

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/" class="nav-link px-2 text-white">Home</router-link></li>
        </ul>

        <div class="text-end">
          <template v-if="authStore.isLoggedIn">
            <a class="btn btn-danger" v-on:click="Logout">Log Out</a>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
            <router-link to="/register" class="btn btn-warning">Sign-up</router-link>
          </template>
          
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
  import router from '@/router'
  import { useAuthStore } from '@/stores/authStore';

  const authStore = useAuthStore();

  const Logout = async () => {
    authStore.clearAuthDetails();
    await router.push("/login");
  }
</script>
<style scoped>
</style>