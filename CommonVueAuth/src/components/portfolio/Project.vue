<template>
    <div class="mt-16 border-t-2 border-indigo-500">
        <div class="container mx-auto mt-16 px-4">
            <h2 class="text-start  pb-2 mb-4 border-b-2 border-indigo-100 font-semibold">Projects</h2>
            <div class="ml-2.5">
                <h3 class="text-start">GitHub Projects</h3>
                <p>Below are my open-source projects from GitHub:</p>
            </div>
            <template v-if="datas.projects.length > 0">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 mx-2.5">
                    <div v-for="(project, index) in datas.projects" :key="index" class="mb-4 rounded-lg shadow-lg p-4">
                        <h2 class="text-xl font-semibold capitalize"><a :href="project.html_url" target="_blank"> {{
                                project.name }} </a></h2>
                        <p class="text-gray-600 mb-4">{{ project.description }}</p>
                        <p class="text-gray-600">Stars: {{ project.stargazers_count }}
                            <fa icon="star" class="text-yellow-500" /> | Forks: {{ project.forks_count
                            }}
                        </p>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="text-center">
                    <fa icon="spinner" class="animate-spin text-4xl text-indigo-500"></fa>
                </div>
            </template>

        </div>


    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
const props = defineProps({
    projectData: {
        type: Object,
        required: true
    }
});
var datas = reactive({
    projects: []
});

onMounted(async () => {
    try {
        const githubData = await axios.get(GithubFetchLink());
        const projects = githubData.data;

        function compare(a, b) {
            if (a.stargazers_count < b.stargazers_count) return -1;
            if (a.stargazers_count > b.stargazers_count) return 1;
            return 0;
        }
        const filteredProjects = projects.filter(project => !project.fork);

        datas.projects = filteredProjects
            .sort(compare)
            .reverse()
            .slice(0, props.projectData.GithubProjectContToShow);
    } catch (error) {
        console.error(error.message);
    }
});

const GithubFetchLink = () => {
    const url = props.projectData.GithubUserName;
    const username = url.match(/github\.com\/([^/]+)/)[1];

    return "https://api.github.com/users/" + username + "/repos";
}


</script>

<style scoped></style>