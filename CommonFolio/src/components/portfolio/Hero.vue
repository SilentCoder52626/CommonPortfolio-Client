<template>
    <div class="flex flex-col-reverse lg:flex-row items-center mb-16  ">

        <div class="w-full mt-16 lg:mt-32 lg:w-2/3 ">
            <div class="flex flex-col items-center lg:items-start">
                <h1 class="text-4xl font-bold text-blue-900 tracking-tight lg:text-6xl">
                    {{ personalDetails.name }}
                </h1>
                <h2 class="text-4xl lg:text-6xl font-bold text-gray-700 tracking-tight leading-snug ">
                    {{ personalDetails.role }}
                </h2>
                <p class="text-md lg:text-2xl text-gray-600 -pt-1 lg:pt-4 text-start md:text-start ">
                    {{ personalDetails.shortDescription }}
                </p>
            </div>

            <div class="mt-3 flex gap-4 items-center lg:items-start justify-center lg:justify-start">
                <a :href="personalDetails.cvLink" target="_blank"
                    class="bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700">
                    View Resume
                </a>
                <button type="button" class="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-lg hover:bg-gray-300" @click="goToAbout">
                    About Me
                </button>
            </div>
        </div>
        <div class="flex justify-center w-auto lg:w-1/3 mt-16 lg:mt-0">
            <img :src="personalDetails.banner" alt="Kaman Khadka" class="rounded-lg max-h-80 w-full" />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const emit = defineEmits();

defineProps({
    personalDetails: {
        type: Object,
        required: true
    }
})
function goToAbout() {
    emit('goToAbout');
}
</script>