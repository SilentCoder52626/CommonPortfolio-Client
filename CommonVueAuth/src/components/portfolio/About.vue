<template>
    <div class="mt-16 border-t-2 border-indigo-500">
        <div class="container mx-auto mt-12 px-4">

            <div class="mb-4">

                <h2 class="text-2xl font-semibold pb-2 mb-2 border-b-2 border-indigo-100">About Me</h2>
                <p class="mb-5  ml-2.5">I'm Kaman Khadka, a Full Stack Developer based in Nepal. I specialize in building scalable web applications and have a passion for learning new technologies. </p>
            </div>

            <div class="mt-4 mb-4">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Skills</h2>

                <div v-for="(category, index) in data" :key="index" class="mb-8 ml-2.5">
                    <h2 class="text-xl font-semibold mb-4 capitalize">{{ category.type }}</h2>
                    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <li v-for="(skill, skillIndex) in category.skills" :key="skillIndex"
                            class="flex items-center space-x-2 ">
                            <span class="text-base font-medium">{{ skill.name }}</span>
                        </li>
                    </ul>
                </div>


            </div>

            <div class="mt-4 mb-4">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Experience</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div v-for="(experience, index) in experienceData" :key="index"
                        class="mb-8 rounded-lg shadow-lg p-4">
                        <h2 class="text-xl font-semibold capitalize">{{ experience.title }}</h2>
                        <p class="text-gray-600 mb-4">{{ experience.organization }} | {{ experience.duration }}</p>
                        <p class="text-gray-600">{{ experience.description }}</p>
                    </div>
                </div>


            </div>
            <div class="mt-4 mb-4">

                <h2 class="text-2xl font-semibold pb-2 mb-4 border-b-2 border-indigo-100">Education</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div v-for="(edu, index) in educationData" :key="index" class="mb-8 rounded-lg shadow-lg p-4 ">
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
import { reactive } from 'vue';

const educationData = reactive(
    [
        {
            title: 'Bachelor of Computer Science',
            university: 'Tribhuvan University',
            startYear: '2014',
            endYear: '2018',
            description: 'I have completed my Bachelor of Computer Science from Tribhuvan University in 2018.'
        },
        {
            title: 'High School',
            university: 'Shree Saraswati Higher Secondary School',
            startYear: '2012',
            endYear: '2014',
            description: 'I have completed my High School from Shree Saraswati Higher Secondary School in 2014.'
        },
        {
            title: 'School',
            university: 'Shree Saraswati Secondary School',
            startYear: '2002',
            endYear: '2012',
            description: 'I have completed my School from Shree Saraswati Secondary School in 2012.'
        }
    ]
)

const experienceData = reactive(
    [
        {
            title: 'Frontend Developer',
            organization: 'Company A',
            duration: '2020 - 2021',
            description: 'Currently working as a Full Stack Developer, focusing on Developing and maintaining web applications Writing clean, maintainable code Implementing responsive designs Working with REST APIs Database design and optimization'
        },
        {
            title: 'Backend Developer',
            organization: 'Company B',
            duration: '2018 - 2020',
            description: 'Worked as a Backend Developer, focusing on Developing and maintaining web applications Writing clean, maintainable code Implementing responsive designs Working with REST APIs Database design and optimization'
        },
        {
            title: 'Full Stack Developer',
            organization: 'Company C',
            duration: '2016 - 2018',
            description: 'Worked as a Full Stack Developer, focusing on Developing and maintaining web applications Writing clean, maintainable code Implementing responsive designs Working with REST APIs Database design and optimization'
        }
    ]
)

const data = reactive(
    [
        {
            type: 'frontend',
            skills: [
                { name: 'HTML', icon: 'html5' },
                { name: 'CSS', icon: 'css3' },
                { name: 'JavaScript', icon: 'javascript' },
                { name: 'Vue.js', icon: 'vuejs' },
                { name: 'React.js', icon: 'react' },
                { name: 'Tailwind CSS', icon: 'tailwindcss' },
                { name: 'Bootstrap', icon: 'bootstrap' },
                { name: 'Sass', icon: 'sass' },
                { name: 'jQuery', icon: 'jquery' },
            ]
        },
        {
            type: 'backend',
            skills: [
                { name: 'Node.js', icon: 'nodejs' },
                { name: 'Express.js', icon: 'express' },
                { name: 'MongoDB', icon: 'mongodb' },
                { name: 'MySQL', icon: 'mysql' },
                { name: 'Firebase', icon: 'firebase' },
                { name: 'REST API', icon: 'api' },
                { name: 'GraphQL', icon: 'graphql' },
            ]
        },
        {
            type: 'tools',
            skills: [
                { name: 'Git', icon: 'git' },
                { name: 'GitHub', icon: 'github' },
                { name: 'VS Code', icon: 'vscode' },
                { name: 'Postman', icon: 'postman' },
                { name: 'Figma', icon: 'figma' },
                { name: 'Adobe XD', icon: 'adobexd' },
                { name: 'Photoshop', icon: 'photoshop' },
                { name: 'Illustrator', icon: 'illustrator' },
            ]
        }
    ]

)

</script>

<style scoped></style>