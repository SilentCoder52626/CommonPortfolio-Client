

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-lg p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <svg
          class="w-10 h-10"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
            fill="#4C51BF"
            stroke="#4C51BF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
            fill="white"
          />
        </svg>
        <span class="text-2xl font-semibold text-gray-700">Common Portfolio</span>
      </div>

      <form class="mt-4" @submit.prevent="submit" ref="RegisterForm">
        <label class="block">
          <span class="text-sm text-gray-700">Name</span>
          <input
            v-model="data.name"
            type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">Username</span>
          <input
            v-model="data.userName"
            type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">Email</span>
          <input
            v-model="data.email"
            type="email"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>
        <label class="block">
          <span class="text-sm text-gray-700">Contact</span>
          <input
            v-model="data.contact"
            type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Password</span>
          <input
            v-model="data.password"
            type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>
        <label class="block mt-3">
          <span class="text-sm text-gray-700">Re-Password</span>
          <input
            v-model="data.confirmPassword"
            type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          >
        </label>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
          >
            Sign in
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
import { reactive,ref } from 'vue';
import router from '../router';
import { useToast } from '../composables/useToast';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';

const $toast = useToast();
const RegisterForm = ref(null);
const data = reactive({
    userName: "",
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword : ""
})
const submit = async () =>{
  loader.BlockWindow(RegisterForm,afterSlot("Please wait.."));
  if(data.password != data.confirmPassword){
      $toast.info("Password and confirm password mis-matched.")
      loader.UnBlockWindow();
        return;
    }
    var response = await axios.post("auth/register",JSON.stringify(data));
    if(response.status === 200){
      $toast.success("Successfyully registered.");
      loader.UnBlockWindow();
        await router.push("/login");
    }else{
      loader.UnBlockWindow();
      console.error(response);
      $toast.error(response.data.reason, 'Error'); 
    }
}
</script>

<style scoped></style>