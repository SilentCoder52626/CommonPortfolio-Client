<template>
    <div class="mt-8 flex flex-col items-center justify-center lg:items-start lg:justify-start">
        <h1 class="text-2xl font-bold mb-4 text-start">My Card</h1>
        <div class="rounded-lg shadow-lg bg-lightGray gap-4  w-4/5 md:w-1/3">
            <div class="py-12 mx-8 flex flex-col justify-center items-center">
                <div class="rounded-full shadow-md w-24 h-24 overflow-hidden">
                    <img class="object-cover w-full h-full rounded-full"
                        :src="cardDetails.profile"
                        alt="" />
                </div>
                <div class="mt-4">
                    <h2 class="text-xl text-bold text-center m-0">{{ cardDetails.name }}</h2>
                    <p class="text-md text-gray-600 text-center pt-1 m-0">{{ cardDetails.role }}</p>
                    <div class="flex flex-row items-center justify-center gap-3 mt-4">
                        <a :href="props.cardDetails.socialLinks.github" target="_blank" v-if="props.cardDetails.socialLinks.github">
                            <span>
                                <fa :icon="['fab', 'github']" class="size-6 text-gray-600 mr-3 hover:text-black" />
                            </span>
                        </a>
                        <a :href="props.cardDetails.socialLinks.twitter" target="_blank" v-if="props.cardDetails.socialLinks.twitter">
                            <span>
                                <fa :icon="['fab', 'twitter']" class="size-6 text-gray-600 mr-3 hover:text-sky-500" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, onMounted } from 'vue';
onMounted(() => {
    console.log(props.cardDetails);
});
const props = defineProps({
    cardDetails: {
        type: Object,
        required: false,
    },
});
</script>