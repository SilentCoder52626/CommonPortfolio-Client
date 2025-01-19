<template>
    <div class="flex flex-col-reverse md:flex-row items-center mx-2.5 md:mx-20">
            
        <div class="mt-10 md:mt-30">
            <h1 class="text-3xl font-bold text-blue-900 tracking-tight font-inter text-center md:text-start md:ml-10 md:text-5xl">
                {{ personalDetails.name }}
            </h1>
            <h2 class="text-2xl text-center md:text-start  md:ml-10 md:text-4xl mt-2 md:mt-4 font-bold text-gray-700 tracking-tight leading-snug font-inter">
                {{ personalDetails.role }}
            </h2>
            <p class="text-md md:text-xl text-center md:text-start text-gray-600 mt-2 md:mt-4 font-inter">
                {{ personalDetails.shortDescription }}
            </p>
            <div class="mt-6 flex gap-4 justify-center md:justify-start">
                <button class="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700">
                View Projects
                </button>
                <button class="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-gray-300">
                About Me
                </button>
            </div>
        </div>
        <div class="flex justify-center mt-16 md:mt-32">
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