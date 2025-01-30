<template>
    <div class="container mx-auto px-4">
        <Hero :personalDetails="props.personalInfo" @goToAbout="forwardToParent" />
        <Highlight :highlights="props.highlights" />
        <Card :cardDetails="props.cardDetails" />

    </div>


</template>
<script setup>
import { defineProps, reactive } from 'vue'
import Hero from './Hero.vue';
import Highlight from './Highlight.vue';
import Card from './Card.vue';


const props = defineProps({

    personalInfo: {
        type: Object,
        required: false,
    },
    highlights: {
        type: Object,
        required: false
    },
    socialLinks: {
        type: Object,
        required: false
    },
    cardDetails: {
        type: Object,
        required: false,
    },

})
const emit = defineEmits();

const forwardToParent = () => {
  emit('goToAbout');
};
</script>

<style scoped></style>