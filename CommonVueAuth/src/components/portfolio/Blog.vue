<template>

    <div class="mt-16 border-t-2 border-indigo-500">
        <div class="container mx-auto mt-16">
            <div class="  pb-2 mb-4 border-b-2 border-indigo-100">
                <h2 class="text-start">Blogs</h2>
            <p>Welcome to my blog! Here you'll find my thoughts, tutorials, and experiences in tech.</p>

            </div>
          
                <h3 class="text-start"><a :href="DevToProfileLink" target="_blank"> Dev Blogs </a></h3>
            
            <template v-if="datas.blogs.length > 0">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    <div v-for="(blog, index) in datas.blogs" :key="index" class="mb-4 rounded-lg shadow-lg p-4">
                        <h2 class="text-xl font-semibold capitalize"><a :href="blog.url" target="_blank"> {{ blog.title }} </a></h2>
                        <p class="text-gray-600 mb-4">{{ blog.description }}</p>
                        <p class="text-gray-600">Reactions: {{ blog.public_reactions_count }} <fa icon="heart" class="text-red-500" /> | Comments: {{ blog.comments_count
                            }}</p>
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
import axios from '../../plugins/axios';

const ConfigData = reactive({
    DevToUserName: "silentcoder52626",
    BlogsContToShow: 10
});

var datas = reactive({
    blogs: []
});

onMounted (async () => {
    try {
        const devToData = await axios.get(DevToFetchLink());
        const blogs = devToData.data;

        function compare(a, b) {
            if (a.public_reactions_count < b.public_reactions_count)
              return -1;
            if (a.public_reactions_count > b.public_reactions_count)
              return 1;
            return 0;
          }

        datas.blogs = blogs.sort(compare).reverse()
            .slice(0, ConfigData.BlogsContToShow);
    } catch (error) {
        console.error(error);
    }
});
const DevToFetchLink = () => {
    return "https://dev.to/api/articles?username=" + ConfigData.DevToUserName;
}
const DevToProfileLink = () => {
    return "https://dev.to/" + ConfigData.DevToUserName;
}
</script>
<script scoped>
</script>