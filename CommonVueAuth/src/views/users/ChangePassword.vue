<template>
    <div class="flex flex-col">
        <div class="w-full p-6 bg-white rounded-lg shadow max-w-md ">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Change Password
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Email</span>
                    <input v-model="data.email" type="email" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" disabled="disabled">
                </label>
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Password</span>
                    <input v-model="data.password" type="password" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Re-Password</span>
                    <input v-model="data.confirmPassword" type="password" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>

                <div class="mt-6">
                    <button type="submit" class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    const data = reactive({
    name: "",
    email: "commonkhadka@gmail.com",
    password: "",
    confirmPassword : ""
})
</script>

<style scoped>
</style>