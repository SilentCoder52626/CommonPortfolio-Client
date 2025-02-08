<template>
    <div class="mt-16 border-t-2 border-indigo-500">
        <div class="container mx-auto mt-16 px-4">

            <div class="mb-4">

                <h2 class="font-semibold pb-2 mb-2 border-b-2 border-indigo-100">About Me</h2>
                <p class="mb-5 ml-2.5" v-html="marked(description)"></p>
            </div>

            <div class="mt-4 mb-5">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Skills</h2>

                <div v-for="(category, index) in skills" :key="index" class="mb-8 ml-2.5">
                    <h2 class="text-xl font-semibold mb-4 capitalize">{{ category.type }}</h2>
                    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <li v-for="(skill, skillIndex) in category.skills" :key="skillIndex"
                            class="flex items-center space-x-2 ">
                            <fa :icon="[computedSkillType(skill.icon), skill.icon]" class="size-6" />

                            <span class="text-base font-medium">{{ skill.name }}</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div class="mt-4 mb-5">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Experience</h2>
                <div class="grid grid-cols-1 gap-4">

                    <div v-for="(experience, index) in experiences" :key="index"
                        class="mb-8 rounded-lg shadow-lg p-4  transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <h2 class="text-xl font-semibold capitalize">{{ experience.title }}</h2>
                        <p class="text-gray-600 mb-4">{{ experience.organization }} | {{ experience.duration }}</p>
                        <p v-html="marked(experience.description)"></p>
                    </div>
                </div>

            </div>
            <div class="mt-4 mb-5">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Education</h2>
                <div class="grid grid-cols-1 gap-4">

                    <div v-for="(edu, index) in educations" :key="index" class="mb-8 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <h2 class="text-xl font-semibold capitalize">{{ edu.title }}</h2>
                        <p class="text-gray-600 mb-4">{{ edu.university }} | {{ edu.startYear }} -  {{ edu.endYear ? edu.endYear : 'Running' }}</p>
                        <p  v-html="marked(edu.description)"></p>
                    </div>
                </div>


            </div>

        </div>

    </div>
</template>

<script setup>

import { marked } from 'marked';
import { computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';

defineProps({
    educations: {
        type: Object,
        required: false,
    },
    experiences: {
        type: Object,
        required: false
    },
    skills: {
        type: Object,
        required: false
    },
    description : {
        type: String,
        required: false
    }

})

const getIconType = (iconName) => {
  if (library.definitions.fas[iconName]) return 'fas';
  if (library.definitions.fab[iconName]) return 'fab';
  if (library.definitions.far[iconName]) return 'far';

  return 'fas'; 
};

const computedSkillType = computed(() => {
  return (iconName) => getIconType(iconName);
});
</script>

<style scoped></style>