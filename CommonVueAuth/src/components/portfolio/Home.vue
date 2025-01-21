<template>
        <div class="container mx-auto px-4">
            <Hero :personalDetails="personalDetails" />
    <Highlight :highlights="hightlightDetails.data" />
    <Card :cardDetails="cardDetails" />

    </div>
   

</template>
<script setup>
import { defineProps, reactive } from 'vue'
import Hero from './Hero.vue';
import Highlight from './Highlight.vue';
import Card from './Card.vue';
const personalDetails = reactive({
    name: 'Kaman Khadka',
    role: 'Full Stack Developer',
    shortDescription: 'Passionate about building scalable web applications and solving complex problems',
    banner: 'https://res.cloudinary.com/dkoc7pi7u/image/upload/v1736828460/kaman_name_png.png',
    profile: 'https://res.cloudinary.com/dkoc7pi7u/image/upload/v1737299508/rr5v6rwkbrz9j9v6tyr0.jpg'
})
const hightlightDetails = reactive({
    data: [
        {
            title: 'Full Stack Developer',
            description: 'A decade long Experienc in both frontend and backend development using modern technologies.'
        },
        {
            title: 'Problem Solver',
            description: 'Passionate about solving complex problems and building scalable web applications'
        },
        {
            title: 'Team Player',
            description: 'A good team player with excellent communication skills and ability to work in a team'
        }
    ]
})
const cardDetails = reactive({
    name: 'Kaman Khadka',
    role: 'Full Stack Developer',
    socialLinks: {
        github: 'https://github.com/silentcoder52626',
        twitter: 'https://x.com/common_khadka',
        linkedin: 'https://www.linkedin.com/in/kaman-khadka-474340140/'
    }
})
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
    }

})
</script>

<style scoped></style>