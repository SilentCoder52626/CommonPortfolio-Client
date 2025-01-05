<script setup>
import axios from '../plugins/axios'
import { reactive } from 'vue';
import { useToast } from '../composables/useToast';
import { ref } from 'vue';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';
import CompanyLogo from '../components/CompanyLogo.vue';

const $toast = useToast();


const ForgetPasswordTemplate = ref(null);

const config = reactive({
  IsEmailSent: false,
  EmailValidation: "",
})

const data = reactive(
  {
    email: "",
  });


const ResetPassword = async () => {
  if (!data.email) {
    config.EmailValidation = "Please include a valid email address so we can get back to you";
    return;
  }
  loader.BlockWindow(ForgetPasswordTemplate.value, afterSlot("Please wait..."));

  const response = await axios.post("/auth/forget-password", data);

  if (response.status === 200) {

    $toast.success("Password reset succesfully.", 'Success');
    loader.UnBlockWindow();
    config.IsEmailSent = true;
  } else {
    console.error(response);
    $toast.error(response.data.reason, 'Error');
    loader.UnBlockWindow();

  }

};
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <CompanyLogo />

      <div v-if="config.IsEmailSent">
        <p class="mt-4 text-lg text-center text-green-900 ">
          Password reset successfully. Please check your email.
          <router-link to="/login" class="text-indigo-600 decoration-2 hover:underline font-medium">
            Login here
          </router-link>
        </p>
      </div>
      <div v-else>
        <div class="text-center">
          <h1 class="block text-lg bg-black-400 mt-2">Forgot password?</h1>
        </div>
        <div class="mt-4">

          <form @submit.prevent="ResetPassword" ref="ForgetPasswordTemplate">
            <div class="grid gap-y-2">
              <div>

                <label class="block">
                  <span class="text-sm text-gray-700">Email Address</span>
                  <input v-model="data.email" type="email"
                    class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    required aria-describedby="email-error">
                  <p class="text-xs text-red-600 mt-2" id="email-error">{{ config.EmailValidation }}</p>
                </label>


              </div>

              <div>
                <button type="submit"
                  class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                  Reset Password
                </button>
              </div>
              <div class="text-center">
                <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?
                  <router-link to="/login" class="text-indigo-600 decoration-2 hover:underline font-medium">
                    Login here
                  </router-link>
                </p>
              </div>
            </div>
          </form>

        </div>
      </div>

    </div>
  </div>
</template>



<style scoped>
html,
body {
  height: 100%;
}
</style>