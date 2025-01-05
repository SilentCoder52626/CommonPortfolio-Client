<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <CompanyLogo />

      <form class="mt-4" @submit.prevent="login" ref="loginTemplate">
        <label class="block">
          <span class="text-sm text-gray-700">Username</span>
          <input
            v-model="data.userName"
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

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <span class="mx-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div>
            <router-link
              class="block text-sm text-indigo-700 fontme hover:underline"
              to="/forget-password"
            >Forgot your password?</router-link>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
      
        <p class="mt-5 text-center text-sm/6 text-gray-500">
        Not a member?
        <RouterLink to="/register" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign Up</RouterLink>
    </p>
      
     
    </div>
  </div>
</template>


<script setup>
import axios from '../plugins/axios'
import { reactive } from 'vue';
import router from '../router';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../composables/useToast';
import { ref } from 'vue';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';
import CompanyLogo from '../components/CompanyLogo.vue';
const $toast = useToast();

const authStore = useAuthStore();

const loginTemplate = ref(null);


const data =  reactive(
  {
  userName: "",
  password: ""
});

const validation =  reactive(
  {
  userNameVal: "",
  passwordVal: ""
});

const login =  async () =>{
    validation.userNameVal = "";
    validation.passwordVal = "";
    loader.BlockWindow(loginTemplate.value,afterSlot("Please wait..."));
    if(checkValidation()){
        const response = await axios.post("/auth/login",data);
        
        if (response.status === 200) {
            const authResponse = await response.data;
            
            authStore.setAuthDetails({
              jwt : authResponse.jwt,
              username: authResponse.username,
              email: authResponse.email,
              role: authResponse.role,
            });
            $toast.success('Login Successfully!', 'Success');
            loader.UnBlockWindow();

            await router.push("/");
        } else {
            console.error(response);
            $toast.error(response.data.reason, 'Error'); 
            loader.UnBlockWindow();

        }
    }
  
};
const checkValidation = () => {
    if(!data.userName){
      validation.userNameVal = "Username is required."
      $loader.unBlockContent();
        return false;
    }
    if(!data.password){
      validation.passwordVal = "Password is required."
      $loader.unBlockContent();

        return false;
    }
    return true;
}

</script>

<style scoped>
</style>