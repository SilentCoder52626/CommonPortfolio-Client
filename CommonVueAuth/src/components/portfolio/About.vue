<template>
    <div class="mt-16 border-t-2 border-indigo-500">
        <div class="container mx-auto mt-16 px-4">

            <div class="mb-4">

                <h2 class="font-semibold pb-2 mb-2 border-b-2 border-indigo-100">About Me</h2>
                <p class="mb-5  ml-2.5">{{ description }} </p>
            </div>

            <div class="mt-4 mb-4">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Skills</h2>

                <div v-for="(category, index) in skills" :key="index" class="mb-8 ml-2.5">
                    <h2 class="text-xl font-semibold mb-4 capitalize">{{ category.type }}</h2>
                    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <li v-for="(skill, skillIndex) in category.skills" :key="skillIndex"
                            class="flex items-center space-x-2 ">
                            <fa :icon="['fab', `${skill.icon}`]" class="size-6" />

                            <span class="text-base font-medium">{{ skill.name }}</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div class="mt-4 mb-4">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Experience</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div v-for="(experience, index) in experiences" :key="index"
                        class="mb-8 rounded-lg shadow-lg p-4">
                        <h2 class="text-xl font-semibold capitalize">{{ experience.title }}</h2>
                        <p class="text-gray-600 mb-4">{{ experience.organization }} | {{ experience.duration }}</p>
                        <p class="text-gray-600">{{ experience.description }}</p>
                    </div>
                </div>

            </div>
            <div class="mt-4 mb-4">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Education</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div v-for="(edu, index) in educations" :key="index" class="mb-8 rounded-lg shadow-lg p-4 ">
                        <h2 class="text-xl font-semibold capitalize">{{ edu.title }}</h2>
                        <p class="text-gray-600 mb-4">{{ edu.university }} | {{ edu.startYear }} - {{ edu.endYear }}</p>
                        <p class="text-gray-600">{{ edu.description }}</p>
                    </div>
                </div>


            </div>

        </div>

    </div>
</template>

<script setup>

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

</script>

<style scoped></style>