<template>
    <div class="mt-8 flex flex-col items-center justify-center md:items-start md:justify-start">
        <h1 class="text-2xl font-bold mb-4 text-start">My Card</h1>
        <div class="rounded-lg shadow-lg bg-lightGray gap-4  w-4/5 md:w-1/2">
            <div class="py-12 mx-8 flex flex-col justify-center items-center">
                <div class="rounded-full shadow-md w-24 h-24 overflow-hidden">
                    <img class="object-cover w-full h-full rounded-full"
                        src="https://res.cloudinary.com/dkoc7pi7u/image/upload/v1737299508/rr5v6rwkbrz9j9v6tyr0.jpg"
                        alt="Your avatar" />
                </div>
                <div class="mt-4">
                    <h2 class="text-xl text-bold text-center m-0">{{ cardDetails.name }}</h2>
                    <p class="text-md text-gray-600 text-center pt-1 m-0">{{ cardDetails.role }}</p>
                    <div class="flex flex-row items-center justify-center gap-3 mt-4">
                        <a :href="cardDetails.socialLinks.github" target="_blank">
                            <span>
                                <fa :icon="['fab', 'github']" class="size-5 text-gray-600 hover:text-black" />
                            </span>
                        </a>
                        <a :href="cardDetails.socialLinks.twitter" target="_blank">
                            <span>
                                <fa :icon="['fab', 'twitter']" class="size-5 text-gray-600  hover:text-black" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    cardDetails: {
        type: Object,
        required: false,
    },
});
</script>