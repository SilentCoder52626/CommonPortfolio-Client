<template>
    <div
      class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="">
              <h1 class="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </h1>
              <p class="my-2 text-gray-800">Sorry about that! If you are the owner of what you are looking for or want
                to be one follow the link below.</p>
              <div class="flex flex-row gap-4">

                <RouterLink to="/login" class="bg-white p-2 rounded-md focus:outline-none text-bold text-red-800 decoration-3  hover:!underline font-medium">Login here
                </RouterLink>
                <RouterLink to="/register" class="bg-white p-2 rounded-md focus:outline-none text-bold text-indigo-500 decoration-3 hover:!underline font-medium">Register here
                </RouterLink>
              </div>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';

</script>