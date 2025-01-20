<template>
    <div class="flex flex-col-reverse lg:flex-row items-center mx-2.5 lg:mx-20 mb-16 ">

        <div class="w-full mt-16 lg:mt-32 lg:w-1/2 ">
            <div class="flex flex-col items-center lg:items-start">
                <h1 class="text-4xl font-bold text-blue-900 tracking-tight lg:text-6xl">
                    {{ personalDetails.name }}
                </h1>
                <h2
                    class="text-4xl lg:text-6xl font-bold text-gray-700 tracking-tight leading-snug ">
                    {{ personalDetails.role }}
                </h2>
                <p class="text-md lg:text-2xl text-gray-600 -pt-1 lg:pt-4 text-center lg:text-start ">
                    {{ personalDetails.shortDescription }}
                </p>
            </div>

            <div class="mt-3 flex gap-4 items-center lg:items-start justify-center lg:justify-start">
                <button class="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700">
                    View Projects
                </button>
                <button class="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-gray-300">
                    About Me
                </button>
            </div>
        </div>
        <div class="flex justify-center w-full lg:w-1/2 mt-16 lg:mt-0">
            <img :src="personalDetails.banner" alt="Kaman Khadka" class="rounded-lg max-h-80 max-w-80" />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    personalDetails: {
        type: Object,
        required: true
    }
})
</script>