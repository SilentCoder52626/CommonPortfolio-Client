<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-xl p-6 bg-white rounded-md shadow-md">
      <CompanyLogo />

      <form class="mt-4" @submit.prevent="submit" ref="RegisterForm">

        <div class="grid md:grid-cols-2 gap-3 sm:grid-cols-1 mt-4">
          <label class="block">
            <span class="text-sm text-gray-700">Name</span>
            <input v-model="data.name" type="text" required
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          </label>
          <label class="block">
            <span class="text-sm text-gray-700">Username</span>
            <input v-model="data.userName" type="text" required
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          </label>
          <label class="block">
            <span class="text-sm text-gray-700">Email</span>
            <input v-model="data.email" type="email" required
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          </label>
          <label class="block">
            <span class="text-sm text-gray-700">Contact</span>
            <input v-model="data.contact" type="text"
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          </label>
          <label class="block mt-3">
            <span class="text-sm text-gray-700">Password</span>
            <input v-model="data.password" type="password" required
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          </label>
          <label class="block mt-3">
            <span class="text-sm text-gray-700">Re-Password</span>
            <input v-model="data.confirmPassword" type="password" required
              class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          </label>
        </div>
        <div class="mt-6">
          <button type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
            Sign Up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already a member?
        <RouterLink to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign In
        </RouterLink>

      </p>

    </div>
  </div>
</template>

<script setup>

import axios from '../plugins/axios'
import { reactive, ref } from 'vue';
import router from '../router';
import { useToast } from '../composables/useToast';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';
import CompanyLogo from '../components/CompanyLogo.vue';

const $toast = useToast();
const RegisterForm = ref(null);
const data = reactive({
  userName: "",
  name: "",
  email: "",
  contact: "",
  password: "",
  confirmPassword: ""
})
const submit = async () => {
  loader.BlockWindow(RegisterForm.value, afterSlot("Please wait.."));
  if (data.password != data.confirmPassword) {
    $toast.info("Password and confirm password mis-matched.")
    loader.UnBlockWindow();
    return;
  }
  var response = await axios.post("auth/register", JSON.stringify(data));
  if (response && response.status === 200) {
    $toast.success("Successfyully registered.");
    loader.UnBlockWindow();
    await router.push("/login");
  } else {
    loader.UnBlockWindow();
    console.error(response);
    $toast.error(response.data.reason, 'Error');
  }
}
</script>

<style scoped></style>